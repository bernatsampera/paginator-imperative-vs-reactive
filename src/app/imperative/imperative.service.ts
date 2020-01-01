import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImperativeService {
  private continentsApi = '/api/continents';
  private _resultsNumberList = [1, 3, 5, 7];
  private continents: string[];

  // Display Variables
  private numberOfResultsSelected = 7;
  private pageSelected = 0;
  private continentKeys;

  constructor(private http: HttpClient) { }

  getContinents(): Observable<string[]> {
    return this.http.get<string[]>(this.continentsApi).pipe(
      tap((continents) => this.continents = continents),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }

  getContinentsToDisplay(): string[] {
    return this.continents
    .filter(cont => this.continentKeys ? cont.includes(this.continentKeys) : cont);
    // .slice(firstIndex, this.numberOfResultsSelected); Can't put here because it will alter the number of pages that will be displayed
  }

  getContinentsToDisplayInPage(): string[] {
    const firstIndex = this.numberOfResultsSelected * this.pageSelected;
    console.log(`numberOfResultsSelected: ${this.numberOfResultsSelected},
    pageSelected: ${this.pageSelected}, continents: ${this.getContinentsToDisplay()}
    firstIndex: ${firstIndex}`);
    return this.getContinentsToDisplay()
    .slice(firstIndex, firstIndex + this.numberOfResultsSelected);
  }

  getResultsNumberList(): number[] {
    return this._resultsNumberList;
  }

  getNumberOfPagesAvailable(): number[] {
    return Array(Math.ceil(this.getContinentsToDisplay().length / this.numberOfResultsSelected));
  }

  setContinentKeys(continentKeys: string) {
    this.setPageSelected(0);
    this.continentKeys = continentKeys;
  }

  setNumberOfResultsSelected(numberOfResults: number) {
    this.setPageSelected(0);
    this.numberOfResultsSelected = numberOfResults;
  }

  getNumberOfResultsSelected(): number {
    return this.numberOfResultsSelected;
  }

  setPageSelected(pageSelected: number) {
    this.pageSelected = pageSelected;
  }

  getPageSelected() {
    return this.pageSelected;
  }
}
