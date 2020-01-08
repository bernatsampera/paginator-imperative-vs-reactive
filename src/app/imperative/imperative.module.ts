import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainImperativeComponent } from './main-imperative/main-imperative.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MainImperativeComponent}
];

@NgModule({
  declarations: [MainImperativeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ImperativeModule { }
