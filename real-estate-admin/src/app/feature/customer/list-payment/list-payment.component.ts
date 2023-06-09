import {Component, OnInit} from '@angular/core';
import {PaymentConfirm} from "../model/payment-confirm";
import {Router} from "@angular/router";
import {CustomerService} from "../service/customer.service";

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent implements OnInit {
  mockCustomerData: PaymentConfirm[];
  paymentData = [];
  depositReq = {
    userName: '',
    dateTo: '',
    dateFrom: '',
    page: 1,
    pageSize: 10
  };
  totalRecord = 0;
  pageSize = 10;
  dateTime = [];
  page = 1;
  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.mockCustomerData = [
      {
        id: "KH001",
        customerName: "John Doe",
        phoneNumber: "123-456-7890",
        proofImage: "https://example.com/image1.jpg",
        status: "Approved",
        timestamp: "2023-06-01 10:30 AM",
      },
      {
        id: "KH002",
        customerName: "Jane Smith",
        phoneNumber: "987-654-3210",
        proofImage: "https://example.com/image2.jpg",
        status: "Pending",
        timestamp: "2023-06-02 02:45 PM",
      },
      // Thêm các dữ liệu khách hàng khác tại đây nếu cần
    ];
    this.doGetListDeposit();
  }
  doGetListDeposit() {
    this.customerService.getDepositRequest(this.depositReq).subscribe(res => {
      console.log(res)
      this.paymentData = res.data;
      this.totalRecord = res.totalCount;
    })
  }
   paginate(evt: any) {
    if (this.depositReq.pageSize !== evt.rows) {
      this.page = 0;
    }
    this.depositReq.page = evt.page + 1;
    this.depositReq.pageSize = evt.rows;
    this.doGetListDeposit();
  }
}
