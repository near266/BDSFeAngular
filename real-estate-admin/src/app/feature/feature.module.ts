import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SlotModule} from "./slot/slot.module";
import {PostModule} from "./post/post.module";

@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    CommonModule,
    SplitButtonModule,
    FeatureRoutingModule,
    SlotModule,
    PostModule
  ]
})
export class FeatureModule { }
