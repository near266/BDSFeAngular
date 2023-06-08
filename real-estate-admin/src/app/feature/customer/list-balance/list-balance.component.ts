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
  mockTransactions: Transaction[];
  requestBalance: any = {
    id: '',
    from: '',
    to: '',
    type: 0,
    page: 1,
    pageSize: 10
  }
  dateTime: any;
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
    this.mockTransactions = [
      {
        time: "2023-06-01 10:30 AM",
        transactionType: "Deposit",
        content: "Deposit from bank transfer",
        change: 5000,
        mainAccountBalance: 10000,
        promotionAccountBalance: 0,
        rewardPoints: 10,
      },
      {
        time: "2023-06-02 02:45 PM",
        transactionType: "Withdrawal",
        content: "Withdrawal for shopping",
        change: -2500,
        mainAccountBalance: 7500,
        promotionAccountBalance: 0,
        rewardPoints: 5,
      },
      // Thêm các giao dịch khác tại đây nếu cần
    ];
    this.translateService.get('typeList').subscribe(res => {
      this.typeList = res;
    })
    this.route.paramMap.subscribe(params => {
      this.requestBalance.id = params.get('id');
    });
    this.getBalance();
  }

  getBalance() {
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
