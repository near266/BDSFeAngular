import {Component, OnInit} from '@angular/core';
import {PaymentConfirm} from "../model/payment-confirm";

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent implements OnInit {
  mockCustomerData: PaymentConfirm[]

  constructor() {
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

  }

}
