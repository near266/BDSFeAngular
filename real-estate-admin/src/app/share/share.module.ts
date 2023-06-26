import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageInputUploadComponent} from './image-input-upload/image-input-upload.component';
import {ImageModule} from "primeng/image";
import {NumberOnlyDirective} from './number-only.directive';
import {ButtonModule} from "primeng/button";
import {VnCurrencyPipe} from './vnd-currency.pipe';
import { SingleImageUploadComponent } from './single-image-upload/single-image-upload.component';


@NgModule({
  declarations: [
    ImageInputUploadComponent,
    NumberOnlyDirective,
    VnCurrencyPipe,
    SingleImageUploadComponent
  ],
  imports: [
    CommonModule,
    ImageModule,
    ButtonModule
  ],
  exports: [
    ImageInputUploadComponent,
    NumberOnlyDirective,
    VnCurrencyPipe,
    SingleImageUploadComponent
  ]
})
export class ShareModule {
}
