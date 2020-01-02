import { Component, OnInit } from '@angular/core';
import { ReactiveService } from '../reactive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination-reactive',
  templateUrl: './pagination-reactive.component.html',
  styleUrls: ['./pagination-reactive.component.scss']
})
export class PaginationReactiveComponent implements OnInit {
  Arr = Array;
  pagesAvailable: Observable<number> = this.reactiveService.pagesAvailable$;
  pageSelected: number;

  constructor(private reactiveService: ReactiveService) { }

  ngOnInit() {
    this.selectPage(0);
  }

  selectPage(page: number): void {
    this.pageSelected = page;
    this.reactiveService.selectPage(page);
  }
}
