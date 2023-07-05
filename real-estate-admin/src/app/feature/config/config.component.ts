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

  listUnit = [
    {
      label: '%',
      value: 1
    },
    {
      label: 'VNĐ',
      value: 2
    }]

  constructor(
    private router: Router,
    private configService: ConfigService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.configService.getConfig({}).subscribe((data: any) => {
      this.listConfig = data
    })
  }

  edit(e: any) {
    this.configDetail = {
      id: e.typePrice.id,
      name: e.typePrice.name,
      config: e.priceConfiguration?.map((v: any) => {
        v = {
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
        let typePri = [...v.typePri]
        for (let i = 0; i < 3 - v.typePri?.length; i++) {
          typePri?.push(
            {
              date: 0,
              discount: 0,
              unit: 1
            }
          )
        }
        v.typePri = typePri
        return v
      })
    }
    let list = [...this.configDetail.config]
    for (let i = 0; i < 3 - this.configDetail.config?.length; i++) {
      list?.push(
        {
          type: this.configDetail.config?.length + i + 1,
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
        }
      )
    }
    this.configDetail.config = list
    this.isUpdate = true
  }

  add() {
    this.configDetail = {
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
    this.isAdd = true
  }

  update(c: any) {
    c.rq = {
      id: c.rq.id,
      name: c.rq.name,
      config: c.rq.config?.map((v: any) => {
        if (v.priceDefault > 0) {
          return {
            type: v.type,
            priceDefault: v.priceDefault,
            typePri: v.typePri?.filter((f: any) => {
              if (f.date > 0) {
                return f
              }
            })
          }
        }
        else {
          return undefined
        }
      })?.filter((v: any) => { if (v) { return v } })
    }
    this.configService.updateConfig(c).subscribe((data: any) => {
      this.isUpdate = false
      this.configService.getConfig({}).subscribe((data: any) => {
        this.listConfig = data
      })
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công' });
    }, (() => {
      this.messageService.add({ severity: 'error', detail: 'Thất bại' });
    }))
  }

  addList(c: any) {
    c.rq = {
      name: c.rq.name,
      config: c.rq.config?.map((v: any) => {
        if (v.priceDefault > 0) {
          return {
            type: v.type,
            priceDefault: v.priceDefault,
            typePri: v.typePri?.filter((f: any) => {
              if (f.date > 0) {
                return f
              }
            })
          }
        }
        else {
          return undefined
        }
      })?.filter((v: any) => { if (v) { return v } })
    }
    this.configService.addConfig(c).subscribe((data: any) => {
      this.isAdd = false
      this.configService.getConfig({}).subscribe((data: any) => {
        this.listConfig = data
      })
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công' });
    }, (() => {
      this.messageService.add({ severity: 'error', detail: 'Thất bại' });
    }))
  }
  delete(body:any){
    this.configService.deleteConfig(body).subscribe((data: any) => {
      this.isUpdate = false
      this.configService.getConfig({}).subscribe((data: any) => {
        this.listConfig = data
      })
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công' });
    }, (() => {
      this.messageService.add({ severity: 'error', detail: 'Thất bại' });
    }))
  }
}
