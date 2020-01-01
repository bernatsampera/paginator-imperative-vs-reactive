import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImperativeService } from '../imperative.service';
import { Subscription } from 'rxjs';
import { EventEmitter } from 'events';
import { PaginationImperativeComponent } from '../pagination-imperative/pagination-imperative.component';

@Component({
  selector: 'app-main-imperative',
  templateUrl: './main-imperative.component.html',
  styleUrls: ['./main-imperative.component.scss']
})
export class MainImperativeComponent implements OnInit, OnDestroy {
  @ViewChild(PaginationImperativeComponent, null) paginationComponent;
  continentControl = new FormControl();
  continents: string[] = [];
  continentsSubscription: Subscription;

  constructor(
    private imperativeService: ImperativeService
  ) { }

  ngOnInit() {
    this.continentControl.valueChanges.subscribe(
      (continentKeys) => {
        this.imperativeService.setContinentKeys(continentKeys);
        this.updateContinents();
      }
    );

    this.continentsSubscription = this.imperativeService.getContinents().subscribe(data =>  {
      this.continents = data;
    });
  }

  ngOnDestroy() {
    this.continentsSubscription.unsubscribe();
  }

  updateContinents() {
    this.paginationComponent.getNumberOfPagesAvailable();
    this.continents = this.imperativeService.getContinentsToDisplayInPage();
  }

}
