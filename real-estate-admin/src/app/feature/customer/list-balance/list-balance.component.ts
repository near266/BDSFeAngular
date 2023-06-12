import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../service/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {responseTran, Transaction} from "../model/transaction";

@Component({
  selector: 'app-list-balance',
  templateUrl: './list-balance.component.html',
  styleUrls: ['./list-balance.component.scss']
})
export class ListBalanceComponent implements OnInit {
  requestBalance: any = {
    id: '',
    from: '',
    to: '',
    type: 0,
    page: 1,
    pageSize: 10
  }
  dateTime: any = [];
  typeList: any[];
  pageSize = 10;
  totalRecord: number;
  page = 1;
  transactionList: Transaction[];
  maxDate = new Date();
  dateFrom = '';
  dateTo = '';

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
      this.requestBalance.id = params.get('id');
    });
    this.getBalance();
  }

  getBalance() {
     if (this.dateFrom && this.dateTo && this.dateFrom > this.dateTo) {
      this.messageService.add({severity: 'error', detail: 'Từ ngày phải nhỏ hơn đến ngày'});
      return;
    }
    this.requestBalance.to =  this.datePipe.transform(this.dateTo, 'dd/MM/yyyy') || '';
    this.requestBalance.from =   this.datePipe.transform(this.dateFrom, 'dd/MM/yyyy') || '';
    this.customerService.getBalance(this.requestBalance).subscribe(res => {
      this.transactionList = res.data;
      this.totalRecord = res.totalCount;
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
