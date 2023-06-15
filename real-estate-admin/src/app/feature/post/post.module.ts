import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostRoutingModule} from './post-routing.module';
import {PostComponent} from './post.component';
import {PostDataComponent} from './post-data/post-data.component';
import {PostTabviewComponent} from './post-tabview/post-tabview.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomTranslateLoader, LANGUAGE_FILE_PATH} from "../../core/translate.loader";
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TabViewModule} from "primeng/tabview";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {DialogService} from "primeng/dynamicdialog";
import {DialogModule} from "primeng/dialog";
import {PostFormComponent} from './post-form/post-form.component';
import {TooltipModule} from 'primeng/tooltip';
import {MessagesModule} from "primeng/messages";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PostViewComponent} from './post-view/post-view.component';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {PostUpdateComponent} from './post-update/post-update.component';
import {PaginatorModule} from "primeng/paginator";
import {CalendarModule} from "primeng/calendar";
import {ShareModule} from "../../share/share.module";
import {HttpClient} from "@angular/common/http";
import {CustomMissingTranslationHandler} from "../../core/translate.missing";
import {AppTranslateService} from "../../core/service/translate.service";
import {BaseModule} from "../../core/base-module";
import {Router} from "@angular/router";

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
    ShareModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler,
        deps: [AppTranslateService]
      },
      loader: {
        provide: TranslateLoader,
        useFactory: (CustomTranslateLoader),
        deps: [LANGUAGE_FILE_PATH, HttpClient]
      },
      isolate: true,
      useDefaultLang: false
    }),
  ],
  providers: [
    {
      provide: LANGUAGE_FILE_PATH,
      useValue: {path: './assets/i18n/news/'}
    },
  ]
})

export class PostModule extends BaseModule{
  constructor(translateService: TranslateService, private router: Router) {
    super(translateService, router)
  }
}
