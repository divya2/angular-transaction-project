import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ITransactions } from '../_models/transactions';

const baseUrl = `${environment.apiUrl}/transactions`;

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ITransactions[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<ITransactions>(`${baseUrl}/${id}`);
  }

  update(id: string, params) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }
}
