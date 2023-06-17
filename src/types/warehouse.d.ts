type TPackage = TBaseReponseParams & {
  Weight: number;
  Volume: number;
  Status: number;
  StatusName: string;
  Total: number;
  SmallPackages: TSmallPackage[];
};

type TWarehouseCN = Omit<TBaseReponseParams, "Name"> & {
  AssignMainOrderId: number;
  AdditionFeeCNY: number;
  AdditionFeeVND: number;
  BigPackageId: number;
  BigPackageName: string;
  CancelDate: Date;
  Currency: number;
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
  IsWarehouseTQ: boolean;
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
  PackageCodeTemp: unknown; // chưa biết
  PayableWeight: number;
  PriceWeight: number;
  ProductType: string;
  SensorFeeCNY: number;
  SensorFeeVND: number;
  StaffNoteCheck: unknown; // chưa biết
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
  Phone: string;
  Volume: number;
  Weight: number;
  Width: number;
  IsAssign: boolean;
  Checked: boolean;
  TotalLeftPay: number;
  WarehouseFee: number;
  VolumePayment: number;
};

type TAddtionalFieldWarehouse = {
  IsWarehouseTQ: boolean;
  IsWarehouseVN: boolean;
  IsAssign: boolean;
  /**
   * 1. Gán đơn cho khách mua hộ
   * 2. Gán đơn cho khách ký gửi
   */
  AssignType: 1 | 2;
  AssignMainOrderId: number;
  AssignUID: number;
  AssignNote: string;
  WareHouseFromId: number;
  WareHouseId: number;
  ShippingTypeId: number;
};

type TWarehouseVN = TWarehouseCN;

type TCreateCode = {
  codePackage: string;
  codeOrder: string;
  note: string;
};

type TWarehouseVN = {
  code: string;
};

type TImport = {
  BigPackageId: number;
  FileURL: string;
};

type TPackage = {
  id: number;
  code: string;
  kg: number;
  m3: number;
  statusId: number;
  statusName: string;
  created: Date;
};

type TPackageDetail = {
  id: number;
  note: string;
  code: string;
  category: string;
  packageId: number;
  packageName: string;
  ship: number;
  kg: number;
  m3: number;
  statusId: number;
  statusName: string;
  created: Date;
  img: unknown;
};

type TTransactionCode = {
  id: number;
  bag: string;
  code: string;
  codeOrder: number;
  categoryId: number;
  categoryName: string;
  kg: number;
  lastKg: number;
  note: string;
  statusId: number;
  statusName: string;
  created: Date;
};

type TMissingPackage = TTransactionCode & {
  fee: string;
  m3: number;
};

type TCreateWareHouse = {
  Name: string;
  IsChina: number;
  Address: string;
};

type TFilterWareHouseFee = {
  PageIndex: number;
  PageSize: number;
  OrderBy: string;
  WarehouseFromId: number;
  WarehouseId: number;
  ShippingTypeToWareHouseId: number;
  IsHelpMoving: number;
};

type TFilterVolumeFee = {
  PageIndex: number;
  PageSize: number;
  OrderBy: string;
  WarehouseFromId: number;
  WarehouseId: number;
  ShippingTypeToWareHouseId: number;
  IsHelpMoving: number;
};
