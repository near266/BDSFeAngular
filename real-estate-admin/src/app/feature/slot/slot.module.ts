import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotRoutingModule } from './slot-routing.module';
import { SlotComponent } from './slot.component';
import { SlotCreateComponent } from './slot-create/slot-create.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    SlotComponent,
    SlotCreateComponent
  ],
  imports: [
    CommonModule,
    SlotRoutingModule,
    InputTextModule,
    ButtonModule
  ]
})
export class SlotModule { }
