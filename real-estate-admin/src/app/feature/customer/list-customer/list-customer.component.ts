import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerService} from "../service/customer.service";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {deleteModal} from "../model/modal";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  dataSelection: any[] = [];
  dataCustomers: any[] = [];
  searchCustomer = {
    keyword: '',
    phone: '',
    page: 1,
    pageSize: 10
  };
  totalRecord = 0;
  pageSize = 10;
  page = 1;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getListCustomer();
  }

  getListCustomer(isSearch?: boolean) {
    if (isSearch){
      this.searchCustomer.page = 1;
    }
    this.customerService.getCustomer(this.searchCustomer).subscribe(res => {
      this.dataCustomers = res.data;
      this.totalRecord = res.totalCount;
    })
  }

  delete(id: string) {
    const body = {
      listId: [id]
    }
    this.confirmationService.confirm({
      ...deleteModal, accept: () => {
        this.customerService.deleteCustomer(body).subscribe(res => {
          this.messageService.add({severity: 'success', summary: '', detail: 'Thao tác thành công'})
          this.getListCustomer();
        })
      }
    })
  }

  deleteAll() {
    let listId: any[] = [];
    this.dataSelection.forEach(el => {
      if (el && el.customer.id) {
        listId.push(el.customer.id);
      }
    });
    this.customerService.deleteCustomer({listId: listId}).subscribe(res => {
      this.messageService.add({severity: 'success', detail: 'Thao tác thành công'})
      this.getListCustomer();
    })
  }

  paginate(evt: any) {
    if (this.searchCustomer.pageSize !== evt.rows) {
      this.page = 0;
    }
    this.searchCustomer.page = evt.page + 1;
    this.searchCustomer.pageSize = evt.rows;
    this.getListCustomer();
  }

  viewBalance(id: any) {
    this.router.navigate(['customers', 'balance', id])
  }
}
