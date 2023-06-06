import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { PostDataComponent } from './post-data/post-data.component';
import { PostTabviewComponent } from './post-tabview/post-tabview.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {LANGUAGE_FILE_PATH} from "../../core/translate.loader";
import {TranslateModule} from "@ngx-translate/core";
import {TabViewModule} from "primeng/tabview";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {DialogService} from "primeng/dynamicdialog";
import {DialogModule} from "primeng/dialog";
import { PostFormComponent } from './post-form/post-form.component';
import { TooltipModule } from 'primeng/tooltip';
import {MessagesModule} from "primeng/messages";
import {InputTextareaModule} from "primeng/inputtextarea";
import { PostViewComponent } from './post-view/post-view.component';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import { PostUpdateComponent } from './post-update/post-update.component';
import {PaginatorModule} from "primeng/paginator";
import {CalendarModule} from "primeng/calendar";
import {ShareModule} from "../../share/share.module";

@NgModule({
  declarations: [
    PostComponent,
    PostDataComponent,
    PostTabviewComponent,
    PostFormComponent,
    PostViewComponent,
    PostUpdateComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    TableModule,
    DropdownModule,
    FormsModule,
    TranslateModule,
    TabViewModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    TooltipModule,
    MessagesModule,
    InputTextareaModule,
    CardModule,
    ImageModule,
    PaginatorModule,
    CalendarModule,
    ShareModule
  ],
  providers: [
    {
      provide: LANGUAGE_FILE_PATH,
      useValue: { path: './assets/i18n/news/' }
    },
  ]
})
export class PostModule { }
