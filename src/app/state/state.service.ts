import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Subject, merge, Observable, pipe, UnaryFunction } from 'rxjs';
import { tap, map, startWith, scan, shareReplay, pluck, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface PaginatorState {
  continentsToDisplay: string[];
  pagesAvailable: number;
  searchKeys: string;
  numberOfResults: number;
  page: number;
}

enum PaginatorStateKeys {
  continentsToDisplay = 'continentsToDisplay',
  pagesAvailable = 'pagesAvailable',
  searchKeys = 'searchKeys',
  numberOfResults = 'numberOfResults',
  page = 'page'
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  intitialPaginatorState: PaginatorState = {
    continentsToDisplay: [],
    pagesAvailable: 1,
    searchKeys: '',
    numberOfResults: 7,
    page: 0
  };

  // Subjects
  continentsToDisplaySubject$ = new Subject<string[]>();
  pagesAvailableSubject$ = new Subject<number>();

  // UI Actions
  searchKeysAction$ = new Subject<string>();
  numberOfResultsSelectAction$ = new Subject<number>();
  pageSelectAction$ = new Subject<number>();

  // All the Commands together
  paginatorCommands$ = merge(
    this.continentsToDisplaySubject$.pipe(map(conts => ({ continentsToDisplay: conts}))),
    this.pagesAvailableSubject$.pipe(map(n => ({ pagesAvailable: n}))),
    this.searchKeysAction$.pipe(map(str => ({ searchKeys: str }))),
    this.numberOfResultsSelectAction$.pipe(map(n => ({ numberOfResults: n }))),
    this.pageSelectAction$.pipe(map(n => ({ page: n }))),
  );

  // Current State of the Service
  paginatorState$: Observable<PaginatorState> = this.paginatorCommands$.pipe(
    startWith(this.intitialPaginatorState),
    scan((paginatorState: PaginatorState, command): PaginatorState => ({ ...paginatorState, ...command } as PaginatorState)),
    shareReplay(1)
  );

  // Streams of the State Values
  keysSearch$ = this.paginatorState$.pipe(this.queryChange<PaginatorState, string>(PaginatorStateKeys.searchKeys));
  numberOfResults$ = this.paginatorState$.pipe(this.queryChange<PaginatorState, number>(PaginatorStateKeys.numberOfResults));
  page$ = this.paginatorState$.pipe(this.queryChange<PaginatorState, number>(PaginatorStateKeys.page));


  private continentsUrl = '/api/continents';
  private continents$: Observable<string[]> = this.http.get<string[]>(this.continentsUrl).pipe(
    shareReplay(1)
  );

  updateContinents$ = combineLatest([
    this.keysSearch$,
    this.numberOfResults$,
    this.page$,
    this.continents$
  ])
    .pipe(
      map(
        ([keys, numberOfResults, page, continents]: [string, number, number, string[]]) =>
          this.getContinentsInPage(
            continents.filter(continent => continent.includes(keys)),
            numberOfResults,
            page
          )
      ),
      tap(continents => this.continentsToDisplaySubject$.next(continents))
    );

  pagesAvailable$: Observable<number> = combineLatest([
    this.keysSearch$,
    this.numberOfResults$,
    this.continents$
  ])
    .pipe(
      map(
        ([keys, numberOfResults, continents]: [string, number, string[]]) =>
          Math.ceil(continents.filter(continent => continent.includes(keys)).length / numberOfResults)
      ),
      tap((pages) => this.pagesAvailableSubject$.next(pages)),
      tap(() => this.pageSelectAction$.next(0))
    );

  constructor(private http: HttpClient) { }

  // Private Functions
  private getContinentsInPage = (continents: string[], numberOfResults: number, page: number) =>
    continents.slice(this.getFirstContinent(numberOfResults, page), this.getLastContinent(numberOfResults, page))

  private getFirstContinent = (numberOfResults: number, page: number) => numberOfResults * page;

  private getLastContinent = (numberOfResults: number, page: number) => this.getFirstContinent(numberOfResults, page) + numberOfResults;

  queryChange<T, I>(key: string): UnaryFunction<Observable<T>, Observable<I>> {
    return pipe(pluck<T, I>(key), distinctUntilChanged<I>());
  }

  // Public Functions
  public selectPage(page: number | null): void {
    this.pageSelectAction$.next(page);
  }

  public selectNumberOfResults(num: number | null): void {
    this.numberOfResultsSelectAction$.next(num);
  }

}
