import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainImperativeComponent } from './main-imperative/main-imperative.component';
// tslint:disable-next-line: max-line-length
import { ResultsNumberSelectorImperativeComponent } from './results-number-selector-imperative/results-number-selector-imperative.component';
import { PaginationImperativeComponent } from './pagination-imperative/pagination-imperative.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MainImperativeComponent}
];

@NgModule({
  declarations: [MainImperativeComponent, ResultsNumberSelectorImperativeComponent, PaginationImperativeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ImperativeModule { }
