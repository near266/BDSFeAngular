import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostTabviewComponent} from "./post-tabview/post-tabview.component";
import {PostComponent} from "./post.component";
import {PostViewComponent} from "./post-view/post-view.component";

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      {
        path: '',
        component: PostTabviewComponent
      },
      {
        path: 'view',
        component: PostViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
