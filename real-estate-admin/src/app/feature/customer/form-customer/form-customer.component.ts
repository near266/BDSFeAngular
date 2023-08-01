import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from "@ngx-translate/core";

import { MessageService } from 'primeng/api';

import { forkJoin } from "rxjs";

import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit {
  listTypicalBroker: any[] = [];
  listStatus: any[] = [];
  post = false

  customer = new FormGroup({
    login: new FormControl(),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    authorities: new FormControl([
      "ROLE_USER"
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phoneNumber: new FormControl('', Validators.required),
    isUnique: new FormControl(true),
    address: new FormControl(),
    company: new FormControl(),
    referalCode: new FormControl(),
    activated: new FormControl(true),
    exchange: new FormControl(),
  })

  constructor(
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router,
    private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    forkJoin([
      this.translateService.get('createCustomers.status'),
      this.translateService.get('createCustomers.typicalBroker')
    ]).subscribe(res => {
      this.listStatus = res[0];
      this.listTypicalBroker = res[1];
    })
  }

  createCustomer(body: any) {
    this.post = true
    body.login = body.email
    if (this.customer.invalid) {
      if (this.customer.get('firstName')?.errors) {
        this.post = false
        this.messageService.add({ severity: 'error', detail: 'Họ tên là bắt buộc' })
        return
      }
      if (this.customer.get('email')?.errors) {
        this.post = false
        this.messageService.add({ severity: 'error', detail: 'Email là bắt buộc' })
        return
      }
      if (this.customer.get('phoneNumber')?.errors) {
        this.post = false
        this.messageService.add({ severity: 'error', detail: 'Số điện thoại là bắt buộc' })
        return
      }
      if (this.customer.get('password')?.errors) {
        this.post = false
        this.messageService.add({ severity: 'error', detail: 'Mật khẩu là bắt buộc và phải chứa tối thiểu 6 kí tự!' })
        return
      }
    }
    this.customerService.addCustomer(body).subscribe(res => {
      this.router.navigate(['customers'])
      this.messageService.add({ severity: 'success', detail: 'Thao tác thành công ' })
    }, (e: any) => {
      console.log(e)
      this.messageService.add({ severity: 'error', detail: e.params.detail })
      this.post = false
    })
  }
}
