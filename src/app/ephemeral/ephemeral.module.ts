import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EphemeralComponent } from './ephemeral/ephemeral.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes  = [
  { path: '', component: EphemeralComponent}
]

@NgModule({
  declarations: [EphemeralComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EphemeralModule { }
