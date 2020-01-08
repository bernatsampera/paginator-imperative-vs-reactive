import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-of-results',
  templateUrl: './number-of-results.component.html',
  styleUrls: ['./number-of-results.component.scss']
})
export class NumberOfResultsComponent {

  @Input() numberOfResultsList: Array<number>;
  @Input() numberSelected: number;

  @Output() selectNumberEmitter: EventEmitter<number> = new EventEmitter();

  constructor() { }

  selectNumberOfResults(num: number){
    this.selectNumberEmitter.emit(num);
  }

}
