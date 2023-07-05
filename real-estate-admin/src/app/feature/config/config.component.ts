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
  isAdd = false

  configDetail: any = {
    name: null,
    config: [
      {
        type: 1,
        priceDefault: 0,
        typePri: [
          {
            date: 0,
            discount: 0,
            unit: 1
          },
          {
            date: 0,
            discount: 0,
            unit: 1
          },
          {
            date: 0,
            discount: 0,
            unit: 1
          },
        ]
      },
      {
        type: 2,
        priceDefault: 0,
        typePri: [
          {
            date: 0,
            discount: 0,
            unit: 1
          },
          {
            date: 0,
            discount: 0,
            unit: 1
          },
          {
            date: 0,
            discount: 0,
            unit: 1
          },
        ]
      },
      {
        type: 3,
        priceDefault: 0,
        typePri: [
          {
            date: 0,
            discount: 0,
            unit: 1
          },
          {
            date: 0,
            discount: 0,
            unit: 1
          },
          {
            date: 0,
            discount: 0,
            unit: 1
          },
        ]
      },
    ]
  }

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

  edit(e: any) {
    this.isUpdate = true
    this.configDetail = {
      name: e.typePrice.name,
      config: e.priceConfiguration?.map((v: any) => {
        return {
          type: v.type,
          priceDefault: v.priceConfig[0]?.priceDefault ? v.priceConfig[0]?.priceDefault : null,
          typePri: v.priceConfig?.map((c: any) => {
            return {
              date: c.date,
              discount: c.discount,
              unit: c.unit
            }
          })
        }
      })
    }
    console.log(this.configDetail, e);
  }

}
