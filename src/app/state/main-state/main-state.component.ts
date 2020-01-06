import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from '../state.service';
import { tap, publish } from 'rxjs/operators';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-main-state',
  templateUrl: './main-state.component.html',
  styleUrls: ['./main-state.component.scss']
})
export class MainStateComponent implements OnInit {
  continentControl = new FormControl();
  continents$ = this.stateService.updateContinents$;

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



}
