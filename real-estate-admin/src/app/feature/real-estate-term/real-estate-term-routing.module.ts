import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { RealEstateTermMenuComponent } from './real-estate-term-menu/real-estate-term-menu.component';
import { RealEstateRegulationComponent } from './real-estate-regulation/real-estate-regulation.component';
import { RegulationUpdateComponent } from './real-estate-regulation/regulation-update/regulation-update.component';


const router: Routes =[

{
path : '',
component : RealEstateTermMenuComponent,
children :[
{path : 'regulation', component : RealEstateRegulationComponent},
{path:'regulationUpdate' ,component: RegulationUpdateComponent}
]
},
{
path:'regulationUpdate',component:RegulationUpdateComponent
},
{
  path:'regulationCreate',component:RegulationUpdateComponent
  }
]
@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: [RouterModule]
  })
  export class RealEstateTermRoutingModule { }