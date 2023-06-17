type TOutStockSessionPackages = Omit<
  TBaseReponseParams,
  "Name" | "Code" | "Description"
> & {
  DateOutStock: Date;
  IsPayment: boolean;
  OutStockSessionId: number;
  SmallPackage: TSmallPackage;
  SmallPackageId: number;
  TotalLeftPay: number;
  TotalPriceVND: number;
  WarehouseFee: number;
  OrderTransactionCode: number;
  OrderRemaining: number;
  MainOrderID: string;
};

type TOutStockSession = Omit<
  TBaseReponseParams,
  "Name" | "Code" | "Description"
> & {
  FullName: string;
  Note: string;
  OutStockSessionPackages: TOutStockSessionPackages[];
  Status: number;
  StatusName: string;
  TotalPay: number;
  TotalWarehouseFee: number;
  TotalWeight: number;
  Type: number;
  UID: number;
  UserName: string;
  UserPhone: string;
  SmallPackageIds: number[];
  PayableWeight: number;
  VolumePayment: number;
  UserWallet: nunmber;
};
