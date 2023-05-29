import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { PostDataComponent } from './post-data/post-data.component';
import { PostTabviewComponent } from './post-tabview/post-tabview.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    PostComponent,
    PostDataComponent,
    PostTabviewComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    InputTextModule,
    ButtonModule

  ]
})
export class PostModule { }
