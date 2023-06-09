import {Component, OnInit} from '@angular/core';
import {PaymentConfirm} from "../model/payment-confirm";
import {Router} from "@angular/router";
import {CustomerService} from "../service/customer.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent implements OnInit {
  paymentData = [];
  depositReq = {
    userName: '',
    dateTo: '',
    dateFrom: '',
    page: 1,
    pageSize: 10
  };
  paymentRequest = {
    customerId: '',
    amountWallet: '',
    amountWalletPromotional: '',
    currency: ''
  };
  customerName = '';
  totalRecord = 0;
  pageSize = 10;
  dateTime = [];
  page = 1;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private messageService: MessageService,
  ) {
  }

  isPayment = false;

  ngOnInit(): void {
    this.doGetListDeposit();
  }

  doGetListDeposit() {
    this.customerService.getDepositRequest(this.depositReq).subscribe(res => {
      this.paymentData = res.data;
      this.totalRecord = res.totalCount;
    })
  }

  paginate(evt: any) {
    if (this.depositReq.pageSize !== evt.rows) {
      this.page = 0;
    }
    this.depositReq.page = evt.page + 1;
    this.depositReq.pageSize = evt.rows;
    this.doGetListDeposit();
  }

  openPayment(customer: any) {
    this.paymentRequest.customerId = customer.id;
    this.paymentRequest.currency = 'VND';
    this.customerName = customer.customerName;
    this.isPayment = true;
  }

  confirmRequest() {
    this.customerService.paymentRequest(this.paymentRequest).subscribe(res => {
      this.isPayment = false;
      this.messageService.add({severity: 'success', detail: 'Thao tác thành công '})
    })
  }
}
