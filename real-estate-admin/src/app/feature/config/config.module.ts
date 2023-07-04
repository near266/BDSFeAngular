import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { ConfigComponent } from './config.component';

import { ConfigPackListComponent } from './config-pack-list/config-pack-list.component';
import { ConfigPackComponent } from './config-pack/config-pack.component';
import { ShareModule } from "../../share/share.module";

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
        ConfigPackComponent,
        ConfigPackListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        TableModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ShareModule
    ]
})
export class ConfigModule { }
