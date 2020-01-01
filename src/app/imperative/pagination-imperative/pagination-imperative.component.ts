import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImperativeService } from '../imperative.service';

@Component({
  selector: 'app-pagination-imperative',
  templateUrl: './pagination-imperative.component.html',
  styleUrls: ['./pagination-imperative.component.scss']
})
export class PaginationImperativeComponent implements OnInit {
  @Output() pageSelectedEmitter = new EventEmitter();
  pagesAvailable: number[];
  pageSelected: number;

  constructor(
    private imperativeService: ImperativeService
  ) { }

  ngOnInit() {
    this.pageSelected = this.imperativeService.getPageSelected();
    // Wrong!!!!!!!!!!!
    setTimeout(() => {
      this.getNumberOfPagesAvailable();
    }, 1500);
  }

  selectPage(pageSelected: number) {
    this.pageSelected = pageSelected;
    this.imperativeService.setPageSelected(pageSelected);
    this.pageSelectedEmitter.emit('');
    this.getNumberOfPagesAvailable();
  }

  public getNumberOfPagesAvailable() {
    this.pagesAvailable = this.imperativeService.getNumberOfPagesAvailable();
    this.pageSelected = this.imperativeService.getPageSelected();
  }

}
