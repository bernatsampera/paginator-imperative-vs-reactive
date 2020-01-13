import { PaginatorBaseModel } from './eph-vm.base-model.interface';
import { Injectable } from '@angular/core';
import { LocalState } from 'src/app/common/rx-ephemeral-state';
import { PaginatorView } from './eph-vm.view.interface';
import { Subject, Observable, combineLatest } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const intitialPaginatorState: PaginatorBaseModel = {
  continents: [],
  continentsToDisplay: [],
  pagesAvailable: 0,
  searchKeys: "",
  numberOfResults: 7,
  page: 0
};


@Injectable()
export class EphVmService extends LocalState<PaginatorBaseModel> implements PaginatorView {
  baseModel$ = this.select();

  // ListView ==========================================
  selectPageAction$ = new Subject<number>();
  selectNumberAction$ = new Subject<number>();
  searchKeysInput$ = new Subject<Event>();
  continents$: Observable<string[]> = this.http.get<string[]>('/api/continents');

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

  constructor(
    private http: HttpClient
  ) {
    super();
    this.setState(intitialPaginatorState);

    this.connectState(this.selectPageAction$
      .pipe(map(n => ({page: n}))));
    this.connectState(this.selectNumberAction$
      .pipe(map(n => ({numberOfResults: n}))));
    this.connectState(this.searchKeysInput$
      .pipe(
        map((e: any) => e.target.value),
        map(k => ({searchKeys: k}))));
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
