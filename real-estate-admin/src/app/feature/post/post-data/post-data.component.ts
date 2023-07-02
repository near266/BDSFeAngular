import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {TranslateService} from "@ngx-translate/core";

import {Table, TableHeaderCheckbox} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {Paginator} from "primeng/paginator";

import {approveModal, deleteModal} from "../model/confirm-dialog";
import {NewsItem} from "../model/new-item";
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
  @ViewChild('paginator', {static: false}) paginator: Paginator;
  isShowModalApprove = false;
  isShowModalReject = false;
  isShowRejectReason = false;
  listStatus = [];
  totalRecord = 0;
  listRequest = {
    title: '',
    // code: '',
    id: '',
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
      this.listRequest.page = 0;
    }
    this.listRequest.page = evt.page + 1;
    this.listRequest.pageSize = evt.rows;
    this.getListPost();
  }

  approve(id: any) {
    this.confirmationService.confirm({
      ...approveModal,
      accept: () => {
        const bodyApprove = {
          postType: this.isBuy ? 0 : 1,
          listId: [id],
          status: 1,
        }
        this.postService.approve(bodyApprove).subscribe(res => {
          this.isShowRejectReason = false;
          this.successMessage();
          this.getListPost();
        })
      }
    })
  }

  /*
  * input: Action
  * Approve = 1
  * Reject = 2
  * */
  doChangeAction(action: number) {
    let listId: any[] = [];
    this.dataSelection.forEach(el => {
      listId.push(el.id);
    })
    const bodyApprove = {
      postType: this.isBuy ? 0 : 1,
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
      this.successMessage();
      this.getListPost();
    })
  }

  reject(listId: any) {
    this.isShowRejectReason = true;
    this.bodyApproveOne = {
      postType: this.isBuy ? 0 : 1,
      listId: [listId],
      status: 2,
      reason: ''
    }
  }

  doReject() {
    this.bodyApproveOne.reason = this.reason || this.reasonOne;
    this.postService.approve(this.bodyApproveOne).subscribe(res => {
      this.isShowRejectReason = false;
      this.successMessage();
      this.getListPost();
    })
  }

  successMessage() {
    this.messageService.add({severity: 'success', detail: 'Thao tác thành công'});
  }

  delete(id: any) {
    const body = {
      listId: [id]
    }
    this.confirmationService.confirm({
      ...deleteModal,
      accept: () => {
        this.postService.delete(body, this.isBuy).subscribe(res => {
          this.successMessage();
          this.getListPost();
        })
      }
    })
  }

  isValidateAction() {
    for (let s of this.dataSelection) {
      if (s.status !== 0) {
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


  update(body: any) {
    this.postService.update(body, this.isBuy).subscribe(res => {
      this.messageService.add({severity: 'success', detail: 'Thao tác thành công'});
      this.getListPost()
    })
  }


  approveAll() {
    if (!this.isValidateAction()) {
      this.isShowModalApprove = true;
    }
  }

  rejectAll() {
    if (!this.isValidateAction()) {
      this.isShowModalReject = true;
    }
  }

  goToView(id: string) {
    this.router.navigate(['news', 'view'], {queryParams: {id, isBuy: this.isBuy}})
  }
}
