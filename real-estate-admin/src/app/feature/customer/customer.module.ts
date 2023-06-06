import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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
import {TranslateModule} from "@ngx-translate/core";
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
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { ListBalanceComponent } from './list-balance/list-balance.component';

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
    InputNumberModule
  ]
})
export class CustomerModule {
}
