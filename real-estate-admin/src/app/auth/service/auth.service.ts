import { Injectable } from '@angular/core';
import {BaseService} from "../../core/service/base.service";
import {HttpClient} from "@angular/common/http";
import {Login} from "../model/login";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  public readonly TOKEN_KEY = 'token';
  public readonly REFRESH_TOKEN_KEY = 'refresh-token';
  getHttp(): HttpClient {
    return this.http;
  }

  getServiceName(): string {
    return "";
  }

  constructor(private http: HttpClient) {
    super()
  }
  login(body: Login): Observable<any>{
    return this.doPost('authenticate', body).pipe(map((res: any) => res));
  }
  isAuthed(): boolean{
    return  true;
  }
  getToken(): string {
    return '';
  }
   private setCookie(cname: string, cvalue: string, seconds: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }
  setToken(token: string, expireIn: number): void {
    this.deleteCookie(this.TOKEN_KEY);
    this.setCookie(this.TOKEN_KEY, token, expireIn);
  }
  private getCookie(cname: string): string {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  private deleteCookie(cname: string): void {
    const cvalue = this.getCookie(cname);
    if (cvalue !== '') {
      document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
}
