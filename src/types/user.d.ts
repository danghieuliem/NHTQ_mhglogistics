type TUser = {
  Id: any;
  UserGroupName: ReactNode;
  AvatarIMG: string;
  Email: string;
  FullName: string;
  IsCheckOTP: boolean;
  IsConfirmOTP: boolean;
  Phone: string;
  Roles: {
    RoleName: string;
    IsView: boolean;
  }[];
  UserId: number;
  UserGroupId: number;
  UserName: string;
  LastName: string;
  FirstName: string;
  OneSignalPlayerID: String;
  DatHangId?: number;
  UserId?: number;
  Wallet?: number;
  LevelId?: number;
  Token: string;
  ShippingType?: number;
  WarehouseFrom?: number | string;
  WarehouseTo?: number | string;
};

type TCreateOrder = {
  img: string;
  link: number;
  name: string;
  price: number;
  color: string;
  amount: number;
  note: string;
};

type TUserDeposit = Omit<
  TBaseReponseParams,
  "Code" | "Name" | "Description"
> & {
  AdditionFeeCNY: number;
  AdditionFeeVND: number;
  OrderTransactionCode: string;
  CancelReason: string;
  Currency: number;
  DateExport: Date;
  DateExportRequest: Date;
  DateInLasteWareHouse: Date;
  DateInTQWarehouse: Date;
  DateInVNWareHouse: Date;
  ExportRequestNote: string;
  FeeWarehouseOutCNY: number;
  FeeWarehouseOutVND: number;
  FeeWarehouseWeightCNY: number;
  FeeWarehouseWeightVND: number;
  Note: string;
  SensorFeeCNY: number;
  SensorFeeVND: number;
  ShippingTypeId: number;
  ShippingTypeName: string;
  ShippingTypeVN: number;
  ShippingTypeVNName: string;
  SmallPackageId: number;
  SmallPackages: TSmallPackage[];
  StaffNote: string;
  Status: number;
  StatusName: string;
  TotalPriceCNY: number;
  TotalPriceVND: number;
  UID: number;
  UserName: string;
  WareHouseFrom: string;
  WareHouseFromId: number;
  WareHouseId: number;
  WareHouseTo: string;
  WarehouseFee: number;
  Weight: number;
  PayableWeight: number;
  IsPackedPrice: number;
  IsCheckProductPrice: number;
  InsuranceMoney: number;
  IsCheckProduct: boolean;
  IsInsurance: boolean;
  IsPacked: boolean;
  Amount?: number;
  Category?: number;
  DeliveryPrice: number;
  CODFee: number;
  CODFeeTQ: number;
  FeeWeightPerKg: number;
  FeeWeightCK?: number;
  //FeeWeightPerKg phí TQ_VN /1 kg
  VolumePayment: number;
  FeePerVolume: number;
  SalerID: number;
};

type TUserDepositBillingInfo = {
  FeeOutStockCNY: number;
  FeeOutStockVND: number;
  LeftMoney: number;
  ListId: number[];
  ModelUpdatePayments: unknown[];
  TotalAdditionFeeCNY: number;
  TotalAdditionFeeVND: number;
  TotalPriceCNY: number;
  TotalPriceVND: number;
  TotalQuantity: number;
  TotalSensoredFeeCNY: number;
  TotalSensoredFeeVND: number;
  TotalWeight: number;
  TotalWeightPriceCNY: number;
  TotalWeightPriceVND: number;
  Wallet: number;
};

type TTransportationOrder = Omit<
  TBaseReponseParams,
  "Name" | "Code" | "Description"
> & {
  AdditionFeeCNY: number;
  AdditionFeeVND: number;
  BarCode: string;
  CancelReason: string;
  Created: string;
  CreatedBy: string;
  Currency: number;
  DateExport: Date;
  DateExportRequest: Date;
  DateInLasteWareHouse: Date;
  DateInTQWarehouse: Date;
  DateInVNWareHouse: Date;
  ExportRequestNote: string;
  FeeWarehouseOutCNY: number;
  FeeWarehouseOutVND: number;
  FeeWarehouseWeightCNY: number;
  FeeWarehouseWeightVND: number;
  Note: string;
  SensorFeeCNY: number;
  SensorFeeVND: number;
  ShippingTypeId: number;
  ShippingTypeName: string;
  ShippingTypeVN: number;
  ShippingTypeVNName: string;
  SmallPackageId: number;
  SmallPackages: TSmallPackage[];
  StaffNote: string;
  Status: number;
  StatusName: string;
  TotalPriceCNY: number;
  TotalPriceVND: number;
  UID: number;
  UserName: string;
  WareHouseFrom: string;
  WareHouseFromId: number;
  WareHouseId: number;
  WareHouseTo: string;
  WarehouseFee: number;
  Weight: number;
};

type TUserStatisticalDepositUpdateStatus = {
  Id: number;
  Status: 2 | 3;
  IsPaymentWallet: boolean;
};

type TUserStatisticalDepositUpdateNote = { Id: number; StaffNote: string };

type TUserStatisticalDeposit = Omit<
  TBaseReponseParams,
  "Code" | "Name" | "Description"
> & {
  MainOrderId: number;
  Note: string;
  OutStockDate: Date;
  ShippingTypeInVNId: number;
  ShippingTypeInVNName: string;
  SmallPackage: string;
  SmallPackages: TSmallPackage[];
  StaffNote: string;
  Status: number;
  StatusExport: number;
  StatusExportName: string;
  StatusName: string;
  TotalPackage: number;
  TotalPriceCNY: number;
  TotalPriceVND: number;
  TotalWeight: number;
  TransportationOrders: TTransportationOrder[];
  Type: number;
  UID: number;
  UserName: string;
  UserPhone: string;
  BarCodeAndDateOuts: [];
  OrderTransactionCode: string;
  DateOutWarehouse: Date;
};

type TUserCreateOrderProduct = {
  Id: number;
  ImageProduct: string;
  LinkProduct: string;
  NameProduct: string;
  PriceProduct: number;
  PropertyProduct: string;
  QuantityProduct: number;
  NoteProduct: string;
};

type TUserCreateOrder = {
  UID: number;
  UserName: string;
  WarehouseTQ: number;
  WarehouseTQName: string;
  WarehouseVN: number;
  WarehouseVNName: string;
  ShippingType: number;
  ShippingTypeName: string;
  Products: TUserCreateOrderProduct[];
  ImageProduct: string;
  UserNote: string;
  IsPacked: boolean;
  IsCheckProduct: boolean;
  IsInsurance: boolean;
  IsFastDelivery: boolean;
};

type TUserCreateDepositBill = {
  UID: number;
  Id: number;
  OrderTransactionCode: string;
  Category: string;
  Amount: number;
  FeeShip: number;
  Kg: number;
  // IsTally: boolean;
  // IsWoodPile: boolean;
  // IsInsurrance: boolean;
  // Cod: number;
  UserNote: string;
  PayableWeight: number;

  // new key
  IsCheckProduct: boolean;
  IsPacked: boolean;
  IsInsurance: boolean;
};

type TUserCreateDeposit = {
  UID: number;
  WareHouseFromId: number;
  WareHouseId: number;
  ShippingTypeId: number;
  smallPackages: TUserCreateDepositBill[];
};

type TUserReport = {
  date: Date;
  totalOfMoneyCN: string;
  totalOfMoneyVN: string;
  rate: string;
  statusId: number;
  statusName: string;
};

type TCartState = {
  currentCart: TUserCartOrderShopTemp[];
  selectedShopIds: number[];
};

type TUserCartOrderShopTemp = Omit<
  TBaseReponseParams,
  "Name" | "Code" | "Description"
> & {
  Address: string;
  Email: string;
  FeeBuyPro: number;
  FullName: string;
  InsuranceMoney: number;
  IsCheckProduct: boolean;
  IsCheckProductPrice: number;
  IsFast: boolean;
  IsFastDelivery: boolean;
  IsFastDeliveryPrice: number;
  IsFastPrice: number;
  IsForward: boolean;
  IsForwardPrice: number;
  IsInsurance: boolean;
  IsPacked: boolean;
  IsPackedPrice: number;
  Note: string;
  PriceCNY: number;
  PriceVND: number;
  OrderTemps: TUserCartOrderTemp[];
  Phone: string;
  ShopId: string;
  ShopName: string;
  Site: string;
  TotalPriceVND: number;
  UID: number;
  OrderTempsJson?: string;
};

type TUserCartOrderTemp = Omit<
  TBaseReponseParams,
  "Name" | "Code" | "Description"
> & {
  Brand: string;
  CategoryId: number;
  CategoryName: string;
  Comment: string;
  Currency: number;
  DataValue: string;
  EPriceBuy: number;
  EPriceBuyVN: number;
  Error: string;
  ImageModel: string;
  ImageOrigin: string;
  IsTranslate: boolean;
  ItemId: string;
  LinkOrigin: string;
  LocationSale: string;
  MaxEPriceBuyVN: number;
  OrderShopTempId: number;
  OuterId: number;
  PriceOrigin: number;
  PricePromotion: number;
  Property: string;
  PropertyTranslated: string;
  Quantity: number;
  SellerId: string;
  ShopId: string;
  ShopName: string;
  Site: string;
  Step: number;
  StepPrice: number;
  Stock: string;
  TitleOrigin: string;
  TitleTranslated: string;
  Tool: string;
  UID: number;
  UPriceBuy: number;
  UPriceBuyVN: number;
  Version: string;
  Wangwang: string;
  Weight: string;
};

type TUserPaymentShopPayment = {
  ShopId: number;
  WarehouseTQ: number;
  WarehouseVN: number;
  ShippingType: number;
};

type TUserPayment = {
  ReceiverFullName: string;
  ReceiverPhone: string;
  ReceiverEmail: string;
  ReceiverAddress: string;
  FullName: string;
  Phone: string;
  Email: string;
  Address: string;
  ShopPayments: TUserPaymentShopPayment[];
  IsAgreement: boolean;
  ShippingType: number;
  WarehouseFrom: number;
  WarehouseTo: number;
};

type TUserHistoryTransactionVND = Omit<
  TBaseReponseParams,
  "Name" | "Description" | "Code"
> & {
  Amount: number;
  Content: string;
  MainOrderId: number;
  MoneyLeft: number;
  TradeType: number;
  TradeTypeName: string;
  Type: number;
  UID: number;
  Wallet: number;
  TotalAmount4: number;
};

type TUserHistoryTransactionRMB = Omit<
  TUserHistoryTransactionVND,
  "Content"
> & {
  Content: string;
};

type TUserHistoryRechargeVND = Omit<
  TBaseReponseParams,
  "Name" | "Description" | "Code"
> & {
  UID: number;
  UserName: string;
  BankId: number;
  Wallet: number;
  Amount: number;
  Status: number;
  StatusName: string;
  TradeContent: string;
  Created: Date;
  CreatedBy: string;
  Updated: Date;
  UpdatedBy: Date;
  IsLoan: boolean;
  IsPayLoan: boolean;
  IMG: any;
  TotalStatus1: number;
  TotalStatus2: number;
  TotalStatus3: number;
  TotalAmount: number;
  TotalAmount1: number;
  TotalAmount2: number;
  BankName: string;
};

type TUserReport = {
  shop: string;
  compensationMoney: number;
  content: string;
  status: number;
  createdAt: Date;
};

type TConfirmRechargeVND = {
  bankId: number;
  amount: number;
  tradeContent: string;
  listImage: string[];
};

type TConfirmRechargeRMB = {
  amount: number;
  note: string;
};

type TRechargeRMB = Omit<
  TBaseReponseParams,
  "Code" | "Name" | "Description"
> & {
  AcceptBy: string;
  AcceptDate: Date;
  Amount: number;
  BankAddress: string;
  BankNumber: number;
  Beneficiary: string;
  CancelBy: string;
  CancelDate: Date;
  FullName: string;
  Note: string;
  Status: number;
  StatusName: string;
  /**
   * 2: Rút tiền (VNĐ)
   * 3: Nạp tiền (Tệ)
   */
  Type: 2 | 3;
  UID: number;
  UserName: string;
  Wallet: number;
  TotalStatus1?: number;
  TotalStatus2?: number;
  TotalStatus3?: number;
  TotalAmount?: number;
  TotalAmount1?: number;
  TotalAmount2?: number;
};

type TWithDraw = Omit<TBaseReponseParams, "Code" | "Name" | "Description"> & {
  AcceptBy: string;
  AcceptDate: Date;
  Amount: number;
  BankAddress: string;
  BankNumber: number;
  Beneficiary: string;
  CancelBy: string;
  CancelDate: Date;
  FullName: string;
  Note: string;
  Status: number;
  StatusName: string;
  /**
   * 2: Rút tiền (VNĐ)
   * 3: Nạp tiền (Tệ)
   */
  Type: 2 | 3;
  UID: number;
  UserName: string;
  Wallet: number;
  TotalStatus1?: number;
  TotalStatus2?: number;
  TotalStatus3?: number;
  TotalAmount?: number;
  TotalAmount1?: number;
  TotalAmount2?: number;
};

type TConfirmWithdrawalVND = {
  amount: number;
  bankNumber: string;
  beneficiary: string;
  bankAddress: string;
  note: string;
};

type TTransportList = {
  id: number;
  transportId: string;
  kg: number;
  size: string;
  exchangeKg: number;
  lastKg: number;
  note: string;
  statusId: number;
  statusName: string;
};

type TPaymentHistory = {
  id: number;
  created: Date;
  categoryId: number;
  categoryName: string;
  form: string;
  money: number;
};

type TReport = Omit<TBaseReponseParams, "Name" | "Code" | "Description"> & {
  Status: number;
  StatusName: string;
  UID: number;
  AmountCNY: number;
  CurrentCNYVN: number;
  MainOrderId: number;
  Amount: number;
  IMG: any;
  ComplainText: string;
  ShopId: number;
  UserName: string;
};

type TUserRegister = {
  UserName: string;
  Password: string;
  ConfirmPassword: string;
  Email: string;
  Phone: string;
  FirstName?: string;
  LastName?: string;
  FullName: string;
};
