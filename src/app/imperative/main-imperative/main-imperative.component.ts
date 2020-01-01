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
export class MainImperativeComponent implements OnInit {
  // paginationComponent takes an instance of the component and is used to call the update number of pages method
  @ViewChild(PaginationImperativeComponent, null) paginationComponent;
  // Input to control the input of the user
  continentControl = new FormControl();
  // Stores the value of the continents to display
  continents: string[] = [];

  // Pass to the child paginator component
  numberOfPages: number;

  constructor(
    private imperativeService: ImperativeService
  ) { }

  ngOnInit() {
    // Subscription to the input method to detect when the user search for a particular continent
    this.continentControl.valueChanges.subscribe(
      (continentKeys) => {
        this.imperativeService.setContinentKeys(continentKeys);
        this.updateContinents();
      }
    );

    // Set up the value of the array of continents and the number of pages
    this.initializeContinents();
  }

  // Update the value of the component for the first time
  async initializeContinents() {
    this.continents = await this.imperativeService.getContinents().toPromise();
    this.getNumberOfPages();
  }

  // Method Called every time there's a change in (continentKeys, numberOfResults, page)
  // It must be in the component in order to update the value of the current continents
  // It also call the method to update the current pages available
  updateContinents() {
    this.getNumberOfPages();
    this.continents = this.imperativeService.getContinentsToDisplayInPage();
  }

  // Sets the value of the current number of pages needed to pass to the child
  getNumberOfPages() {
    this.numberOfPages = this.imperativeService.getNumberOfPages();
  }

}
