import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination-state',
  templateUrl: './pagination-state.component.html',
  styleUrls: ['./pagination-state.component.scss']
})
export class PaginationStateComponent implements OnInit {

  Arr = Array;
  pagesAvailable$: Observable<number> = this.stateService.pagesAvailable$;
  selectedPage: Observable<number> = this.stateService.page$;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  selectPage(page: number): void {
    this.stateService.selectPage(page);
  }

}
