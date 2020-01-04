import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { GET_CONTINENTS, GET_PAGES, UPDATE_CONTINENT_KEYS, UPDATE_CONTINENTS } from './types';
import { HttpClient } from '@angular/common/http';

interface InitialState {
  continents: Array<string>;
  pages: number;
}

interface Event {
  type: string;
  payload?: object;
}

let state: InitialState = {
  continents: [],
  pages: 1
};

export const store$ = new Subject<InitialState>();
export const eventDispatcher$ = new Subject<Event>();



eventDispatcher$.subscribe(async (data: Event) => {
  switch (data.type) {
    case GET_CONTINENTS:

      store$.next(state);
      break;
    case UPDATE_CONTINENTS:
      state = {
        ...state,
        continents: data.payload as string[]
      };
      break;
    case GET_PAGES:
      store$.next(state);
      break;
    case UPDATE_CONTINENT_KEYS:
      state = {
        ...state,
        continents: ['asia', 'america']
      };
      store$.next(state);
      console.log('state', state);
      break;
  }
})

