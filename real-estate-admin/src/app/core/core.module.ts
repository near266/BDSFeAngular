import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AppTranslateService} from "./service/translate.service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {RequestInterceptor} from "./request.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomTranslateLoader, LANGUAGE_FILE_PATH} from "./translate.loader";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogErrorHandle} from "./dialog-error-handle";
import {ConfirmationService} from "primeng/api";
import {ResponseInterceptor} from "./response.interceptor";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (CustomTranslateLoader),
        deps: [LANGUAGE_FILE_PATH, HttpClient]
      },
      isolate: true
    }),
    ConfirmDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: DialogErrorHandle
    },
    {
      provide: LANGUAGE_FILE_PATH,
      useValue: { path: './assets/i18n/app/' }
    },
    ConfirmationService,
    AppTranslateService
  ],
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ConfirmDialogModule
  ],
})
export class CoreModule { }
