import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class RealEstateTermService extends BaseService {
 getHttp():HttpClient{
 return this.http;
 }
 getServiceName() :string{
 return 'real-estate-term';
 }
  constructor(private http: HttpClient) {
  super();
  }
  
  getAllTerm(body:any) : Observable<any>{
  return this.doPost('termconditionconfiguration/getall', body).pipe(map((res: any) => res));
  
  }
  UpdateTerm(body:any) : Observable<any>{
  return this.doPut('termconditionconfiguration/update',body).pipe(map((res:any)=>res))
  
  }
  getTypeTerm(): Observable<any> {
  return this.doPost('/typeterm/getall',{}).pipe(map((res:any)=>res));
  }
  getDetailTerm(body:any) :Observable<any>{
  return this.doPost('typeterm/getdetail',body).pipe(map((res:any)=>res));
  }
  DetailTerm(id :any) :Observable<any>
  {
  return this.doGet(`termconditionconfiguration/ViewDetail?Id=${id}`).pipe(map((res:any)=>res));
  }
}
