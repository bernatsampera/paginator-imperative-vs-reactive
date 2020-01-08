import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, merge, Observable, pipe, UnaryFunction } from "rxjs";
import {
  tap,
  map,
  startWith,
  scan,
  shareReplay,
  pluck,
  distinctUntilChanged
} from "rxjs/operators";

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
  searchKeys = "searchKeys",
  numberOfResults = "numberOfResults",
  page = "page"
}

@Injectable({
  providedIn: "root"
})
export class StateService {
  private intitialPaginatorState: PaginatorState = {
    continents: [],
    continentsToDisplay: [],
    pagesAvailable: 0,
    searchKeys: "",
    numberOfResults: 7,
    page: 0
  };

  // Providers
  private continentsUrl = "/api/continents";
  private continents$: Observable<string[]> = this.http
    .get<string[]>(this.continentsUrl)
    .pipe(shareReplay(1));

  // UI Actions
  public searchKeysAction$ = new Subject<string>();
  public numberOfResultsSelectAction$ = new Subject<number>();
  public pageSelectAction$ = new Subject<number>();

  // Combination of all the sources that can change the state
  private paginatorCommands$ = merge(
    this.continents$.pipe(map(continents => ({ continents }))),
    this.searchKeysAction$.pipe(map(str => ({ searchKeys: str }))),
    this.numberOfResultsSelectAction$.pipe(map(n => ({ numberOfResults: n }))),
    this.pageSelectAction$.pipe(map(n => ({ page: n })))
  );

  // Observable of the Paginator State
  public paginatorState$: Observable<PaginatorState> = this.paginatorCommands$.pipe(
    startWith(this.intitialPaginatorState),
    tap(command =>
      PaginatorStateKeys.page in command ? null : this.pageSelectAction$.next(0)
    ),
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

  constructor(private http: HttpClient) {}

  // Private Functions
  private getContinentsInPage({
    continents,
    searchKeys,
    page,
    numberOfResults
  }): string[] {
    return continents
      .filter(continent => continent.includes(searchKeys.toLowerCase()))
      .slice(
        this.getFirstContinent(numberOfResults, page),
        this.getLastContinent(numberOfResults, page)
      );
  }

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

  // RxJS Operators
  queryChange<T, I>(key: string): UnaryFunction<Observable<T>, Observable<I>> {
    return pipe(pluck<T, I>(key), distinctUntilChanged<I>());
  }
}
