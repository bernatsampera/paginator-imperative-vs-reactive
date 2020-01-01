import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ImperativeService } from '../imperative.service';

@Component({
  selector: 'app-results-number-selector-imperative',
  templateUrl: './results-number-selector-imperative.component.html',
  styleUrls: ['./results-number-selector-imperative.component.scss']
})
export class ResultsNumberSelectorImperativeComponent implements OnInit {
  // Emitter to call the updateContinents method
  @Output() numberOfResultsSelectedEmitter = new EventEmitter();
  numberOfResultsList: number[];
  numberOfResultsSelected: number;

  constructor(
    private imperativeService: ImperativeService
  ) { }

  ngOnInit() {
    this.numberOfResultsList = this.imperativeService.getResultsNumberList();
    this.numberOfResultsSelected = this.getNumberOfResultsSelected();
  }

  // Sets the value of current page selected in the component and in the service and calls the updateContinents
  // method of the main Component via the emitter
  selectNumberOfResults(numberOfResultsSelected: number) {
    this.numberOfResultsSelected = numberOfResultsSelected;
    this.imperativeService.setNumberOfResultsSelected(numberOfResultsSelected);
    this.numberOfResultsSelectedEmitter.emit('');
  }

  // Method to retrieve the number of results when the component is initialized
  getNumberOfResultsSelected() {
    return this.imperativeService.getNumberOfResultsSelected();
  }

}
