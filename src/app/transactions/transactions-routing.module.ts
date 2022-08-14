import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionBaseComponent } from './transaction-base.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionBaseComponent,
    children: [
      { path: '', component: TransactionListComponent },
      { path: 'transactionEdit/:id', component: TransactionDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
