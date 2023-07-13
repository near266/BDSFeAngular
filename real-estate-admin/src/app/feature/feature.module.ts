import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SplitButtonModule} from 'primeng/splitbutton';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';

import {CustomerModule} from "./customer/customer.module";
import {PostModule} from "./post/post.module";
import {SlotModule} from "./slot/slot.module";
import { AccountComponent } from './account/account.component';
import { AccountViewComponent } from './account/account-view/account-view.component';
import { AccountmoduleModule } from './account/accountmodule.module';




@NgModule({
  declarations: [
    FeatureComponent,

    
  ],
  imports: [
    CommonModule,
    SplitButtonModule,
    FeatureRoutingModule,
    SlotModule,
    PostModule,
    CustomerModule,
    AccountmoduleModule,
    
  
   
  ]
})
export class FeatureModule { }
