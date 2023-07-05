import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { BaseService } from 'src/app/core/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends BaseService {
  getHttp(): HttpClient {
    return this.http;
  }

  getServiceName(): string {
    return 'config';
  }

  constructor(private http: HttpClient) {
    super();
  }

  getConfig(body: any): Observable<any> {
    return this.doPost('admin/priceconfiguration/getall', body).pipe(map((res: any) => res));
  }

  getDetailConfig(id: any): Observable<any> {
    return this.doGet(`newpost/id?Id=${id}`).pipe(map((res: any) => res));
  }

  updateConfig(body: any): Observable<any> {
    return this.doPut('newpost/update', body).pipe(map((res: any) => res));
  }

  addConfig(body: any): Observable<any> {
    return this.doPost('priceconfiguration/addlist', body).pipe(map((res: any) => res));
  }

  deleteConfig(body: any): Observable<any> {
    return this.doDelete('newpost/delete', body).pipe(map((res: any) => res));
  }
}
