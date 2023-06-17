type TMainOrderCode = Omit<
  TBaseReponseParams,
  "Name" | "Description" | "Code"
> & {
  MainOrderId: number;
  Code: string;
  TotalItem: number;
  OrderTransactionCode: string[];
};

type TSmallPackage = Omit<TBaseReponseParams, "Name"> & {
  AdditionFeeCNY: number;
  AdditionFeeVND: number;
  BigPackageId: number;
  CancelDate: Date;
  CurrentPlaceId: number;
  DateInLasteWareHouse: Date;
  DateInTQWarehouse: Date;
  DateInVNTemp: Date;
  DateOutWarehouse: Date;
  DateScanTQ: Date;
  DateScanVN: Date;
  DonGia: number;
  FeeShip: number;
  Height: number;
  IMG: string;
  IsCheckProduct: boolean;
  IsHelpMoving: boolean;
  IsInsurance: boolean;
  IsLost: boolean;
  IsPackged: boolean;
  IsTemp: boolean;
  LWH: string;
  Length: number;
  MainOrderCode: string;
  MainOrderCodeId: number;
  MainOrderId: number;
  OrderTransactionCode: string;
  OrderType: number;
  OrderTypeName: string;
  PackageCodeTemp: unknown;
  PayableWeight: number;
  PriceWeight: number;
  ProductType: string;
  SensorFeeCNY: number;
  SensorFeeVND: number;
  StaffNoteCheck: string;
  StaffTQWarehouse: string;
  StaffVNOutWarehouse: string;
  StaffVNWarehouse: string;
  Status: number;
  StatusConfirm: number;
  StatusConfirmName: string;
  StatusName: string;
  TotalDateInLasteWareHouse: number;
  TotalOrder: number;
  TotalOrderQuantity: number;
  TotalPrice: number;
  TotalStatus0: number;
  TotalStatus1: number;
  TotalStatus2: number;
  TotalStatus3: number;
  TotalStatus4: number;
  TransportationOrderId: number;
  UID: number;
  UserName: string;
  UserNote: string;
  UserPhone: string;
  Weight: number;
  Volume: number;
  Width: number;
  Checked?: boolean;
  Name: string;
  OrderId: number;
  FloatingStatus: number;
  FloatingUserName: string;
  FloatingStatusName: string;
  FloatingUserPhone: number;
  Note: string;
  VolumePayment: number;
};

type TProduct = Omit<TBaseReponseParams, "Name" | "Description" | "Code"> & {
  UID: number;
  TitleOrigin: string;
  TitleTranslated: string;
  Quantity: number;
  RealPrice: number;
  Brand: string;
  ProductStatus: number;
  ProductStatusName: string;
  PriceOrigin: number;
  PricePromotion: number;
  PropertyTranslated: string;
  Property: string;
  DataValue: string;
  ImageOrigin: string;
  ShopId: string;
  ShopName: string;
  SellerId: string;
  Wangwang: string;
  Stock: number;
  LocationSale: string;
  Site: string;
  Comment: string;
  ItemId: string;
  LinkOrigin: string;
  OuterId: string;
  Error: string;
  Weight: number;
  CategoryName: string;
  CategoryId: number;
  Tool: string;
  Version: string;
  IsTranslate: boolean;
  UPriceBuy: number;
  UPriceBuyVN: number;
  IsFastDelivery: boolean;
  IsFastDeliveryPrice: number;
  IsCheckProduct: boolean;
  IsCheckProductPrice: number;
  IsPacked: boolean;
  IsPackedPrice: number;
  IsFast: boolean;
  IsFastPrice: number;
  PriceVND: number;
  PriceCNY: number;
  FeeShipCN: number;
  FeeBuyPro: number;
  FeeWeight: number;
  Note: string;
  FullName: string;
  Address: string;
  Email: string;
  Phone: string;
  Status: number;
  Deposit: number;
  CurrentCNYVN: number;
  TotalPriceVND: number;
  PriceChange: number;
  MainOrderId: number;
  ProductNote: string;
  StepPrice: string;
  OrderShopCode: string;
  IsBuy: boolean;
  SmallPackages: TWarehouseCN[];
};

type TFeeSupport = Omit<TBaseReponseParams, "Name" | "Description" | "Code"> & {
  SupportName: string;
  SupportInfoVND: number;
  MainOrderId: number;
};

type TPayOrderHistory = Omit<
  TBaseReponseParams,
  "Name" | "Description" | "Code"
> & {
  Status: number;
  StatusName: string;
  Type: number;
  TypeName: string;
  Amount: number;
};

type THistoryOrderChange = Omit<
  TBaseReponseParams,
  "Name" | "Description" | "Code"
> & {
  UserGroupName: string;
  HistoryContent: string;
};

type TOrderComplain = Omit<
  TBaseReponseParams,
  "Name" | "Description" | "Code"
> & {
  Status: number;
  StatusName: string;
  ComplainText: string;
};

type TMainOrderTransactionCodeDetail = {
  MainOrderCode: string;
  OrderTransactionCode: string[];
};

type TOrder = Omit<TBaseReponseParams, "Name" | "Code" | "Description"> & {
  Address: string;
  AmountDeposit: number;
  BillOfLadings: unknown; // chưa biết
  CKFeeBuyPro: number;
  CKFeeBuyProVND: number;
  Complains: TOrderComplain[];
  CompleteDate: Date;
  CurrentCNYVN: number;
  Code: string;
  DatHangId: number;
  DateBuy: Date;
  DateTQ: Date;
  DateVN: Date;
  DeliveryAddress: string;
  Deposit: number;
  DepositDate: Date;
  Email: string;
  ExpectedDate: Date;
  FeeSupports: TFeeSupport[];
  FeeBuyPro: number;
  FeeBuyProPT: number;
  FeeBuyProUser: number;
  FeeInWareHouse: number;
  FeeShipCN: number;
  FeeShipCNCNY: number;
  FeeShipCNReal: number;
  FeeShipCNRealCNY: number;
  FeeShipCNToVN: number;
  FeeSupports: number;
  FeeVolume: number;
  FeeVolumeCK: number;
  FeeWeight: number;
  FeeWeightCK: number;
  FromPlace: number;
  FromPlaceName: string;
  FullName: string;
  HH: number;
  HHCNY: number;
  HistoryOrderChanges: THistoryOrderChange[];
  ImageOrigin: string;
  InsuranceMoney: number;
  InsurancePercent: number;
  IsCheckNotiPrice: boolean;
  IsCheckProduct: boolean;
  IsCheckProductPrice: number;
  IsCheckProductPriceCNY: number;
  IsComplain: boolean;
  IsDoneSmallPackage: boolean;
  IsFastDelivery: boolean;
  IsFastDeliveryPrice: number;
  IsFlow: boolean;
  IsGiaoHang: boolean;
  IsHidden: boolean;
  IsInsurance: boolean;
  IsPacked: boolean;
  IsPackedPrice: number;
  IsPackedPriceCNY: number;
  IsUpdatePrice: number;
  LessDeposit: number;
  MainOrderCodes: TMainOrderCode[];
  MainOrderTransactionCode: unknown; // chưa biết
  MainOrderTransactionCodeDetails: TMainOrderTransactionCodeDetail[]; // chưa biết
  Note: string;
  Orders: TProduct[];
  OrderTransactionCodes: unknown; // chưa biết
  OrderType: number;
  OrderTypeName: string;
  OrderVolume: number;
  OrderWeight: number;
  OrdererUserName: string;
  PayDate: Date;
  PayOrderHistories: TPayOrderHistory[];
  Phone: string;
  PriceCNY: number;
  PriceVND: number;
  PriceOrigin: number;
  ProductLists: unknown; // chưa biết
  QuantityMDH: unknown; // chưa biết
  QuantityMVD: unknown; // chưa biết
  Quantity: number;
  ReceivePlace: number;
  ReceivePlaceName: string;
  ReceiverEmail: string;
  ReceiverFullName: string;
  ReceiverPhone: string;
  RemainingAmount: number;
  SmallPackages: TSmallPackage[];
  SalerId: number;
  SalerUserName: string;
  ShippingType: number;
  ShippingTypeName: string;
  ShopId: string;
  ShopName: string;
  ShopTempId: number;
  Site: string;
  Status: number;
  StatusName: string;
  StatusPackage: unknown; // chưa biết
  Surcharge: unknown; // chưa biết
  TQVNVolume: number;
  TQVNWeight: number;
  TimeLine: unknown; // chưa biết
  TotalFeeSupport: number;
  TotalLink: number;
  TotalOrderAmount: number;
  TotalPriceReal: number;
  TotalPriceRealCNY: number;
  TotalPriceVND: number;
  UID: number;
  UserName: string;
  Users: unknown; // chưa biết
  Wallet: number;
  ImageOrigin: number;
  MainOrderId: number;
  FeeBuyProCK?: number;
  FeeWeightCK?: number;
  CancelDate?: Date;
};

type THistoryService = Omit<
  TBaseReponseParams,
  "Name" | "Code" | "Description"
> & {
  PostId: number;
  UID: number;
  OldStatus: number;
  OldeStatusText: string;
  NewStatus: number;
  NewStatusText: string;
  Type: number;
  Note: string;
  UserName: string;
};

type PayHelpDetail = Omit<
  TBaseReponseParams,
  "Name" | "Code" | "Description"
> & {
  PayHelpId: number;
  Desc1: number;
  Desc2: string;
  OrderId: number;
  Customer: string;
  FriendsAccount: string;
};

type TRequestPaymentOrder = Omit<
  TBaseReponseParams,
  "Name" | "Code" | "Description"
> & {
  Currency: number;
  CurrencyConfig: number;
  Deposit;
  Note: string;
  TotalPrice: number;
  TotalPriceVND: number;
  TotalPriceVNDGiaGoc: number;
  Deposit: number;
  Status: number;
  StatusName: string;
  IsComplete: boolean;
  PayHelpDetails: PayHelpDetail[];
  HistoryServices: THistoryService[];
  UserName: string;
  FullName: string;
  Email: string;
  WarehouseVN: string;
  WarehouseTQ: string;
  ShippingTypeId: number;
  gender: string;
  NumberPhone: number;
  Address: string;
  PasswordNew: string;
  PasswordAgain: string;
  LastName: string;
  Date: Date;
  SalerID: number;
  SalerName: string;

  // User: Omit<TBaseReponseParams, "Name" | "Code" | "Description"> & {
  //   Address: string;
  //   Birthday: Date;
  //   ConfirmNewPassWord: string;
  //   ConfirmPassWord: string;
  //   Currency: number;
  //   DatHangId: number;
  //   DateUpLevel: number;
  //   Deposit: number;
  //   Email: string;
  //   FeeBuyPro: number;
  //   FeeTQVNPerVolume: number;
  //   FeeTQVNPerWeight: number;
  //   FullName: string;
  //   Gender: number;
  //   IsAdmin: boolean;
  //   IsCheckOTP: boolean;
  //   IsLoginFaceBook: boolean;
  //   IsLoginGoogle: boolean;
  //   IsResetPassword: boolean;
  //   LevelId: number;
  //   NewPassWord: number;
  //   Orderer: unknown;
  //   Password: string;
  //   Phone: string;
  //   SaleId: number;
  //   Saler: string;
  //   ShippingType: unknown;
  //   Status: number;
  //   StatusName: string;
  //   TienTichLuy: number;
  //   UserGroup: TBaseReponseParams & {
  //     UserIds: unknown[];
  //     UserInGroups: unknown[];
  //   };
  //   UserGroupName: string;
  //   UserLevel: unknown;
  //   UserName: string;
  //   VIPLevel: number;
  //   Wallet: number;
  //   WalletCNY: number;
  //   WareHouseTQ: string;
  //   WareHouseVN: string;
  //   WarehouseFrom: string;
  //   WarehouseTo: string;
  // };
};

type TCreateRequestPaymentOrder = {
  Id: number;
  UserName: string;
  Note: string;
  PayHelpDetails: {
    desc1: number;
    desc2: string;
  }[];
  TotalPrice: number;
  TotalPriceVND: number;
  Currency?: number;
  Created?: string;
};

type TPaymentOrder = {
  Id: number;
  /**
   * Loại thanh toán
   * 1: Đặt cọc.
   * 2: Thanh toán.
   */
  PaymentType: 1 | 2;
  /**
   * Hình thức thanh toán
   * 1: Trực tiếp.
   * 2: Ví điện tử.
   */
  PaymentMethod: 1 | 2;
  Amount: number;
  Note: string;
};

type TComplain = {
  id: number;
  username: string;
  code: number;
  moneyTQ: number;
  moneyVN: number;
  rate: number;
  description: string;
  statusId: number;
  statusName: string;
  created: Date;
  confirmBy: string;
  confirmDate: Date;
};

type TMessage = {
  UID: number;
  MainOrderId: number;
  Comment: string;
  Type: number;
  TypeName: string;
  FileLink: string;
  UserName: string;
  RowNumber: number;
  Id: number;
  Created: Date;
  CreatedBy: admin;
  Deleted: boolean;
  Active: boolean;
};
