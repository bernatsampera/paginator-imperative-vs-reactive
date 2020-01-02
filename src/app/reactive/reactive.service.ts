import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReactiveService {
  // Constant
  private _continentsUrl = '/api/continents';
  private _numberOfResultsList = [1, 3, 5, 7];
  private _initialNumberOfResults = 7;
  private _initialPageSelected = 0;

  // Subjects
  private _keysContinentAction$ = new BehaviorSubject<string>('');
  private _numberOfResultsSelectAction$ = new BehaviorSubject<number>(this._initialNumberOfResults);
  private _pageSelectAction$ = new BehaviorSubject<number>(this._initialPageSelected);

  // Private Observables
  private _continents$ = this.http.get<string[]>(this._continentsUrl);

  private _continentsFiltered$: Observable<string[]> = combineLatest([
    this._continents$,
    this._keysContinentAction$
  ]).pipe(
    map(
        ([continents, keys]: [string[], string]) => continents.filter(c => c.includes(keys))
    )
  );

  // Public Observables
  pageSelected$: Observable<number> = this._pageSelectAction$;
  numberOfResultsSelected$: Observable<number> = this._numberOfResultsSelectAction$;

  pagesAvailable$: Observable<number> = combineLatest([
    this._continentsFiltered$,
    this._numberOfResultsSelectAction$
  ]).pipe(
    map(([continents, numberOfResults]) => Math.ceil(continents.length / numberOfResults))
  );

  continentsInPage$: Observable<string[]> = combineLatest([
    this._continentsFiltered$,
    this._numberOfResultsSelectAction$,
    this._pageSelectAction$
  ]).pipe(
    map(
        ([continents, numberOfResults, page]: [string[], number, number]) =>
          this._getContinentsInPage(continents, numberOfResults, page) as string[]
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
    this._keysContinentAction$.next(keys);
    this.selectPage(this._initialPageSelected);
  }

  selectPage(page: number | null): void {
    this._pageSelectAction$.next(page);
  }

  selectNumberOfResults(numberOfResults: number | null): void {
    this._numberOfResultsSelectAction$.next(numberOfResults);
    this.selectPage(this._initialPageSelected);
  }

  getNumberOfResultsList(): number[] {
    return this._numberOfResultsList;
  }
}
