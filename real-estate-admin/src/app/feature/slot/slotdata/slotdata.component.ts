import { error } from '@angular/compiler-cli/src/transformers/util';
import { district } from './../model/district';
import { PostService } from './../../post/service/post.service';
import { SlotServiceService } from './../service/slot-service.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ward } from '../model/ward';
import { TranslateService } from '@ngx-translate/core';
import { Paginator } from "primeng/paginator";
import { ConfirmationService, MessageService } from 'primeng/api';
import { confirmSaveModal, deleteModal, errorModal } from '../../post/model/confirm-dialog';
import { toUpper } from 'lodash-es';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AddModal, DeleteModalSlot, ErrorModalSlot, confirm } from '../model/confirm';


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
  IsUpdateShow: boolean;
  updateForm: FormGroup;
  DetailWard: any;
  params: any
  listStatus = [];
  IsShowDialog: boolean;
  IsDeleteModal =false;
  select: string | undefined;
  @ViewChild('paginator', { static: false }) paginator: Paginator;
  @Input() typecheck: number;
  totalRecord = 0;
  isDeleteAll = false;
  //#region Request
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
    order: 0,



  }
  //#endregion

  constructor(
    private slotServiceService: SlotServiceService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,



  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.translateService.get('listStatus').subscribe(res => {
      this.listStatus = res;
    })
    this.search();
    this.getAllDistrict();

  }
  initForm() {
    this.updateForm = this.fb.group({
      id: [],
      name: [],
      districtId: [],
      district: this.fb.group({
        id: [],
        name: [],
        order: [],
      }),

      description: [],
      order: [],


    })
  }
  getListSLot() {
    this.slotServiceService.getListSlot(this.RequestGetList)
      .subscribe((res: any) => {
        this.data = res.data;
        this.totalRecord = res.totalCount;
      })
  }
  search() {
   
    if (this.RequestGetList.name !=='') {
      this.slotServiceService.getListSlot(this.RequestGetList)
        .subscribe((res: any) => {
          this.data = res.data;
          this.totalRecord = res.totalCount;
        })
    }
    else if(this.RequestSearch.name !==null) {
      this.slotServiceService.SearchDistrict(this.RequestSearch).subscribe((res: any) => {
        this.data = res.data;
        this.totalRecord = res.totalCount;
        
      })
    }
    if (this.RequestGetList.name == '' && this.RequestSearch.name ==null ) {

      this.getListSLot();
    }
  }
  paginate(evt: any) {
    if (this.RequestGetList.pageSize !== evt.rows) {
      this.RequestGetList.page = 0;
    }
    if(this.RequestSearch.name==null){
          this.RequestGetList.page = evt.page + 1;
    this.RequestGetList.pageSize = evt.rows;
    this.getListSLot();
    }
    else{
      
      this.RequestSearch.page =evt.page+1;
      this.RequestSearch.pageSize = evt.rows;
      this.SearchDistrictID();
    }
  
   
  }
  successMessage() {
    this.messageService.add({ severity: 'success', detail: 'thao tác thành công' });
  }
  errorMessage() {
    this.messageService.add({ severity: 'error', detail: 'vui lòng nhập đúng thông tin' });
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
    this.confirmationService.confirm({
    ...AddModal,accept:()=>{
      
      this.slotServiceService.Add(this.AddRequest).subscribe((res: any) => {
        if(res===1){         
              this.successMessage();
              this.ShowModel(2);
              this.AddRequest.name='';
              this.getListSLot();
        
  
        }else if (res ===0){
        this.IsDeleteModal=true;
        this.ShowModel(2);
        this.AddRequest.name='';
      
          
        }
  
      });
    }
    
    })
      

    }
  }
  ViewDetail(type: number, id: any) {
    if (type === 1) {

      this.IsUpdateShow = true;
      this.slotServiceService.ViewDetailWard(id).subscribe((res) => {
        this.DetailWard = res;
        this.updateForm.patchValue(this.DetailWard = res);
       
      })

    };
    if (type == 2) {
      this.IsUpdateShow = false
    };

  }
  ShowModel(type: number) {
    if (type === 1) {

      this.IsShowDialog = true;
      
    }
    if (type === 2) {
      this.IsShowDialog = false;
      this.AddRequest.name='';
    }
  }
  doDeleteAll() {
    this.isDeleteAll = true;
  }
  deleteAll() {
    let listId: any[] = [];
    this.dataSelection.forEach(el => {

      if (el && el.id) {
        listId.push(el.id);
      }
    });
    this.slotServiceService.Delete({ listId: listId }).subscribe((res: any) => {
      this.confirmationService.confirm({
        ...DeleteModalSlot,
        accept: () => {
          this.successMessage();
       
          
          this.Cancle();
          this.getListSLot();
          this.isDeleteAll = false;
        }
      })
    })
  }
  Cancle() {
    this.dataSelection = [];

  }

  updateWard() {
    const body = {
      ...this.updateForm.value
    }
    this.slotServiceService.UpdateWard(body).subscribe(res => {
    if(this.RequestSearch.name ==null && this.RequestGetList.name !== ''){

      this.getListSLot();
    }
    else{

      this.SearchDistrictID();
    }
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công' });

    })

  }
  ConfirmUpdate() {
    this.confirmationService.confirm({
      ...confirmSaveModal, accept: () => {
        this.updateWard();
        this.IsUpdateShow = false;

      }
    })
  }
  SearchDistrictID(){
    this.slotServiceService.SearchDistrict(this.RequestSearch).subscribe((res: any) => {
      this.data = res.data;
      this.totalRecord = res.totalCount;
      
    })
  }
  //#region  Function
  
  CancleAddSlot(type :number){
  if(type ===1){

    this.IsDeleteModal = false;
    this.ShowModel(1);
  }
  else{
    this.ShowModel(2);
    this.IsDeleteModal = false;
  
  }
  }
  //#endregion
}
