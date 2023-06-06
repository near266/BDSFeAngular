import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageInputUploadComponent} from './image-input-upload/image-input-upload.component';
import {ImageModule} from "primeng/image";


@NgModule({
  declarations: [
    ImageInputUploadComponent
  ],
  imports: [
    CommonModule,
    ImageModule
  ],
  exports: [
    ImageInputUploadComponent
  ]
})
export class ShareModule {
}
