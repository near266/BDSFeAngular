import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SplitButtonModule} from 'primeng/splitbutton';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';

import {CustomerModule} from "./customer/customer.module";
import {PostModule} from "./post/post.module";
import {SlotModule} from "./slot/slot.module";

@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    CommonModule,
    SplitButtonModule,
    FeatureRoutingModule,
    SlotModule,
    PostModule,
    CustomerModule
  ]
})
export class FeatureModule { }
