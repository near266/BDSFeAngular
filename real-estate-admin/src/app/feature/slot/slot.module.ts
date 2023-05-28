import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotRoutingModule } from './slot-routing.module';
import { SlotComponent } from './slot/slot.component';
import { SlotCreateComponent } from './slot-create/slot-create.component';


@NgModule({
  declarations: [
    SlotComponent,
    SlotCreateComponent
  ],
  imports: [
    CommonModule,
    SlotRoutingModule
  ]
})
export class SlotModule { }
