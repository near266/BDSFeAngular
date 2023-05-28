import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {BaseErrorHandle} from './base-error-handle';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {UtilService} from './service/util.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfirmationService} from 'primeng/api';
import {
  ApiErrorArgsInvalid,
  ApiErrorForbidden,
  ApiErrorNotFound,
  ApiErrorResponse,
  ApiErrorTokenInvalid
} from './model/error-response';
import {NavigationError, Router} from '@angular/router';
import {IdleService} from './service/idle.service';
import {AuthService} from "../auth/service/auth.service";

/**
 * @author TruongNH
 * date: 01/12/2020
 * desc: error handle with global dialog notification in AppComponent
 */
@Injectable()
export class DialogErrorHandle extends BaseErrorHandle implements ErrorHandler {
  constructor(
    private ngzone: NgZone,
    private dialog: ConfirmationService,
    private translate: TranslateService,
    private auth: AuthService,
    private util: UtilService,
    private router: Router,
    private idle: IdleService
  ) {
    super();
  }

  handleError(err: any): void {
    switch (err.constructor) {
      case HttpErrorResponse: {
        this.showDialog(
          this.translate.instant('err.http.title'),
          this.translate.instant(`err.http.${this.getHttpStatusCode(err)}`)
        );
        break;
      }
      case ApiErrorArgsInvalid: {
        if (err.params) {
          let msg = '';
          Object.keys(err.params).forEach((key) => {
            msg += err.params[key] + '<br>';
          });
          this.showDialog(
            this.translate.instant('err.invalid.title'),
            msg
          );
        }
        break;
      }
      case ApiErrorResponse: {
        this.showDialog(
          this.translate.instant('err.api.title'),
          this.translate.instant(`err.api.${err.code}`)
        );
        break;
      }
      case ApiErrorTokenInvalid: {
        // if (!this.auth.isAuthed()) {
        this.idle.stopTimer();
        // this.auth.logOut();
        this.ngzone.run(() => {
          // bypass form leave guard with queryParams expired is 1
          this.router.navigate(['auth', 'login'], {queryParams: {expired: '1'}});
        });
        // }
        break;
      }
      case ApiErrorForbidden: {
        this.ngzone.run(() => {
          this.router.navigate(['public', 'access-denied']);
        });
        break;
      }
      case ApiErrorNotFound: {
        this.ngzone.run(() => {
          this.router.navigate(['public', 'not-found']);
        });
        break;
      }
      default: {
        if (err.name === 'TimeoutError') {
          this.showDialog(
            this.translate.instant('err.api.title'),
            this.translate.instant(`err.api.timeout`)
          );
          break;
        }
        if (environment.logServer) {
          this.sendLogToServer(err);
        }
        if (environment.logClient) {
          if (err.stack !== undefined) {
            console.error(this.getClientStack(err));
          }
        }
      }
    }
  }

  showDialog(title: string, msg: string): void {
    this.ngzone.run(() => {
      this.dialog.confirm({
        key: 'errorDialog',
        header: title,
        message: msg,
        acceptVisible: true,
        rejectVisible: false,
        acceptLabel: this.translate.instant('message.ok'),
        accept: () => {
        }
      });
    });
  }
}
