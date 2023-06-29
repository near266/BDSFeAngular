import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

import { RealEstateNewsService } from '../service/real-estate-news.service';

@Component({
  selector: 'app-real-estate-news-list',
  templateUrl: './real-estate-news-list.component.html',
  styleUrls: ['./real-estate-news-list.component.scss']
})
export class RealEstateNewsListComponent implements OnInit {

  postNewData: any[] = [];
  newpostReq = {
    title: undefined,
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
  dateFrom = '';
  dateTo = '';
  isPayment = false;
  isShowImg = false;
  srcShowImg = '';
  maxDate = new Date();

  constructor(
    private router: Router,
    private postNewService: RealEstateNewsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.doGetListPostNew()
  }

  paginate(evt: any) {
    if (this.newpostReq.pageSize !== evt.rows) {
      this.newpostReq.page = 0;
    }
    this.newpostReq.page = evt.page + 1;
    this.newpostReq.pageSize = evt.rows;
    this.doGetListPostNew()
  }

  doGetListPostNew() {
    this.postNewService.getPostNew(this.newpostReq).subscribe(res => {
      this.postNewData = res.data;
      this.totalRecord = res.totalCount;
    })
  }

}
