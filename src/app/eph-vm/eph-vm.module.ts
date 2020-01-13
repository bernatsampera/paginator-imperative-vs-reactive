import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EphVmComponent } from './eph-vm/eph-vm.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: EphVmComponent}
]

@NgModule({
  declarations: [EphVmComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EphVmModule { }
