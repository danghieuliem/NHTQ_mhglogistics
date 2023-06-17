// thống kê mua hộ
type TStatisticalPrintPurchase = {
  Id: number;
  customerID: number;
  OrderID: number;
  customerFullName: string;
  customerPhoneNumber: string;
  UserName: string;
  Amount: number;
  Created: Date;
  Status: number;
  StatusName: string;
};

// chi tiết mua hộ
type TStatisticalPurchaseDetail = {
  id: number;
  weight: number;
  storedDay: number;
  status: string;
  cashInStore: number;
  debt: number;
};

// danh sách nạp tiền
type TStatisticalRechargeList = {
  Id: number;
  UserName: string;
  Amount: number;
  BankName: string;
  Status: number;
  StatusName: string;
  Created: Date;
  CreatedBy: string;
  TotalAmount: number;
};

// danh sách rút tiền
type TStatisticalWithdrawList = {
  Id: number;
  UserName: string;
  Amount: number;
  Status: string;
  Created: Date;
  TotalAmount: number;
  CreatedBy: string;
};

// Thống kê số dư
type TStatisticalSurplus = {
  Id?: number;
  UserName?: string;
  TotalWallet?: number;
  UserGroupName?: string;
  Status?: number;
  StatusName?: string;
  SalerUserName?: string;
  OrdererUserName?: string;
  Created?: Date;
  CreatedBy?: string;
  Equals0?: number;
  GreaterThan0?: number;
  From1MTo5M?: number;
  From5MTo10M?: number;
  GreaterThan10M?: number;
  Wallet?: number;
};

// Thống kê đơn hàng
type TStatisticalOrder = TStatisticalPurchaseProfit;

// Thống kế thanh toán
type TStatisticalPayment = {
  MainOrderId: number;
  UserName: string;
  Status: number;
  StatusName: string;
  Amount: number;
  RowNumber: number;
  Id: number;
  Created: Date;
  CreatedBy: string;
  Updated: Date;
  UpdatedBy: string;
};

// thống kê tiền
type TStatisticalMoney = {
  Name: string;
  Total: number;
  NotPay: number;
  Pay: number;
};

// Thống kê giao dịch
type TStatisticalTransaction = {
  Content: string;
  Amount: number;
  TradeType: number;
  MoneyLeft: number;
  TotalAmount: number;
  TotalDeposit: number;
  TotalReciveDeposit: number;
  TotalPaymentBill: number;
  TotalAdminSend: number;
  TotalWithDraw: number;
  TotalCancelWithDraw: number;
  TotalComplain: number;
  TotalPaymentTransport: number;
  TotalPaymentHo: number;
  TotalPaymentSaveWare: number;
  TotalRecivePaymentTransport: number;
  Id: number;
  Created: Date;
  CreatedBy: string;
  Updated: Date;
  UpdatedBy: string;
  TradeTypeName: string;
};

type TStatisticalPurchaseProfit = {
  UserName: string;
  ShopName: string;
  SalerUserName: string;
  FeeShipCN: number;
  FeeBuyPro: number;
  TQVNWeight: number;
  FeeWeight: number;
  IsFastDeliveryPrice: number;
  IsCheckProductPrice: number;
  IsPackedPrice: number;
  InsuranceMoney: number;
  FeeInWareHouse: number;
  TotalPriceVND: number;
  Deposit: number;
  RemainingAmount: number;
  StatusName: string;
  Status: number;
  Profit: number;
  MaxTotalPriceVND: number;
  MaxTotalPriceReal: number;
  MaxMustPay: number;
  MaxProfit: number;
  MaxPriceVND: number;
  MaxFeeShipCN: number;
  MaxFeeWeight: number;
  MaxFeeBuyPro: number;
  MaxIsCheckProductPrice: number;
  MaxIsPackedPrice: number;
  MaxFeeInWareHouse: number;
  Id: number;
  Created: Date;
  CreatedBy: string;
  Updated: Date;
  UpdatedBy: string;
  TotalPriceReal: number;
  PriceVND: number;
  FeeShipCNReal: number;
  MustPay: number;
};

// Lợi nhuận thanh toán hộ
type TStatisticalPaymentProfit = {
  Id: number;
  UserName: string;
  TotalPrice: number;
  TotalPriceVNDGiaGoc: number;
  TotalPriceVND: number;
  Profit: number;
  MaxTotalPrice: number;
  MaxTotalPriceVNDGiaGoc: number;
  MaxTotalPriceVND: number;
  MaxProfit: number;
  Created: Date;
  CreatedBy: string;
  Updated: Date;
  UpdatedBy: string;
};

// order
// Đã mua hàng

// Thống kê doanh thu ký gửi
type TStatisticalIncomeTransport = {
  UserName?: string;
  OrderTransactionCode?: string;
  Weight?: number;
  WareHouseFrom?: string;
  WareHouseTo?: string;
  ShippingTypeName?: string;
  SensorFeeVND?: number;
  AdditionFeeVND?: number;
  FeeWeightPerKg?: number;
  TotalPriceVND?: number;
  DateInTQWarehouse?: Date;
  DateInLasteWareHouse?: Date;
  DateExportRequest?: Date;
  DateExport?: Date;
  Status?: number;
  StatusName?: string;
  MaxWeight?: number;
  MaxTotalPriceVND?: number;
  Id?: number;
  Created?: Date;
  CreatedBy?: string;
  Updated?: Date;
  UpdatedBy?: string;
};

// Thống kê doanh thu Sale
type TStatisticalIncomeSale = {
  UserName?: string;
  TotalPriceVND?: number;
  PriceVND?: number;
  FeeBuyPro?: number;
  FeeShipCN?: number;
  TQVNWeight?: number;
  FeeWeight?: number;
  OrderFee?: number;
  BargainMoney?: number;
  TotalOrder?: number;
  TotalCus?: number;
  MaxTotalPriceVND?: number;
  MaxPriceVND?: number;
  MaxFeeBuyPro?: number;
  MaxFeeShipCN?: number;
  MaxTQVNWeight?: number;
  MaxFeeWeight?: number;
  MaxOrderFee?: number;
  MaxBargainMoney?: number;
  MaxTotalOrder?: number;
  Id?: number;
  Created?: Date;
  CreatedBy?: string;
  Updated?: Date;
  UpdatedBy?: string;
};

// Thống kê doanh thu Đặt hàng
type TStatisticalIncomeSale = TStatisticalIncomeSale;
