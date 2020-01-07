import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveService } from '../reactive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-number-selector-reactive',
  templateUrl: './results-number-selector-reactive.component.html',
  styleUrls: ['./results-number-selector-reactive.component.scss']
})
export class ResultsNumberSelectorReactiveComponent {

  @Input() numberOfResultsList: Array<number>;
  @Input() numberSelected$: Observable<number>;

  @Output() selectNumberEmitter: EventEmitter<number> = new EventEmitter();

  constructor() { }

  selectNumberOfResults(num: number){
    this.selectNumberEmitter.emit(num);
  }
}
