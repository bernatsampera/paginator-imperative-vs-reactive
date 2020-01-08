import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  //   children: [
      {
        path: 'imperative',
        loadChildren: './imperative/imperative.module#ImperativeModule'
      },
      {
        path: 'reactive',
        loadChildren: './reactive/reactive.module#ReactiveModule'
      },
      {
        path: 'state',
        loadChildren: './state/state.module#StateModule'
      },
  //   ],
  // },
  { path: '**', redirectTo: 'imperative'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
