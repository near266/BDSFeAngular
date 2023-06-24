import { PaginatorModule } from 'primeng/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotRoutingModule } from './slot-routing.module';
import { SlotComponent } from './slot.component';
import { SlotCreateComponent } from './slot-create/slot-create.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import { SlotdataComponent } from './slotdata/slotdata.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    SlotComponent,
    SlotCreateComponent,
    SlotdataComponent,

  ],
  imports: [
    CommonModule,
    SlotRoutingModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    FormsModule,
    PaginatorModule,
    DialogModule
 
  ]
})
export class SlotModule { }
