import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealEstateNewsRoutingModule } from './real-estate-news-routing.module';

import { RealEstateNewsListComponent } from './real-estate-news-list/real-estate-news-list.component';



@NgModule({
  declarations: [
    RealEstateNewsListComponent
  ],
  imports: [
    CommonModule,
    RealEstateNewsRoutingModule
  ]
})
export class RealEstateNewsModule { }
