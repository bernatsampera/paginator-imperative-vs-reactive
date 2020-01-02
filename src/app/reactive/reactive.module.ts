import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReactiveComponent } from './main-reactive/main-reactive.component';
import { ResultsNumberSelectorReactiveComponent } from './results-number-selector-reactive/results-number-selector-reactive.component';
import { PaginationReactiveComponent } from './pagination-reactive/pagination-reactive.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MainReactiveComponent}
];

@NgModule({
  declarations: [MainReactiveComponent, ResultsNumberSelectorReactiveComponent, PaginationReactiveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ReactiveModule { }
