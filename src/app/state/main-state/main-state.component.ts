import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from '../state.service';
import { tap, publish } from 'rxjs/operators';
import { ConnectableObservable, Observable } from 'rxjs';

@Component({
  selector: 'app-main-state',
  templateUrl: './main-state.component.html',
  styleUrls: ['./main-state.component.scss']
})
export class MainStateComponent implements OnInit {
  // Main
  continentControl = new FormControl();
  // continents$ = this.stateService.updateContinents$;

  // Pagination
  // pagesAvailable$: Observable<number> = this.stateService.pagesAvailable$;

  // Number Of Results
  numberOfResultsList: Array<number> = [1, 3, 5, 7];

  state$ = this.stateService.paginatorState$;

  constructor(
    private stateService: StateService
  ) {
  }

  ngOnInit() {
    (
      this.continentControl.valueChanges.pipe(
      tap(this.stateService.searchKeysAction$),
      publish()
    ) as ConnectableObservable<string>).connect();
  }


  selectPage(page: number) {
    this.stateService.pageSelectAction$.next(page);
  }

  selectNumber(num: number) {
    this.stateService.numberOfResultsSelectAction$.next(num);
  }
}
