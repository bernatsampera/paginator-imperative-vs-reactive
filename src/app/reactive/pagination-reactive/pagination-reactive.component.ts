import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ReactiveService } from '../reactive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination-reactive',
  templateUrl: './pagination-reactive.component.html',
  styleUrls: ['./pagination-reactive.component.scss']
})
export class PaginationReactiveComponent {
  Arr = Array;
  @Input() pagesAvailable$: Observable<number>;
  @Input() selectedPage$: Observable<number>;

  @Output() selectPageEmitter = new EventEmitter<number>();

  constructor( ) { }

  selectPage(page: number): void {
    this.selectPageEmitter.emit(page);
  }
}
