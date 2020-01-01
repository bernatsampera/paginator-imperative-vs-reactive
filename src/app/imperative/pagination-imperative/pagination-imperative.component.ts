import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImperativeService } from '../imperative.service';

@Component({
  selector: 'app-pagination-imperative',
  templateUrl: './pagination-imperative.component.html',
  styleUrls: ['./pagination-imperative.component.scss']
})
export class PaginationImperativeComponent implements OnInit {
  // Used to call the function updateContinents in the parent
  @Output() pageSelectedEmitter = new EventEmitter();
  // Array Type and number of pages to display to to make the *ngFor loop
  Arr = Array;
  @Input() numberOfPages: number;
  // Page selected
  pageSelected: number;

  constructor(
    private imperativeService: ImperativeService
  ) { }

  ngOnInit() {
    this.pageSelected = this.imperativeService.getPageSelected();
  }

  selectPage(pageSelected: number) {
    this.pageSelected = pageSelected;
    this.imperativeService.setPageSelected(pageSelected);
    this.pageSelectedEmitter.emit('');
  }
}
