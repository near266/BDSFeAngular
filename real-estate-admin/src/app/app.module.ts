import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {BrowserModule} from "@angular/platform-browser";
import {CoreModule} from "./core/core.module";
import {FeatureModule} from "./feature/feature.module";
import {HandleModule} from "./handle/handle.module";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
