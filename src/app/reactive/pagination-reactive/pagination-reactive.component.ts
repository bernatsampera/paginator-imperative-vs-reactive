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
  pageSelected: Observable<number> = this.reactiveService.pageSelected$;

  constructor(private reactiveService: ReactiveService) { }

  ngOnInit() {
  }

  selectPage(page: number): void {
    this.reactiveService.selectPage(page);
  }
}
