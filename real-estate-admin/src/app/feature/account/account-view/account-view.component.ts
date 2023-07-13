import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../service/accountservice.service';
import { SelectItem } from 'primeng/api';
import { check } from '../model/check';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  [x: string]: any;
  data: any[] = [];
  dataSelection: any[] = [];
  Total: number;
  page:number;
  pagesize:number
  RequestGetAll = {
    phone: null,
    username: null,
    page: 1,
    pagesize: 10,
  };
  options: SelectItem[] = [
    { label: 'Active', value: "True" },
    { label: 'DeActive', value: "False" }
  ];

  RequestSearch = {
    username: '',
    fullname: '',
    isActived:'',
    
    page: 1,
    pagesize: 10

  }
  constructor(private sevice: AccountServiceService) { }

  ngOnInit(): void {
    this.GetAllOrSearch();
  }

  paginate(evt: any) {
    if (this.RequestGetAll.pagesize !== evt.rows) {
      this.RequestGetAll.page = 0;
    }
  if(this.RequestSearch.fullname==='' && this.RequestSearch.isActived===null && this.RequestSearch.username===''){
    this.RequestGetAll.page = evt.page + 1;
    this.RequestGetAll.pagesize = evt.rows;
    this.GetAllOrSearch();
  } else{
  this.RequestSearch.page=evt.page+1;
    this.RequestSearch.pagesize = evt.rows;
    this.Search();
  }
  }
  GetAllOrSearch() {
    this.sevice.GetAllUser(this.RequestGetAll).subscribe((res: any) => { this.data = res.userDtos; this.Total = res.totalCount })
  }
  Search() {
    this.sevice.Search(this.RequestSearch).subscribe((res: any) => {this.data = res.userDtos;this.Total=res.totalCount});

  }
}
