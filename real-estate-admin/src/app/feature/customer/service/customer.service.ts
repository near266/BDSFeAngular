import {Injectable} from '@angular/core';
import {BaseService} from "../../../core/service/base.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

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
    return  this.doPost('customer/search', body).pipe(map((res: any) => res));
  }

  getDetailCustomer(id: any): Observable<any>  {
    return this.doGet(`customer/id?Id=${id}`).pipe(map((res: any) => res));
  }

  updateCustomer(body: any): Observable<any>  {
   return this.doPut('customer/update', body).pipe(map((res: any) => res));
  }

  deleteCustomer(body: any): Observable<any> {
    return this.doPost('customer/delete', body).pipe(map((res: any) => res));
  }
  getBalance(body: any): Observable<any>{
    return this.doPost('/gw/Walllet/wallet/searchTransaction', body).pipe(map((res: any) => res));
  }
}
