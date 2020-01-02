import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsNumberSelectorStateComponent } from './results-number-selector-state/results-number-selector-state.component';
import { MainStateComponent } from './main-state/main-state.component';
import { PaginationStateComponent } from './pagination-state/pagination-state.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes  = [
  { path: '', component: MainStateComponent}
]

@NgModule({
  declarations: [ResultsNumberSelectorStateComponent, MainStateComponent, PaginationStateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StateModule { }
