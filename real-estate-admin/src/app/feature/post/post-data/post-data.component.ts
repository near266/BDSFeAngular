import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NewsItem} from "../model/new-item";
import {Table, TableHeaderCheckbox} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {approveModal} from "../model/confirm-dialog";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {PostService} from "../service/post.service";

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.scss']
})
export class PostDataComponent implements OnInit {
  @Input() isBuy: boolean;
  data: NewsItem[] = [];
  dataSelection: NewsItem[] = [];
  @ViewChild('checkAll') checkAll: TableHeaderCheckbox;
  isCheckAll = false;
  isShowModalApprove = false;
  isShowModalReject = false;
  listDoNotAction = [3, 4, 5]
  isShowRejectReason = false;
  listStatus = [];
  pageSize = 10;
  page = 1;
  totalRecord = 0;
  listRequest = {
    title: '',
    status: 0,
    page: 1,
    pageSize: 10
  }

  constructor(
    private dialog: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.translateService.get('listStatus').subscribe(res => {
      this.listStatus = res;
    })
    this.getListPost();
  }

  getListPost() {
    this.postService.getListPost(this.listRequest, this.isBuy).subscribe((res: any) => {
      this.data = res.data;
      this.totalRecord = res.totalCount;
    })
  }

  paginate(evt: any) {
    this.listRequest.pageSize = evt.rows;
    this.listRequest.page = evt.pageCount;
    this.getListPost();
  }

  onCheckAllChange(event: any) {
    this.dataSelection = this.isCheckAll ? this.data : [];
  }

  cboChange(ent: any) {
    this.isCheckAll = this.dataSelection.length === this.data.length;
  }

  approve() {
    this.confirmationService.confirm({
      ...approveModal,
      accept: () => {
        console.log('aaaaaa')
      }
    })
  }

  reject() {
    this.isShowRejectReason = true;

  }

  down() {
    this.confirmationService.confirm({
      key: 'errorDialog',
      header: 'Duyệt',
      message: 'bạn xác nhận sẽ hạ bài này',
      acceptLabel: 'ok',
      rejectLabel: 'ko',
      rejectButtonStyleClass: 'p-button-outlined',
      acceptButtonStyleClass: 'p-button-warning',
      accept: () => {
      }
    })
  }

  isValidateApprove() {
    for (let s of this.dataSelection) {
      if (s.status === 1 || this.listDoNotAction.includes(s.status)) {
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: 'Một số bản ghi không thể duyệt hoặc đã duyệt'
        })
        return true;
      }
    }
    return false;
  }

  isValidateReject() {
    for (let s of this.dataSelection) {
      if (s.status === 2 || this.listDoNotAction.includes(s.status)) {
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail: 'Một số bản ghi không thể từ chối hoặc đã từ chối'
        })
        return true;
      }
    }
    return false;
  }

  approveAll() {
    if (!this.isValidateApprove()) {
      this.isShowModalApprove = true;
    }
  }

  rejectAll() {
    if (!this.isValidateReject()) {
      this.isShowModalReject = true;
    }
  }

  goToView(id: string) {
    this.router.navigate(['news', 'view'], {queryParams: {id, isBuy: this.isBuy}})
  }
}
