import { Component, OnInit } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { LocalState } from '../../common/rx-ephemeral-state';
import { map, shareReplay, tap, distinctUntilChanged, distinct, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PaginatorState {
  continents: string[];
  continentsToDisplay: string[];
  pagesAvailable: number;
  searchKeys: string;
  numberOfResults: number;
  page: number;
}

const intitialPaginatorState: PaginatorState = {
  continents: [],
  continentsToDisplay: [],
  pagesAvailable: 0,
  searchKeys: "",
  numberOfResults: 7,
  page: 0
};


@Component({
  selector: 'app-ephemeral',
  templateUrl: './ephemeral.component.html',
  styleUrls: ['./ephemeral.component.scss']
})
export class EphemeralComponent extends LocalState<PaginatorState> {
  numberOfResultsList: number[] = [1, 3, 5, 7];
  selectPageAction$ = new Subject<number>();
  selectNumberAction$ = new Subject<number>();
  searchKeysInput$ = new Subject<Event>();
  searchKeys$ = this.searchKeysInput$.pipe(map((e: any) => e.target.value));
    // For sure it has to be in service (but, for simplicity:/)
  continents$: Observable<string[]> = this.http
    .get<string[]>('/api/continents')
    .pipe(shareReplay(1));

  model$ = this.select();

  updateContinentsInPage$ = combineLatest([
    this.select('continents'),
    this.select('numberOfResults'),
    this.select('page'),
    this.select('searchKeys')
  ]).pipe(
    map( ([continents, numberOfResults, page, searchKeys]) => this.getContinentsInPage({continents, numberOfResults, page, searchKeys}))
  );

  pagesAvailable$ = combineLatest([
    this.select('continents'),
    this.select('numberOfResults'),
    this.select('searchKeys')
  ]).pipe(
    tap(_ => this.setState({page: 0})),
    map( ([continents, numberOfResults, searchKeys]) => this.getPagesAvailable({continents, numberOfResults, searchKeys}))
  );

  constructor(private http: HttpClient) {
    super();
    this.setState(intitialPaginatorState);
    this.connectState(this.selectPageAction$
      .pipe(map(n => ({page: n}))));
    this.connectState(this.selectNumberAction$
      .pipe(map(n => ({numberOfResults: n}))));
    this.connectState(this.searchKeys$
      .pipe(map(k => ({searchKeys: k}))));
    this.connectState(this.continents$
      .pipe(map(c => ({continents: c}))));
    this.connectState(this.updateContinentsInPage$
      .pipe(map(c => ({continentsToDisplay: c}))));
    this.connectState(this.pagesAvailable$
      .pipe(map(p => ({pagesAvailable: p}))));
  }

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

}
