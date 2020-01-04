import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-number-selector-state',
  templateUrl: './results-number-selector-state.component.html',
  styleUrls: ['./results-number-selector-state.component.scss']
})
export class ResultsNumberSelectorStateComponent implements OnInit {
  numberOfResultsList = [1, 3, 5, 7];
  numSelected: Observable<number> = this.stateService.numberOfResults$;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  selectNumberOfResults(num: number){
    this.stateService.selectNumberOfResults(num);
  }

}
