import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HandleRoutingModule} from './handle-routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {ButtonModule} from "primeng/button";
import { AccessDeniedComponent } from './access-denied/access-denied.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    HandleRoutingModule,
    ButtonModule
  ]
})
export class HandleModule {
}
