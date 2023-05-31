import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {BrowserModule} from "@angular/platform-browser";
import {CoreModule} from "./core/core.module";
import {FeatureModule} from "./feature/feature.module";
import {HandleModule} from "./handle/handle.module";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    FeatureModule,
    // HandleModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
