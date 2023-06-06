export interface Transaction {
  time: string;
  transactionType: string;
  content: string;
  change: number;
  mainAccountBalance: number;
  promotionAccountBalance: number;
  rewardPoints: number;
}
