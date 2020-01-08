import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule, MatInputModule, MatFormFieldModule, MatListModule, MatButtonModule, MatCardModule} from '@angular/material';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NumberOfResultsComponent } from './components/number-of-results/number-of-results.component';



@NgModule({
  declarations: [PaginationComponent, NumberOfResultsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    PaginationComponent,
    NumberOfResultsComponent
  ]
})
export class SharedModule { }
