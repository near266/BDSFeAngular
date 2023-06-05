import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NewsItem} from "../model/new-item";
import {Table, TableHeaderCheckbox} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {approveModal, deleteModal} from "../model/confirm-dialog";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {PostService} from "../service/post.service";
import {Paginator} from "primeng/paginator";

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
  @ViewChild('paginator', {static: false}) paginator: Paginator;
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
    status: null,
    page: 1,
    pageSize: 10
  }
  reason: string = '';
  reasonOne: string = '';
  bodyApproveOne = {
    postType: 0,
    listId: [''],
    status: 2,
    reason: ''
  };

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
    if (this.listRequest.pageSize !== evt.rows) {
      this.page = 0;
    }
    this.listRequest.page = evt.page + 1;
    this.listRequest.pageSize = evt.rows;
    this.getListPost();
  }

  approve() {
    this.confirmationService.confirm({
      ...approveModal,
      accept: () => {
        // this.doApprove();
      }
    })
  }

  /*
  * input: Action
  * Approve = 2
  * Reject = 0
  * */
  doChangeAction(action: number) {
    let listId: any[] = [];
    this.dataSelection.forEach(el => {
      listId.push(el.id);
    })
    const bodyApprove = {
      postType: this.isBuy ? 1 : 0,
      listId,
      status: action,
      reason: this.reason
    }
    this.postService.approve(bodyApprove).subscribe(res => {
      if (action === 1) {
        this.isShowModalApprove = false;
      }
      if (action === 2) {
        this.isShowModalReject = false;
      }
      this.getListPost();
    })
  }

  reject(listId: any) {
    this.isShowRejectReason = true;
    this.bodyApproveOne = {
      postType: this.isBuy ? 1 : 0,
      listId: [listId],
      status: 2,
      reason: ''
    }
  }

  doReject() {
    this.bodyApproveOne.reason = this.reason;
    this.postService.approve(this.bodyApproveOne).subscribe(res => {
      this.isShowModalReject = false;
      this.getListPost();
    })

  }

  delete(id: any) {
    const body = {
      listId: [id]
    }
    this.confirmationService.confirm({
      ...deleteModal,
      accept: () => {
        this.postService.delete(body).subscribe(res => {
          console.log(res)
        })
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
