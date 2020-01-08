import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainStateComponent } from './main-state/main-state.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes  = [
  { path: '', component: MainStateComponent}
]

@NgModule({
  declarations: [ MainStateComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StateModule { }
