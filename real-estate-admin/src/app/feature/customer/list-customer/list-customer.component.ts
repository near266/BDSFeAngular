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
  searchCustomer = {};

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

  getListCustomer() {
    this.searchCustomer = {
      pagesize: 10,
      page: 1
    }
    this.customerService.getCustomer(this.searchCustomer).subscribe(res => {
      this.dataCustomers = res.data;
    })
  }

  delete(id: string) {
    const body = {
      listId: [id]
    }
    this.confirmationService.confirm({
      ...deleteModal, accept: () => {
        this.customerService.deleteCustomer(body).subscribe(res => {
          console.log(res);
          this.messageService.add({severity: 'success', summary: '', detail: 'Thao tác thành công'})
        })
      }
    })
  }
  deleteAll(){
    console.log(this.dataSelection)
  }
  viewBalance(id: any) {
    this.router.navigate(['customers', 'balance'])
  }
}
