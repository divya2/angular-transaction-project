import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const transactionsModule = () =>
  import('./transactions/transactions.module').then(
    (x) => x.TransactionsModule
  );

const routes: Routes = [
  { path: 'transactions', loadChildren: transactionsModule },

  // otherwise redirect to Transaction
  { path: '**', redirectTo: '/transactions' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
