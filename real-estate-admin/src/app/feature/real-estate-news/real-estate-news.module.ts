import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

import { ShareModule } from 'src/app/share/share.module';
import { CustomTranslateLoader, LANGUAGE_FILE_PATH } from 'src/app/core/translate.loader';

import { RealEstateNewsRoutingModule } from './real-estate-news-routing.module';

import { RealEstateNewsListComponent } from './real-estate-news-list/real-estate-news-list.component';
import { RealEstateNewsCrudComponent } from './real-estate-news-crud/real-estate-news-crud.component';



@NgModule({
  declarations: [
    RealEstateNewsListComponent,
    RealEstateNewsCrudComponent
  ],
  imports: [
    CommonModule,
    RealEstateNewsRoutingModule,
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
    InputNumberModule,
    ShareModule,
    TranslateModule.forChild({
      // missingTranslationHandler: {
      //   provide: MissingTranslationHandler,
      //   useClass: CustomMissingTranslationHandler,
      //   deps: [AppTranslateService]
      // },
      loader: {
        provide: TranslateLoader,
        useFactory: (CustomTranslateLoader),
        deps: [LANGUAGE_FILE_PATH, HttpClient]
      },
      isolate: true,
      useDefaultLang: false
    }),
  ]
})
export class RealEstateNewsModule { }
