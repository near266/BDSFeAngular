import {Component, OnInit} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";

import {forkJoin} from "rxjs";

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent implements OnInit {
  listTypicalBroker: any[] = [];
  listStatus: any[] = [];

  constructor(
    private translateService: TranslateService,
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
}
