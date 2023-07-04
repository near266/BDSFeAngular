import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RealEstateTermMenuComponent } from './real-estate-term-menu/real-estate-term-menu.component';


const router: Routes =[

{
path : '',
component : RealEstateTermMenuComponent,
}]
@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: [RouterModule]
  })
  export class RealEstateTermRoutingModule { }