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
  page:number;
  pageSize: number;
}
