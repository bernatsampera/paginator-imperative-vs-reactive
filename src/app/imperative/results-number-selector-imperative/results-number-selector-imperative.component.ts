import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ImperativeService } from '../imperative.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-number-selector-imperative',
  templateUrl: './results-number-selector-imperative.component.html',
  styleUrls: ['./results-number-selector-imperative.component.scss']
})
export class ResultsNumberSelectorImperativeComponent {

  @Input() numberOfResultsList: Array<number>;
  @Input() numberSelected: Observable<number>;

  @Output() selectNumberEmitter: EventEmitter<number> = new EventEmitter();

  constructor() { }

  selectNumberOfResults(num: number){
    this.selectNumberEmitter.emit(num);
  }

}
