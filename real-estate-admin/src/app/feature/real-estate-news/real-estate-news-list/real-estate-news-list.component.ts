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
  listDeleteId: any[] = []
  selectedAll = false
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
  typeDelete = '';
  element?: any
  totalRecord = 0;
  dateFrom = '';
  dateTo = '';
  isDelete = false;
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
      this.listDeleteId = []
      this.postNewData = res.data?.map((v: any) => {
        if (this.listDeleteId.includes(v.id)) {
          v.selectedToDelete = true
        }
        else {
          v.selectedToDelete = false
        }
        return v
      });
      this.selectedAll = this.checkAll(this.postNewData)
      this.totalRecord = res.totalCount;
    })
  }

  matchAll(list: any[]) {
    list.forEach((v: any) => {
      if (this.selectedAll) {
        v.selectedToDelete = true
        if (!this.listDeleteId.includes(v.id)) {
          this.listDeleteId.push(v.id)
        }
      }
      else {
        v.selectedToDelete = false
        this.listDeleteId = this.listDeleteId.filter((e: any) => { if (e !== v.id) { return e.id } })
      }
    })
  }

  matchElement(v: any) {
    if (v.selectedToDelete) {
      if (!this.listDeleteId.includes(v.id)) {
        this.listDeleteId.push(v.id)
      }
    }
    else {
      v.selectedToDelete = false
      this.listDeleteId = this.listDeleteId.filter((e: any) => { if (e !== v.id) { return e.id } })
    }
  }

  checkAll(list: any[]) {
    for (let i = 0; i < list.length; i++) {
      if (!list[i].selectedToDelete) {
        return false
      }
    }
    return true
  }

  confirmDelete() {
    if (this.typeDelete === 'list') {
      this.postNewService.deletePostNew({
        listId: this.listDeleteId
      }).subscribe(data => {
        this.messageService.add({ severity: 'success', detail: 'Thao tác thành công ' })
        this.isDelete = false
        this.doGetListPostNew()
      }, (v: any) => {
        this.messageService.add({ severity: 'error', detail: 'Thất bại' })
      })
    }
    if (this.typeDelete === 'element') {
      this.postNewService.deletePostNew({
        listId: [this.element]
      }).subscribe(data => {
        this.messageService.add({ severity: 'success', detail: 'Thao tác thành công ' })
        this.isDelete = false
        this.doGetListPostNew()
      }, (v: any) => {
        this.messageService.add({ severity: 'error', detail: 'Thất bại' })
      })
    }
  }

}
