import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { responseTran, Transaction } from "../model/transaction";
import { BaseService } from "../../../core/service/base.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {
  getHttp(): HttpClient {
    return this.http;
  }

  getServiceName(): string {
    return 'customer';
  }

  constructor(private http: HttpClient) {
    super();
  }

  getCustomer(body: any): Observable<any> {
    return this.doPost('customer/search', body).pipe(map((res: any) => res));
  }

  addCustomer(body: any): Observable<any> {
    return this.doPost('api/register', body).pipe(map((res: any) => res));
  }

  updateCustomer(body: any): Observable<any> {
    return this.doPut('customer/update', body).pipe(map((res: any) => res));
  }

  deposit(body: any): Observable<any> {
    return this.doPut('depositRequest', body).pipe(map((res: any) => res));
  }

  deleteCustomer(body: any): Observable<any> {
    return this.doPost('customer/delete', body).pipe(map((res: any) => res));
  }

  unBanCustomer(body: any): Observable<any> {
    return this.doPost('api/activate', body).pipe(map((res: any) => res));
  }

  getBalance(body: any): Observable<responseTran> {
    return this.doPost('gw/Walllet/wallet/searchTransaction', body).pipe(map((res: any) => res));
  }

  getDepositRequest(body: any): Observable<any> {
    return this.doPost('depositRequest/ViewAdmin', body).pipe(map((res: any) => res));
  }

  paymentRequest(body: any): Observable<any> {
    return this.doPut('wallet/updateAmount', body).pipe(map((res: any) => res));
  }

  getCustomerDetail(id: any): Observable<any> {
    return this.doGet(`customer/id?Id=${id}`).pipe(map((res: any) => res));
  }

  updateCustomerDetail(body: any): Observable<any> {
    return this.doPut('customer/update', body).pipe(map((res: any) => res));
  }
}
