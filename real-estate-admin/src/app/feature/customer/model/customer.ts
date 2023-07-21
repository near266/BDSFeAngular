export interface Customer {
  id: number;
  name: string;
  address: string;
  company: string;
  phoneNumber: string;
  insurance: string;
  mainAccountBalance: number;
  promotionAccountBalance: number;
  rewardPoints: number;
}
export interface Balance {
  id: any;
  from: any;
  to: any;
  type: any;
  page: number;
  pageSize: number;
}

export interface CustomerDetail {
  id: string;
  customerName: string;
  customerCode: string;
  address: string;
  phone: string;
  company: string;
  isUnique: false;
  avatar: string;
  point: number;
  status: boolean;
  totalSalePost: number;
  totalBoughtPost: number;
  referalCode: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

export class PramsEdit {
  id: string;
  customerName: string;
  customerCode: string;
  address: string;
  phone: string;
  company: string;
  isUnique: false;
  avatar: string | undefined;
  point: number;
  status: boolean;
  totalSalePost: number;
  totalBoughtPost: number;
  referalCode: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}
