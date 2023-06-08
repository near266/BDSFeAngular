import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageInputUploadComponent} from './image-input-upload/image-input-upload.component';
import {ImageModule} from "primeng/image";
import { NumberOnlyDirective } from './number-only.directive';


@NgModule({
  declarations: [
    ImageInputUploadComponent,
    NumberOnlyDirective
  ],
  imports: [
    CommonModule,
    ImageModule
  ],
  exports: [
    ImageInputUploadComponent,
    NumberOnlyDirective
  ]
})
export class ShareModule {
}
