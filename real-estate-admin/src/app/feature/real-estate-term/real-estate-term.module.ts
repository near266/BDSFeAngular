import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { RealEstateTermRoutingModule } from './real-estate-term-routing.module';
import { RealEstateTermMenuComponent } from './real-estate-term-menu/real-estate-term-menu.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    RealEstateTermMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RealEstateTermRoutingModule,
   ButtonModule
  ]
})
export class RealEstateTermModule { }
