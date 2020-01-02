import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class PaginatorState {
  continents: string[] = [];
  continentsToDisplay: string[] = [];
  numberOfResultsList: number[] = [1, 3, 5, 7];
  numberOfResultsSelected = 7;
  pagesAvailable = 1;
  pageSelected = 0;
}

@Injectable({
  providedIn: 'root'
})
export class StateFacade {
  private state = new PaginatorState();
  private dispatch = new BehaviorSubject<PaginatorState>(this.state);

  continentsToDisplay$: Observable<string[]> = this.dispatch.asObservable().pipe(
    map(state => state.continentsToDisplay)
  );

  constructor() {}

  // updateContinents(continents: string[]) {
  //   this.dispatch.next(
  //     ()
  //   )
  // }
}
