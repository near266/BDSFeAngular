import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ConfigComponent } from './config.component';
import { ConfigPackComponent } from './config-pack/config-pack.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigComponent
  },
  // {
  //   path: 'create',
  //   component: RealEstateNewsCrudComponent
  // },
  // {
  //   path: 'view',
  //   component: RealEstateNewsCrudComponent
  // },
  // {
  //   path: 'edit',
  //   component: RealEstateNewsCrudComponent
  // }
];



@NgModule({
  declarations: [
    ConfigComponent,
    ConfigPackComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ConfigModule { }
