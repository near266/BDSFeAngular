import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageInputUploadComponent} from './image-input-upload/image-input-upload.component';
import {ImageModule} from "primeng/image";
import {NumberOnlyDirective} from './number-only.directive';
import {ButtonModule} from "primeng/button";
import {VnCurrencyPipe} from './vnd-currency.pipe';


@NgModule({
  declarations: [
    ImageInputUploadComponent,
    NumberOnlyDirective,
    VnCurrencyPipe
  ],
  imports: [
    CommonModule,
    ImageModule,
    ButtonModule
  ],
  exports: [
    ImageInputUploadComponent,
    NumberOnlyDirective,
    VnCurrencyPipe
  ]
})
export class ShareModule {
}
