import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { RouterModule } from '@angular/router';
import { RealEstateTermRoutingModule } from './real-estate-term-routing.module';
import { RealEstateTermMenuComponent } from './real-estate-term-menu/real-estate-term-menu.component';
import { ButtonModule } from 'primeng/button';
import { RealEstateRegulationComponent } from './real-estate-regulation/real-estate-regulation.component';
import { RegulationUpdateComponent } from './real-estate-regulation/regulation-update/regulation-update.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader, LANGUAGE_FILE_PATH } from 'src/app/core/translate.loader';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    RealEstateTermMenuComponent,
    RealEstateRegulationComponent,
    RegulationUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RealEstateTermRoutingModule,
   ButtonModule,
   DropdownModule,
   FormsModule,
   QuillModule,
   FormsModule,
   ReactiveFormsModule,
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
  QuillModule.forRoot()
]
})
   
 
export class RealEstateTermModule { }
