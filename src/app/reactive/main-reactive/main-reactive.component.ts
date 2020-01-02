import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveService } from '../reactive.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-reactive',
  templateUrl: './main-reactive.component.html',
  styleUrls: ['./main-reactive.component.scss']
})
export class MainReactiveComponent implements OnInit {
  continentControl = new FormControl();
  continents$ = this.reactiveService.continentsInPage$.pipe(tap(console.log));

  constructor(
    private reactiveService: ReactiveService
  ) { }

  ngOnInit() {
    this.continentControl.valueChanges.subscribe((keys: string) => this.reactiveService.updateKeysContinent(keys));
  }

}
