import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Subject, merge, Observable, pipe, UnaryFunction } from 'rxjs';
import { tap, map, startWith, scan, shareReplay, pluck, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface PaginatorState {
  searchKeys: string;
  numberOfResults: number;
  page: number;
}

enum PaginatorStateKeys {
  searchKeys = 'searchKeys',
  numberOfResults = 'numberOfResults',
  page = 'page'
}

@Injectable({
  providedIn: 'root'
})
export class StateService implements OnDestroy{
  private onDestroy$ = new Subject();
  private continentsUrl = '/api/continents';
  private continents$: Observable<string[]> = this.http.get<string[]>(this.continentsUrl).pipe(
    tap(console.log),
    shareReplay(1)
  );

  intitialPaginatorState: PaginatorState = {
    searchKeys: '',
    numberOfResults: 7,
    page: 0
  };

  // UI Actions
  searchKeysAction$ = new Subject<string>();
  numberOfResultsSelectAction$ = new Subject<number>();
  pageSelectAction$ = new Subject<number>();

  paginatorCommands$ = merge(
    this.searchKeysAction$.pipe(
      tap(() => this.pageSelectAction$.next(0)),
      map(str => ({ searchKeys: str })),
    ),
    this.numberOfResultsSelectAction$.pipe(
      tap(() => this.pageSelectAction$.next(0)),
      map(n => ({ numberOfResults: n })),
    ),
    this.pageSelectAction$.pipe(map(n => ({ page: n })))
  );

  paginatorState$: Observable<PaginatorState> = this.paginatorCommands$.pipe(
    startWith(this.intitialPaginatorState),
    scan((paginatorState: PaginatorState, command): PaginatorState => ({ ...paginatorState, ...command } as PaginatorState)),
    shareReplay(1)
  );

  keysSearch$ = this.paginatorState$.pipe(this.queryChange<PaginatorState, string>(PaginatorStateKeys.searchKeys));
  numberOfResults$ = this.paginatorState$.pipe(this.queryChange<PaginatorState, number>(PaginatorStateKeys.numberOfResults));
  page$ = this.paginatorState$.pipe(this.queryChange<PaginatorState, number>(PaginatorStateKeys.page));

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
      )
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
      )
    );

  constructor(private http: HttpClient) { }

  ngOnDestroy() {
    this.onDestroy$.next();
  }


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
