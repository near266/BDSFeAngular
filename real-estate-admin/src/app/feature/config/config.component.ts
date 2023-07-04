import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  listConfig: any[] = []
  isUpdate = false

  configDetail = {}

  constructor(
    private router: Router,
    private configService: ConfigService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.configService.getConfig({}).subscribe((data: any) => {
      this.listConfig = data
    })
  }

  edit(e:any){
    this.isUpdate = true
    this.configDetail=e
    console.log(this.configDetail);
  }

}
