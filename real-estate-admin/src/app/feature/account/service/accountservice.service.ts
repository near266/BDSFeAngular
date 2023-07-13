import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService extends BaseService {
  getHttp(): HttpClient {
    return this.http;
  }
  getServiceName(): string {
    return 'account';
  }

  constructor(private http: HttpClient) {
    super();
  }
  GetAllUser(body : any):Observable<any>{
 return this.doPost('api/admin/Users/GetAllUser',body).pipe(map((res:any)=>res));
  }
  Search(body :any) :Observable<any>{
  return this.doPost('api/admin/Users/searchUser',body).pipe(map((res:any)=>res));
  }
}
