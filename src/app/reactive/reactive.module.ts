import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReactiveComponent } from './main-reactive/main-reactive.component';
import { ResultsNumberSelectorReactiveComponent } from './results-number-selector-reactive/results-number-selector-reactive.component';
import { PaginationReactiveComponent } from './pagination-reactive/pagination-reactive.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainReactiveComponent}
]

@NgModule({
  declarations: [MainReactiveComponent, ResultsNumberSelectorReactiveComponent, PaginationReactiveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReactiveModule { }
