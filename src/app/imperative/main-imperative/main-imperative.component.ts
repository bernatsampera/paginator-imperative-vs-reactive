import { Component, OnInit, OnDestroy, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImperativeService } from '../imperative.service';

@Component({
  selector: 'app-main-imperative',
  templateUrl: './main-imperative.component.html',
  styleUrls: ['./main-imperative.component.scss'],
})
export class MainImperativeComponent implements OnInit {
  // Input to control the input of the user
  continentControl = new FormControl();
  continents: string[] = [];

  // Pagination
  numberOfPages: number;
  selectedPage = 0;

  // Number of Results
  numberOfResultsList = [1, 3, 5, 7];
  numberSelected = 7;

  constructor(
    private imperativeService: ImperativeService
  ) { }

  ngOnInit() {
    this.continentControl.valueChanges.subscribe(
      (continentKeys) => {
        this.imperativeService.setContinentKeys(continentKeys);
        this.selectPage(0); // MANUAL CALL TO UPDATE PAGE AND CONTINENTS!!!
      }
    );
    this.initializeContinents();
  }

  async initializeContinents() {
    this.continents = await this.imperativeService.getContinents().toPromise();
    this.updateContinents();
  }

  updateContinents() {
    this.continents = this.imperativeService.getContinentsToDisplayInPage();
    this.getNumberOfPages();
  }

  getNumberOfPages() {
    this.numberOfPages = this.imperativeService.getNumberOfPages();
  }

  selectNumber(num: number) {
    this.numberSelected = num;
    this.imperativeService.setNumberOfResultsSelected(num);
    this.selectPage(0); // MANUAL CALL TO UPDATE PAGE ANDCONTINENTS!!!
  }

  selectPage(page: number) {
    this.selectedPage = page;
    this.imperativeService.setPageSelected(page);
    this.updateContinents(); // MANUAL CALL TO UPDATE CONTINENTS!!!
  }

}
