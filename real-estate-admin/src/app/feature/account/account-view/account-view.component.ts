import { Login } from './../../../auth/model/login';
import { confirm } from './../../slot/model/confirm';
import { isError } from 'lodash-es';
import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../service/accountservice.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { check } from '../model/check';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  [x: string]: any;
  form = new FormGroup({
    login: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    rePassword: new FormControl('', Validators.required),

  });
  data: any[] = [];
  dataSelection: any[] = [];
  Total: number;
  page: number;
  pagesize: number
  loginame: string;
  RequestGetAll = {
    phone: null,
    username: null,
    page: 1,
    pagesize: 10,
  };
  title:string='';
  isDelete: boolean = false;
  isReset : boolean =false;
  doDel: boolean = false;
  options: SelectItem[] = [
    { label: 'Active', value: "True" },
    { label: 'DeActive', value: "False" }
  ];

  RequestSearch = {
    username: '',
    fullname: '',
    isActived: '',

    page: 1,
    pagesize: 10

  }
  constructor(
  private sevice: AccountServiceService,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
  
  ) { }

  ngOnInit(): void {
    this.GetAllOrSearch();

  }

  paginate(evt: any) {
    if (this.RequestGetAll.pagesize !== evt.rows) {
      this.RequestGetAll.page = 0;
    }
    if (this.RequestSearch.fullname === '' && this.RequestSearch.isActived === null && this.RequestSearch.username === '') {
      this.RequestGetAll.page = evt.page + 1;
      this.RequestGetAll.pagesize = evt.rows;
      this.GetAllOrSearch();
    } else {
      this.RequestSearch.page = evt.page + 1;
      this.RequestSearch.pagesize = evt.rows;
      this.Search();
    }
  }
  GetAllOrSearch() {
    this.sevice.GetAllUser(this.RequestGetAll).subscribe((res: any) => { this.data = res.userDtos; this.Total = res.totalCount })
  }
  Search() {
    this.sevice.Search(this.RequestSearch).subscribe((res: any) => { this.data = res.userDtos; this.Total = res.totalCount });

  }

  Getlogin(login: string) {
    return login;
  }
  ShowDelete(type: number, Login: string) {
    if (type === 1) {
    this.title='XÓA TÀI KHOẢN'
      this.isDelete = true;
      this.loginame = this.Getlogin(Login);

    }
    else {
      this.isDelete = false;
    }

  }
 ShowReset(type :number,log:string){
 if(type === 1){
 this.isReset=true;
 this.loginame=this.Getlogin(log);
 }else{
 this.isReset=false;
 }
 
 }
  DoDelete() {
    let body = {
      login: this.loginame
    }

    this.sevice.Delete(body).subscribe((res: any) => res);
    this.ShowDelete(2, '');
    this.GetAllOrSearch();
    this.messageService.add({
      severity: 'success',
      detail: 'Thao tác thành công',
    });
  }
  Reset(newpass:any,repass:any){
  let body ={
    login:this.loginame,
    newPassword:newpass,
    rePassword:repass,
  
  }
  this.sevice.ResetPass(body).subscribe((res:any)=>res);
  
  this.isReset=false;
  this.messageService.add({
    severity: 'success',
    detail: 'Thao tác thành công',
  });
  }

}
