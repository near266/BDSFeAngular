import {Component, OnInit} from '@angular/core';
import {Transaction} from "../model/transaction";
import {CustomerService} from "../service/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

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
  transactionList = [];

  constructor(
    private dialog: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute
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
    this.requestBalance.to =  this.dateTime[0] || '';
    this.requestBalance.from =  this.dateTime[1] || '';
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
