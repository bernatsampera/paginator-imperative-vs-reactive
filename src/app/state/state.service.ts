import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, merge, Observable, pipe, UnaryFunction } from "rxjs";
import {
  tap,
  map,
  startWith,
  scan,
  shareReplay,
  pluck,
  distinctUntilChanged,
  last,
  distinct
} from "rxjs/operators";
import { state } from "@angular/animations";

interface PaginatorState {
  continents: string[];
  continentsToDisplay: string[];
  pagesAvailable: number;
  searchKeys: string;
  numberOfResults: number;
  page: number;
}

enum PaginatorStateKeys {
  continents = "continents",
  continentsToDisplay = "continentsToDisplay",
  pagesAvailable = "pagesAvailable",
  searchKeys = "searchKeys",
  numberOfResults = "numberOfResults",
  page = "page"
}

@Injectable({
  providedIn: "root"
})
export class StateService {
  intitialPaginatorState: PaginatorState = {
    continents: [],
    continentsToDisplay: [],
    pagesAvailable: 1,
    searchKeys: "",
    numberOfResults: 7,
    page: 0
  };

  private continentsUrl = "/api/continents";
  private continents$: Observable<string[]> = this.http
    .get<string[]>(this.continentsUrl)
    .pipe(shareReplay(1));

  // Subjects
  continentsToDisplaySubject$ = new Subject<string[]>();
  pagesAvailableSubject$ = new Subject<number>();

  // UI Actions
  searchKeysAction$ = new Subject<string>();
  numberOfResultsSelectAction$ = new Subject<number>();
  pageSelectAction$ = new Subject<number>();

  // All the Commands together
  paginatorCommands$ = merge(
    this.continents$.pipe(map(continents => ({ continents }))),
    this.continentsToDisplaySubject$.pipe(
      map(continents => ({ continentsToDisplay: continents }))
    ),
    this.pagesAvailableSubject$.pipe(map(n => ({ pagesAvailable: n }))),
    this.searchKeysAction$.pipe(map(str => ({ searchKeys: str }))),
    this.numberOfResultsSelectAction$.pipe(map(n => ({ numberOfResults: n }))),
    this.pageSelectAction$.pipe(map(n => ({ page: n })))
  );

  // Current State of the Service
  paginatorState$: Observable<PaginatorState> = this.paginatorCommands$.pipe(
    startWith(this.intitialPaginatorState),
    tap((command) => PaginatorStateKeys.page in command ? null :this.pageSelectAction$.next(0)),
    scan(
      (paginatorState: PaginatorState, command): PaginatorState =>
        ({
          ...paginatorState,
          ...command,
          continentsToDisplay: this.getContinentsInPage({
            ...paginatorState,
            ...command
          }),
          pagesAvailable: this.getPagesAvailable({
            ...paginatorState,
            ...command
          })
        } as PaginatorState)
    ),
    shareReplay(1)
  );

  // Streams of the State Values
  keysSearch$ = this.paginatorState$.pipe(
    this.queryChange<PaginatorState, string>(PaginatorStateKeys.searchKeys)
  );
  numberOfResults$ = this.paginatorState$.pipe(
    this.queryChange<PaginatorState, number>(PaginatorStateKeys.numberOfResults)
  );
  page$ = this.paginatorState$.pipe(
    this.queryChange<PaginatorState, number>(PaginatorStateKeys.page)
  );

  constructor(private http: HttpClient) {}

  // Private Functions
  private getContinentsInPage = ({
    continents,
    searchKeys,
    page,
    numberOfResults
  }) =>
    continents
      .filter(continent => continent.includes(searchKeys))
      .slice(
        this.getFirstContinent(numberOfResults, page),
        this.getLastContinent(numberOfResults, page)
      )

  private getFirstContinent = (numberOfResults: number, page: number) =>
    numberOfResults * page;

  private getLastContinent = (numberOfResults: number, page: number) =>
    this.getFirstContinent(numberOfResults, page) + numberOfResults;

  private getPagesAvailable({ continents, searchKeys, numberOfResults }) {
    return Math.ceil(
      continents.filter(continent => continent.includes(searchKeys)).length /
        numberOfResults
    );
  }

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
