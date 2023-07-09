import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

import { ConfirmationService, MessageService } from "primeng/api";

import { cancelModal } from "../model/modal";
import { PaymentConfirm } from "../model/payment-confirm";
import { CustomerService } from "../service/customer.service";

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
    amountWallet: 0,
    amountWalletPromotional: 0,
    currency: ''
  };
  customerName = '';
  totalRecord = 0;
  pageSize = 10;
  dateFrom = '';
  dateTo = '';
  page = 1;
  isPayment = false;
  isShowImg = false;
  srcShowImg = '';
  customerDataId: any
  maxDate = new Date();
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {
    this.doGetListDeposit();
  }

  doGetListDeposit() {

    if (this.depositReq.dateFrom && this.depositReq.dateTo && this.depositReq.dateFrom > this.depositReq.dateTo) {
      this.messageService.add({ severity: 'error', detail: 'Từ ngày phải nhỏ hơn đến ngày' });
      return;
    }
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
    this.paymentRequest.amountWallet = 0;
    this.paymentRequest.amountWalletPromotional = 0;
    this.isPayment = true;
  }

  confirmRequest() {
    this.customerService.paymentRequest(this.paymentRequest).subscribe(res => {
      this.isPayment = false;
      this.customerService.deposit({ id: this.customerDataId, status: 1 }).subscribe(res => {
        this.doGetListDeposit();
      })
      this.customerDataId = null
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công ' })
    })
  }

  cancelTransaction(id: any) {
    this.confirmationService.confirm({
      ...cancelModal, accept: () => {
        this.customerService.deposit({ id, status: 2 }).subscribe(res => {
          this.messageService.add({ severity: 'success', detail: 'Thao tác thành công ' })
          this.doGetListDeposit();
        })
      }
    })
  }

  doShowImg(src: string) {
    this.isShowImg = true;
    this.srcShowImg = src;
  }
}
