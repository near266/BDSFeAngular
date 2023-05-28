import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>import('../../src/app/auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: '',
    loadChildren: () =>import('../../src/app/feature/feature-routing.module').then(m => m.FeatureRoutingModule)
  },
  {
    path: 'error',
    loadChildren: () =>import('../../src/app/handle/handle-routing.module').then(m => m.HandleRoutingModule)
  },
  {
    path: '**',
    redirectTo: 'error/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
