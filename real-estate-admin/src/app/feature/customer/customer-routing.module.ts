import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CustomerComponent} from "./customer.component";

import {FormCustomerComponent} from "./form-customer/form-customer.component";
import {ListBalanceComponent} from "./list-balance/list-balance.component";
import {TabviewCustomerComponent} from "./tabview-customer/tabview-customer.component";
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        component: TabviewCustomerComponent
      },
      {
        path: 'balance/:id',
        component: ListBalanceComponent
      },
      {
        path: 'create',
        component: FormCustomerComponent
      },
      {
        path: 'view',
        component: ViewCustomerComponent
      },
      {
        path: 'customerDetail/:id',
        component: CustomerDetailComponent
      },
      {
        path: 'customerEdit/:id',
        component: CustomerEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
