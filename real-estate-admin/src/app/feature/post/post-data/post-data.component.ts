import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NewsItem} from "../model/new-item";
import {Table, TableHeaderCheckbox} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {approveModal} from "../model/confirm-dialog";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

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
  constructor(
    private dialog: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.translateService.get('listStatus').subscribe(res => {
      this.listStatus = res;
    })
    this.data = [
      {
        id: "1",
        code: "N1",
        title: "Bài viết số 1  sad sda sda dsa sda sda da",
        author: "Tác giả 1",
        status: 0,
        createDate: "2023-05-01",
        lastUpdate: "2023-05-10",
      },
      {
        id: "2",
        code: "N2",
        title: "Bài viết số 2",
        author: "Tác giả 2",
        status: 1,
        createDate: "2023-05-02",
        lastUpdate: "2023-05-09",
      },
      {
        id: "3",
        code: "N3",
        title: "Bài viết số 3",
        author: "Tác giả 3",
        status: 2,
        createDate: "2023-05-03",
        lastUpdate: "2023-05-08",
      },
      {
        id: "4",
        code: "N4",
        title: "Bài viết số 4",
        author: "Tác giả 4",
        status: 3,
        createDate: "2023-05-04",
        lastUpdate: "2023-05-07",
      },
      {
        id: "5",
        code: "N5",
        title: "Bài viết số 5",
        author: "Tác giả 5",
        status: 4,
        createDate: "2023-05-05",
        lastUpdate: "2023-05-06",
      },
      {
        id: "6",
        code: "N6",
        title: "Bài viết số 6",
        author: "Tác giả 6",
        status: 5,
        createDate: "2023-05-06",
        lastUpdate: "2023-05-05",
      },
      {
        id: "7",
        code: "N7",
        title: "Bài viết số 7",
        author: "Tác giả 7",
        status: 0,
        createDate: "2023-05-07",
        lastUpdate: "2023-05-04",
      },
      {
        id: "8",
        code: "N8",
        title: "Bài viết số 8",
        author: "Tác giả 8",
        status: 1,
        createDate: "2023-05-08",
        lastUpdate: "2023-05-03",
      },
      {
        id: "9",
        code: "N9",
        title: "Bài viết số 9",
        author: "Tác giả 9",
        status: 2,
        createDate: "2023-05-09",
        lastUpdate: "2023-05-02",
      },
      {
        id: "10",
        code: "N10",
        title: "Bài viết số 10",
        author: "Tác giả 10",
        status: 3,
        createDate: "2023-05-10",
        lastUpdate: "2023-05-01",
      },
    ];
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
  goToView(){
    this.router.navigate(['news', 'view'])
  }
}
