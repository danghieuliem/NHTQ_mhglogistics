// Nạp tiền cá nhân
type TMoneyPersonalRecharge = {
  id: number;
  username: string;
  fullName: string;
  phone: string;
  surplus: number;
  status: number;
  createdAt: Date;
};

// Lịch sử yêu cầu nạp tiền
type TMoneyRechargeHistory = {
  id: number;
  username: string;
  sendCash: number;
  bank: string;
  loanCash: boolean;
  isPaidLoan: boolean;
  statusId: number;
  statusName: string;
  sendDate: Date;
  approvedBy: string;
  approvedDate: Date;
  content: string;
};

// Lịch sử yêu cầu rút tiền
type TMoneyWithdrawalHistory = {
  id: number;
  username: string;
  customerFullName: string;
  customerAccount: number;
  bank: string;
  withDrawCash: number;
  statusId: number;
  statusName: string;
  content: string;
  withDrawDate: Date;
  approvedBy: string;
  approvedDate: Date;
};

// Lịch sử yêu cầu nạp tiền tệ
type TMoneyChinaRechargeHistory = {
  id: number;
  username: string;
  sendCash: number;
  status: number;
  createdAt: Date;
  createdBy: string;
  approvedBy: string;
  approvedDate: Date;
};

// Lịch sử yêu cầu rút tiền tệ
type TMoneyChinaWithdrawalHistory = {
  id: number;
  username: string;
  cash: number;
  statusId: number;
  statusName: string;
  createdAt: Date;
  createdBy: string;
  approvedBy: string;
  approvedDate: Date;
  content: string;
};

// Thanh toán xuất kho
type TMoneyOutstockPayment = {
  Id: number;
  customerID: number;
  customerFullName: string;
  customerPhoneNumber: string;
  UserName: string;
  Amount: number;
  Created: Date;
  Status: number;
  StatusName: string;
};

type TMoneyOutstockPaymentDetail = {
  id: number;
  code: string;
  kg: number;
  totalDaysSaveInWarehouse: number;
  statusId: number;
  statusName: string;
  money: number;
};
