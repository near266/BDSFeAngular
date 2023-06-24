import { error } from '@angular/compiler-cli/src/transformers/util';
import { district } from './../model/district';
import { PostService } from './../../post/service/post.service';
import { SlotServiceService } from './../service/slot-service.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ward } from '../model/ward';
import { TranslateService } from '@ngx-translate/core';
import { Paginator } from "primeng/paginator";
import { ConfirmationService, MessageService } from 'primeng/api';
import { deleteModal, errorModal } from '../../post/model/confirm-dialog';
import { toUpper } from 'lodash-es';


@Component({
  selector: 'app-slotdata',
  templateUrl: './slotdata.component.html',
  styleUrls: ['./slotdata.component.scss']
})
export class SlotdataComponent implements OnInit {
  [x: string]: any;
  data: ward[] = [];
  ListDist: district[] = [];
  dataSelection: ward[] = [];
  listStatus = [];
  IsShowDialog: boolean;
  select: string | undefined;
  @ViewChild('paginator', { static: false }) paginator: Paginator;
  @Input() typecheck: number;
  totalRecord = 0;
  RequestGetList = {
    name: '',
    page: 1,
    pageSize: 10
  }
  RequestSearch = {
    districtId: null,
    name: '',
    page: 1,
    pageSize: 10
  }
  AddRequest = {
    name: '',
    districtId: '',
    description: '',
    order: 0

  }

  constructor(
    private slotServiceService: SlotServiceService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,



  ) { }

  ngOnInit(): void {
    this.translateService.get('listStatus').subscribe(res => {
      this.listStatus = res;
    })
    this.getListSLot();
  }

  getListSLot() {
    this.slotServiceService.getListSlot(this.RequestGetList)
      .subscribe((res: any) => {
        this.data = res.data;
        this.totalRecord = res.totalCount;
      })
  }
  search() {
    if (this.RequestGetList.name != '') {
      this.slotServiceService.getListSlot(this.RequestGetList)
        .subscribe((res: any) => {
          this.data = res.data;
          this.totalRecord = res.totalCount;
        })
    }
    if (this.RequestSearch.name != '') {
      this.slotServiceService.SearchDistrict(this.RequestSearch).subscribe((res: any) => {
        this.data = res.data;
        this.totalRecord = res.totalCount;
      })
    }
    if (this.RequestGetList.name == '' && this.RequestSearch.name == '') {

      this.getListSLot();
    }
  }
  paginate(evt: any) {
    if (this.RequestGetList.pageSize !== evt.rows) {
      this.RequestGetList.page = 0;
    }
    this.RequestGetList.page = evt.page + 1;
    this.RequestGetList.pageSize = evt.rows;
    this.getListSLot();
  }
  successMessage() {
    this.messageService.add({ severity: 'success', detail: 'thao tác thành công' });
  }
  errorMessage() {
    this.messageService.add({ severity: 'success', detail: 'vui lòng nhập đúng thông tin' });
  }
  delete(id: any) {
    const body = {
      listId: [id]
    }
    this.confirmationService.confirm({
      ...deleteModal,
      accept: () => {
        this.slotServiceService.Delete(body).subscribe(res => {

          this.successMessage();
          this.getListSLot();
        })
      }
    })
  }
  getAllDistrict() {

    this.slotServiceService.GetAllDistrict().subscribe((res: any) => {
      this.ListDist = res;
    });
  }
  AddSLot() {

    if (this.AddRequest.name === '') {
      this.confirmationService.confirm({
        ...errorModal,
        reject: () => {
          this.errorMessage();
        }

      })
    }
    else {
      this.slotServiceService.Add(this.AddRequest).subscribe((res: any) => {
      });
      this.getListSLot();
    }
  }
  ShowModel(type: number) {
    if (type === 1) {

      this.IsShowDialog = true;
    }
    if (type === 2) {
      this, this.IsShowDialog = false;
    }
  }
}
