import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImperativeService } from '../imperative.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination-imperative',
  templateUrl: './pagination-imperative.component.html',
  styleUrls: ['./pagination-imperative.component.scss']
})
export class PaginationImperativeComponent {

  Arr = Array;
  @Input() pagesAvailable: number;
  @Input() selectedPage: number;

  @Output() selectPageEmitter = new EventEmitter<number>();

  constructor( ) { }

  selectPage(page: number): void {
    this.selectPageEmitter.emit(page);
  }

}
