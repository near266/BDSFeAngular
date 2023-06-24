import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseService } from 'src/app/core/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class SlotServiceService extends BaseService {
  getHttp(): HttpClient {
    return this.http;
  }
  getServiceName(): string {
    return "";
  }

  constructor(private http: HttpClient) {
    super()
  }
  getListSlot(body:any) : Observable<any>{
  
   return this.doPost(`ward/search`,body).pipe(map((res: any) => res));
   
  }
  Add(body:any) :Observable<any>{
  return this.doPost(`ward/add`,body).pipe(map((res:any)=>res));
  
  }
  SearchDistrict(body:any){
  return this.doPost(`/ward/searchByDistrictId`,body).pipe(map((res:any)=>res));
  }
  Delete(body:any) : Observable<any> {
  
  return this.doPost(`ward/delete`,body).pipe(map((res: any)=>res));
  }
  GetAllDistrict() : Observable<any> {
  return this.doPost(`district/search`,{}).pipe(map((res:any)=>res));
  }
}
