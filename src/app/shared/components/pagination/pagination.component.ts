import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  Arr = Array;
  @Input() pagesAvailable: number;
  @Input() selectedPage: number;

  @Output() selectPageEmitter = new EventEmitter<number>();

  constructor( ) { }

  selectPage(page: number): void {
    this.selectPageEmitter.emit(page);
  }

}
