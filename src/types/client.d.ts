type TChinaRecharge = {
  username: string;
  uid: number;
  totalOfMoneyTQ: number;
  amount: number;
  note: string;
  status: number;
  type: number;
  statusName: string;
};

type TVietNamRecharge = {
  username: string;
  deposit: boolean;
  totalOfMoneyVN: number;
  amount: number;
  tradeContent: string;
  bankId: number;
  bankName: string;
  status: number;
  uid: number;
  statusName: string;
  isLoan: boolean;
  isPayLoan: boolean;
  type: number;
};

type TChinaAndVietNamWithdrawal = {
  username: string;
  totalOfMoney: number;
  withdrawal: number;
  content: string;
  statusId: number;
  statusName: string;
};

type TOrderListClient = {
  Id: number;
  ImageOrigin: string;
  TotalOrderAmount: number;
  UserName: string;
  OrdererUserName: string;
  SalerUserName: string;
  Deposit: number;
  OrderTransactionCodes: string;
  Status: number;
  StatusName: string;
  Created: Date;
};

type TClientCreateOrderProduct = {
  img: any;
  link: number;
  name: string;
  size: string;
  amount: number;
  note: string;
  id: number;
};

type TClientCreateOrder = {
  username: string;
  warehouseFromId: number;
  warehouseFromName: string;
  warehouseToId: number;
  warehouseToName: string;
  transferId: number;
  transferName: string;
  products: TClientCreateOrderProduct[];
};

type TClientTransactionHistory = {
  id: number;
  created: Date;
  content: string;
  money: number;
  transactionCategory: string;
  balanceAccount: number;
};
