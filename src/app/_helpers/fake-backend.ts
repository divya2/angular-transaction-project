import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// array in local storage for registered users
const transactionsKey = 'transactions';
let transactions = JSON.parse(localStorage.getItem(transactionsKey)) || [
  {
    id: 1,
    date: '01/10/2020',
    comments: 'Utility bill',
  },
  {
    id: 2,
    date: '15/10/2021',
    comments: 'recent bills',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/transactions') && method === 'GET':
          return getTransactions();
        case url.match(/\/transactions\/\d+$/) && method === 'GET':
          return getTransactionById();
        case url.match(/\/transactions\/\d+$/) && method === 'PUT':
          return updateTransaction();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getTransactions() {
      return ok(transactions.map((x) => basicDetails(x)));
    }

    function getTransactionById() {
      const transaction = transactions.find((x) => x.id === idFromUrl());
      return ok(basicDetails(transaction));
    }

    function updateTransaction() {
      let params = body;
      let transaction = transactions.find((x) => x.id === idFromUrl());

      Object.assign(transaction, params);
      localStorage.setItem(transactionsKey, JSON.stringify(transactions));

      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
    }

    function basicDetails(transaction) {
      const { id, date, comments } = transaction;
      return { id, date, comments };
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
