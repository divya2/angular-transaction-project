import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionBaseComponent } from './transaction-base.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TransactionsRoutingModule],
  declarations: [
    TransactionBaseComponent,
    TransactionListComponent,
    TransactionDetailsComponent,
  ],
})
export class TransactionsModule {}
