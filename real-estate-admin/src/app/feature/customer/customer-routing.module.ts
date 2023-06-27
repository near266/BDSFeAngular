import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from "./customer.component";
import {TabviewCustomerComponent} from "./tabview-customer/tabview-customer.component";
import {ListBalanceComponent} from "./list-balance/list-balance.component";
import {FormCustomerComponent} from "./form-customer/form-customer.component";

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
