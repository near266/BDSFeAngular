import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RealEstateNewsCrudComponent } from './real-estate-news-crud/real-estate-news-crud.component';
import { RealEstateNewsListComponent } from './real-estate-news-list/real-estate-news-list.component';

const routes: Routes = [
  {
    path: '',
    component: RealEstateNewsListComponent
  },
  {
    path: 'create',
    component: RealEstateNewsCrudComponent
  },
  {
    path: 'view',
    component: RealEstateNewsCrudComponent
  },
  {
    path: 'edit',
    component: RealEstateNewsCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealEstateNewsRoutingModule { }
