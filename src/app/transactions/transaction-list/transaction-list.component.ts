import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../_services/transaction.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  pageTitle: string = 'Transaction List';
  transactions = null;

  constructor(private transactionService: TransactionsService) {}

  ngOnInit() {
    this.transactionService
      .getAll()
      .pipe(first())
      .subscribe((transactions) => (this.transactions = transactions));
  }
}
