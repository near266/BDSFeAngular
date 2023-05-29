import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostTabviewComponent} from "./post-tabview/post-tabview.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostTabviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
