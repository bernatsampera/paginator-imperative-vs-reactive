import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '../state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination-state',
  templateUrl: './pagination-state.component.html',
  styleUrls: ['./pagination-state.component.scss']
})
export class PaginationStateComponent {

  Arr = Array;
  @Input() pagesAvailable$: Observable<number>;
  @Input() selectedPage: number;

  @Output() selectPageEmitter = new EventEmitter<number>();

  constructor( ) { }

  selectPage(page: number): void {
    this.selectPageEmitter.emit(page);
  }

}
