import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { BaseService } from 'src/app/core/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class RealEstateNewsService extends BaseService {
  getHttp(): HttpClient {
    return this.http;
  }

  getServiceName(): string {
    return 'real-estate-new';
  }

  constructor(private http: HttpClient) {
    super();
  }

  getPostNew(body: any): Observable<any> {
    return this.doPost('newpost/search', body).pipe(map((res: any) => res));
  }

  getDetailPostNew(id: any): Observable<any> {
    return this.doGet(`newpost/id?Id=${id}`).pipe(map((res: any) => res));
  }

  updatePostNew(body: any): Observable<any> {
    return this.doPut('newpost/update', body).pipe(map((res: any) => res));
  }

  deposit(body: any): Observable<any> {
    return this.doPut('depositRequest', body).pipe(map((res: any) => res));
  }

  deletePostNew(body: any): Observable<any> {
    return this.doPost('newpost/delete', body).pipe(map((res: any) => res));
  }
}
