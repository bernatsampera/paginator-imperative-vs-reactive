import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ImperativeService } from '../imperative.service';

@Component({
  selector: 'app-results-number-selector-imperative',
  templateUrl: './results-number-selector-imperative.component.html',
  styleUrls: ['./results-number-selector-imperative.component.scss']
})
export class ResultsNumberSelectorImperativeComponent implements OnInit {
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

  selectNumberOfResults(numberOfResultsSelected: number) {
    this.numberOfResultsSelected = numberOfResultsSelected;
    this.imperativeService.setNumberOfResultsSelected(numberOfResultsSelected);
    this.numberOfResultsSelectedEmitter.emit('');
  }

  getNumberOfResultsSelected() {
    return this.imperativeService.getNumberOfResultsSelected();
  }

}
