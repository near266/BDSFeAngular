import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "../auth/auth.guard";

import {FeatureComponent} from "./feature.component";

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'slot',
        loadChildren: () => import('./slot/slot-routing.module').then(m => m.SlotRoutingModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./post/post.module').then(m => m.PostModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'real-estate-new',
        loadChildren: () => import('./real-estate-news/real-estate-news.module').then(m => m.RealEstateNewsModule)
      },
      {
        path: 'config',
        loadChildren: () => import('./config/config.module').then(m => m.ConfigModule)
      },
      {
        path: 'account',
        component: FeatureComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {
}
