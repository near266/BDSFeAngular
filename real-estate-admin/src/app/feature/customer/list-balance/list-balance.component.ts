import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";

import {TranslateService} from "@ngx-translate/core";

import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";

import {responseTran, Transaction} from "../model/transaction";
import {CustomerService} from "../service/customer.service";

@Component({
  selector: 'app-list-balance',
  templateUrl: './list-balance.component.html',
  styleUrls: ['./list-balance.component.scss']
})
export class ListBalanceComponent implements OnInit {
  requestBalance: any = {
    userId: '',
    from: '',
    to: '',
    type: null,
    page: 1,
    pageSize: 10
  }
  typeList: any[];
  pageSize = 10;
  totalRecord: number;
  page = 1;
  transactionList: Transaction[];
  maxDate = new Date();
  balanceInfo: any  = {};
  constructor(
    private dialog: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.translateService.get('typeList').subscribe(res => {
      this.typeList = res;
    })
    this.route.paramMap.subscribe(params => {
      this.requestBalance.userId = params.get('id');
    });
    this.getBalance();
  }

  getBalance() {
     if (this.requestBalance.from && this.requestBalance.to && this.requestBalance.from > this.requestBalance.to) {
      this.messageService.add({severity: 'error', detail: 'Từ ngày phải nhỏ hơn đến ngày'});
      return;
    }
    this.customerService.getBalance(this.requestBalance).subscribe(res => {
      this.transactionList = res.data;
      this.totalRecord = res.totalCount;
      this.balanceInfo = this.transactionList[0];
    })

  }

  paginate(evt: any) {
    if (this.requestBalance.pageSize !== evt.rows) {
      this.page = 0;
    }
    this.requestBalance.page = evt.page + 1;
    this.requestBalance.pageSize = evt.rows;
    this.getBalance();
  }
}
