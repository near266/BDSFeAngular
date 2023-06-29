import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RealEstateNewsListComponent } from './real-estate-news-list/real-estate-news-list.component';

const routes: Routes = [
  {
    path: '',
    component: RealEstateNewsListComponent,
    // children: [
    //   {
    //     path: '',
    //     component: PostTabviewComponent
    //   },
    //   {
    //     path: 'view',
    //     component: PostViewComponent,
    //   },
    //   {
    //     path: 'edit',
    //     component: PostUpdateComponent
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealEstateNewsRoutingModule { }
