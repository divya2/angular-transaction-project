import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { TransactionsService } from '../../_services/transaction.service';

@Component({
  selector: 'transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit {
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      date: [{ value: '', disabled: true }, Validators.required],
      comments: [
        '',
        [Validators.required, Validators.pattern(/^(?:[a-zA-z0-9\s]+)?$/)],
      ],
    });

    this.transactionService
      .getById(this.id)
      .pipe(first())
      .subscribe((x) => this.form.patchValue(x));
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // if form is invalid rreturn
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.updateTransaction();
  }

  private updateTransaction() {
    this.transactionService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }
}
