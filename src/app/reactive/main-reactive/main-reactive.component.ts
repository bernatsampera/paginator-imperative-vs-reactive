import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveService } from '../reactive.service';
import { tap, publish } from 'rxjs/operators';
import { ConnectableObservable, Observable } from 'rxjs';

@Component({
  selector: 'app-main-reactive',
  templateUrl: './main-reactive.component.html',
  styleUrls: ['./main-reactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainReactiveComponent implements OnInit {
    // Main
    continentControl = new FormControl();
    continents$ = this.reactiveService.updateContinents$;

    // Pagination
    pagesAvailable$: Observable<number> = this.reactiveService.pagesAvailable$;
    selectedPage$: Observable<number> = this.reactiveService.pageSelectAction$;

    // Number Of Results
    numberOfResultsList: Array<number> = [1, 3, 5, 7];
    numberSelected$: Observable<number> = this.reactiveService.numberOfResultsSelectAction$;

  constructor(
    private reactiveService: ReactiveService
  ) { }

  ngOnInit() {
    // Subscribe to Input Keys Change and update the value in the state
    // Needs to be converted from cold to hot to start receiving the values automatically
    (this.continentControl.valueChanges.pipe(
      tap(this.reactiveService.searchKeysAction$),
      publish()
    ) as ConnectableObservable<string>).connect();
  }

  selectPage(page: number) {
    this.reactiveService.pageSelectAction$.next(page);
  }

  selectNumber(num: number) {
    this.reactiveService.numberOfResultsSelectAction$.next(num);
  }

}
