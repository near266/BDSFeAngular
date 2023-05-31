import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostTabviewComponent} from "./post-tabview/post-tabview.component";
import {PostComponent} from "./post.component";

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
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
