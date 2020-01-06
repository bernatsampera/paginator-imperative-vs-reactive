import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { store$ } from '../store/index';
import { getContinents } from '../store/actions';
import { GET_CONTINENTS, UPDATE_CONTINENT_KEYS } from '../store/types';
import { StateService } from '../state.service';
import { tap } from 'rxjs/operators';
import { of, timer } from 'rxjs';

@Component({
  selector: 'app-main-state',
  templateUrl: './main-state.component.html',
  styleUrls: ['./main-state.component.scss']
})
export class MainStateComponent implements OnInit {
  continentControl = new FormControl();
  continents$ = this.stateService.updateContinents$;
  searchKeys$ = this.continentControl.valueChanges.pipe(
    tap(data => this.stateService.searchKeysAction$.next(data))
  );

  constructor(
    private stateService: StateService
  ) {
  }

  ngOnInit() {
  }



}
