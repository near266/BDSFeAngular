export interface Transaction {
  transactionHistory: {
    id: string;
    type: number;
    content: string;
    transactionAmount: number;
    walletType: number;
    customerId: string;
    customer: {
      customerName: string;
      address: string;
      phone: string;
      company: string;
      isUnique: boolean;
      avatar: string;
      point: number;
      status: boolean;
      id: string;
      createdDate: string;
    };
    createdDate: string;
    status: string;
  };
  wallet: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    isVolatility: boolean;
  };
  walletPromotional: {
    id: string;
    amount: number;
    currency: string;
    isVolatility: boolean;
  };
}
export interface responseTran {
  data: Transaction[];
  totalCount: number;
}
