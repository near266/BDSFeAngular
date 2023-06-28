import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImageModule} from "primeng/image";
import {ButtonModule} from "primeng/button";

import {NumberOnlyDirective} from './number-only.directive';
import { Split3NumberPipe } from './split-number.pipe';
import {VnCurrencyPipe} from './vnd-currency.pipe';

import {ImageInputUploadComponent} from './image-input-upload/image-input-upload.component';
import { SingleImageUploadComponent } from './single-image-upload/single-image-upload.component';


@NgModule({
  declarations: [
    ImageInputUploadComponent,
    NumberOnlyDirective,
    VnCurrencyPipe,
    Split3NumberPipe,
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
    Split3NumberPipe,
    SingleImageUploadComponent
  ]
})
export class ShareModule {
}
