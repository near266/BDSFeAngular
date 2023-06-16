import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaService extends BaseService {
  getHttp(): HttpClient {
    return this.http;
  }

  getServiceName(): string {
    return "";
  }

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  uploadFile(body: any[]): Observable<any> {
    const file: FormData = new FormData();
    for (let b of body) {
      file.append('file', b);
    }
    file.append('type', '');
    file.append('dimension', '');
    return this.doPutDataBlob('gateway/Media/Upload', file).pipe(map(res => res))
  }
}
