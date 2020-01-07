import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, filter, switchMap, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReactiveService {
  // Constant
  private _continentsUrl = '/api/continents';
  private _numberOfResultsList = [1, 3, 5, 7];
  private _initialNumberOfResults = 7;
  private _initialPage = 0;

  // Subjects
  searchKeysAction$ = new BehaviorSubject<string>('');
  numberOfResultsSelectAction$ = new BehaviorSubject<number>(this._initialNumberOfResults);
  pageSelectAction$ = new BehaviorSubject<number>(this._initialPage);

  // Private Observables
  private _continents$ = this.http.get<string[]>(this._continentsUrl).pipe(
    shareReplay(1)
  );

  // Public Observables
  pagesAvailable$: Observable<number> = combineLatest(
    this.searchKeysAction$,
    this.numberOfResultsSelectAction$
  ).pipe(
    switchMap(
      ([keysContinent, numberOfResults]: [string, number]) =>
        this._continents$.pipe(
          map(continents => continents.filter(continent => continent.includes(keysContinent))),
          map((continents) => Math.ceil(continents.length / numberOfResults))
        )
    ),
    tap(() => this.pageSelectAction$.next(0)),
  );

  updateContinents$: Observable<string[]> = combineLatest(
    this.searchKeysAction$,
    this.numberOfResultsSelectAction$,
    this.pageSelectAction$
  ).pipe(
    switchMap(
        ([keysContinent, numberOfResults, page]: [string, number, number]) =>
          this._continents$.pipe(
            map(continents => continents.filter(continent => continent.includes(keysContinent))),
            map(continents => this._getContinentsInPage(continents, numberOfResults, page) as string[])
          )
    )
  );

  constructor(private http: HttpClient) { }

  // Private Functions
  private _getContinentsInPage = (continents: string[], numberOfResults: number, page: number) =>
  continents.slice(this._getFirstContinent(numberOfResults, page), this._getLastContinent(numberOfResults, page))

  private _getFirstContinent = (numberOfResults: number, page: number) => numberOfResults * page;

  private _getLastContinent = (numberOfResults: number, page: number) => this._getFirstContinent(numberOfResults, page) + numberOfResults;


  // Public function
  updateKeysContinent(keys: string | null): void {
    this.searchKeysAction$.next(keys);
    this.selectPage(this._initialPage);
  }

  selectPage(page: number | null): void {
    this.pageSelectAction$.next(page);
  }

  selectNumberOfResults(numberOfResults: number | null): void {
    this.numberOfResultsSelectAction$.next(numberOfResults);
    this.selectPage(this._initialPage);
  }

  getNumberOfResultsList(): number[] {
    return this._numberOfResultsList;
  }
}
