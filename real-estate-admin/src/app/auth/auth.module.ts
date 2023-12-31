import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BaseModule} from "../core/base-module";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {MessagesModule} from "primeng/messages";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule
  ]
})
export class AuthModule extends BaseModule {
  constructor(translateService: TranslateService, router: Router) {
    super(translateService, router);
  }
}
