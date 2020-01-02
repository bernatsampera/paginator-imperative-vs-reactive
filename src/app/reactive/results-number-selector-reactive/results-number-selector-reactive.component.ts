import { Component, OnInit } from '@angular/core';
import { ReactiveService } from '../reactive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-number-selector-reactive',
  templateUrl: './results-number-selector-reactive.component.html',
  styleUrls: ['./results-number-selector-reactive.component.scss']
})
export class ResultsNumberSelectorReactiveComponent implements OnInit {

  numberOfResultsSelected: Observable<number> = this.reactiveService.numberOfResultsSelected$;

  constructor(private reactiveService: ReactiveService) { }

  ngOnInit() {
  }

  selectNumberOfResults(numberOfResults: number): void {
    this.reactiveService.selectNumberOfResults(numberOfResults);
  }

  getNumberOfResultsList(): number[] {
    return this.reactiveService.getNumberOfResultsList();
  }
}
