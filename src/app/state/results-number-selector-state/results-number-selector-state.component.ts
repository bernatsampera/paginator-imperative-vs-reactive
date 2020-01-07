import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '../state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-number-selector-state',
  templateUrl: './results-number-selector-state.component.html',
  styleUrls: ['./results-number-selector-state.component.scss']
})
export class ResultsNumberSelectorStateComponent {

  @Input() numberOfResultsList: Array<number>;
  @Input() numberSelected: Observable<number>;

  @Output() selectNumberEmitter: EventEmitter<number> = new EventEmitter();

  constructor() { }

  selectNumberOfResults(num: number){
    this.selectNumberEmitter.emit(num);
  }

}
