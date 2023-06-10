import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerComponent} from './customer.component';
import {ListCustomerComponent} from './list-customer/list-customer.component';
import {TabviewCustomerComponent} from './tabview-customer/tabview-customer.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TabViewModule} from "primeng/tabview";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {TooltipModule} from "primeng/tooltip";
import {MessagesModule} from "primeng/messages";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {PaginatorModule} from "primeng/paginator";
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from 'primeng/inputnumber';
import {ListPaymentComponent} from './list-payment/list-payment.component';
import {ListBalanceComponent} from './list-balance/list-balance.component';
import {CustomTranslateLoader, LANGUAGE_FILE_PATH} from "../../core/translate.loader";
import {ShareModule} from "../../share/share.module";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CustomMissingTranslationHandler} from "../../core/translate.missing";
import {AppTranslateService} from "../../core/service/translate.service";
import {Router} from "@angular/router";
import {BaseModule} from "../../core/base-module";

export function createTranslateLoader(http: HttpClient, filePath: string) {
  return new TranslateHttpLoader(http, '/assets/i18n/customers/', '.json');
}

@NgModule({
  declarations: [
    CustomerComponent,
    ListCustomerComponent,
    TabviewCustomerComponent,
    ListPaymentComponent,
    ListBalanceComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    TableModule,
    DropdownModule,
    FormsModule,
    TranslateModule,
    TabViewModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    TooltipModule,
    MessagesModule,
    InputTextareaModule,
    CardModule,
    ImageModule,
    PaginatorModule,
    CalendarModule,
    InputNumberModule,
    ShareModule,
    TranslateModule.forChild({
      // missingTranslationHandler: {
      //   provide: MissingTranslationHandler,
      //   useClass: CustomMissingTranslationHandler,
      //   deps: [AppTranslateService]
      // },
      loader: {
        provide: TranslateLoader,
        useFactory: (CustomTranslateLoader),
        deps: [LANGUAGE_FILE_PATH, HttpClient]
      },
      isolate: true,
      useDefaultLang: false
    }),
  ],
  providers: [
    {
      provide: LANGUAGE_FILE_PATH,
      useValue: {path: './assets/i18n/customers/'}
    },
    DatePipe
  ]
})
export class CustomerModule extends BaseModule{
  constructor(translateService: TranslateService, private router: Router) {
    super(translateService, router)
  }
}
