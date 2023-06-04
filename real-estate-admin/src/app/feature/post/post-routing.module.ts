import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostTabviewComponent} from "./post-tabview/post-tabview.component";
import {PostComponent} from "./post.component";
import {PostViewComponent} from "./post-view/post-view.component";
import {PostUpdateComponent} from "./post-update/post-update.component";

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
        component: PostViewComponent,
      },
      {
        path: 'edit',
        component: PostUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
