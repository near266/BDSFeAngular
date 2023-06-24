import {Injectable} from '@angular/core';
import {BaseService} from "../../../core/service/base.service";
import {HttpClient} from "@angular/common/http";

;
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {
  getHttp(): HttpClient {
    return this.http;
  }

  getServiceName(): string {
    return "";
  }

  constructor(private http: HttpClient) {
    super();
  }

  getListPost(body: any, isBuy: boolean): Observable<any> {
    if (isBuy) {
      return this.doPost('boughtpost/search', body).pipe(map((res: any) => res)) // tin mua
    }
    return this.doPost('salepost/search', body).pipe(map((res: any) => res)) // tin bán
  }

  getDetail(id: any, isBuy: boolean): Observable<any> {
    if (isBuy) {
      return this.doGet(`boughtpost/id?Id=${id}`).pipe(map((res: any) => res)) // tin bán
    }
    return this.doGet(`salepost/id?Id=${id}`).pipe(map((res: any) => res)) // tin bán
  }

  approve(body: any): Observable<any> {
    return this.doPost('admin/approve', body).pipe(map((res: any) => res))
  }

  delete(body: any, isBuy: boolean): Observable<any> {
    if (isBuy) {
      return this.doPost('boughtpost/deleteBPost', body).pipe(map((res: any) => res))// tin mua
    }
    return this.doPost('salepost/deleteSPost', body).pipe(map((res: any) => res)) // tin bán
  }
  update(body: any, isBuy: boolean): Observable<any> {
    if (isBuy) {
    return this.doPost('bought/updateAdmin', body).pipe(map((res: any) => res)) // tin bán
    }
      return this.doPost('sale/updateAdmin', body).pipe(map((res: any) => res))// tin mua
  }
  
}
