import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { AccountViewComponent } from './account-view/account-view.component';
import { ButtonModule } from 'primeng/button';
import { AccountComponent } from './account.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [
  AccountViewComponent,
  AccountComponent,
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    PaginatorModule,
  ]
})
export class AccountmoduleModule { }
