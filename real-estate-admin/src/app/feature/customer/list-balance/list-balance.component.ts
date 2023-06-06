import {Component, OnInit} from '@angular/core';
import {Transaction} from "../model/transaction";

@Component({
  selector: 'app-list-balance',
  templateUrl: './list-balance.component.html',
  styleUrls: ['./list-balance.component.scss']
})
export class ListBalanceComponent implements OnInit {
  mockTransactions: Transaction[]

  constructor() {
  }

  ngOnInit(): void {
    this.mockTransactions = [
      {
        time: "2023-06-01 10:30 AM",
        transactionType: "Deposit",
        content: "Deposit from bank transfer",
        change: 5000,
        mainAccountBalance: 10000,
        promotionAccountBalance: 0,
        rewardPoints: 10,
      },
      {
        time: "2023-06-02 02:45 PM",
        transactionType: "Withdrawal",
        content: "Withdrawal for shopping",
        change: -2500,
        mainAccountBalance: 7500,
        promotionAccountBalance: 0,
        rewardPoints: 5,
      },
      // Thêm các giao dịch khác tại đây nếu cần
    ];
  }

}
