type TResponse<T> = {
  ShippingType?: number;
  WarehouseFrom?: number;
  WarehouseTo?: number;
  DownloadFileName: string;
  Data: T;
  Messages: unknown;
  ResultCode: number;
  ResultMessage: string;
  Success: boolean;
};

type TErrorResponse<T> = {
  response: { data: TResponse<T> };
};

type TPaginationResponse<T> = {
  Items: T;
  PageIndex: number;
  PageSize: number;
  TotalItem: number;
  TotalPage: number;
};

type TPaginationParams = {
  TypeSearch?: number;
  PageIndex?: number;
  PageSize?: number;
  SearchContent?: string;
  OrderBy?: string;
  Type?: number;
  SalerID?: number;
  UserGroupId?: number;
  SalerId?: number;
  IsEmployee?: number;
  DatHangId?: number;
  EmployeeID?: number;
  Active?: boolean;
  UID?: number;
  OfEmployee?: boolean;
  IsRead?: number;
  RoleID?: number;
  TotalItems?: number;
};

type TPaginationParamsWithReactQuery = TPaginationParams & {
  Enabled: boolean;
  onSucess: (data: T) => void;
};

type TBaseUserFileParams = {
  UserFiles: Pick<TBaseReponseParams, "Active" | "Id" | "Deleted"> &
    { TypeId: number }[];
};

type TBaseUserLevel = Omit<TBaseReponseParams, "Code" | "Description"> & {
  FeeBuyPro: number;
  FeeWeight: number;
  LessDeposit: number;
  Money: number;
  MoneyTo: number;
};

type TBasePermissionParams = {
  PermitObjectPermissions: Pick<
    TBaseReponseParams,
    "Active" | "Id" | "Deleted"
  > & {
    PermitObjectId: number;
    PermissionId: number;
    UserGroupId: number;
    UserId: number;
  };
};

type TBaseReponseParams = {
  Id: number;
  Name: string;
  Code?: string;
  Active?: boolean;
  Deleted?: boolean;
  RowNumber?: number;
  Created?: Date;
  CreatedBy?: string;
  Updated?: Date;
  UpdatedBy?: string;
  Description?: string;
  BankInfo?: string;
};

type TController =
  | "authenticate"
  | "admin-send-user-wallet"
  | "file"
  | "big-package"
  | "catalogue"
  | "complain"
  | "configuration"
  | "email-configuration"
  | "export-request-turn"
  | "fee-buy-pro"
  | "history-pay-wallet"
  | "history-pay-wallet-"
  | "main-order"
  | "main-order-code"
  | "notifications"
  | "order-shop-temp"
  | "order-temp"
  | "page-type"
  | "page"
  | "pay-help"
  | "price-change"
  | "small-package"
  | "sms-configuration"
  | "transportation-order"
  | "user-level"
  | "warehouse-fee"
  | "withdraw"
  | "user"
  | "bank"
  | "permit-object"
  | "staff-income"
  | "fee-support"
  | "refund"
  | "out-stock-session"
  | "report-out-stock-session"
  | "report-admin-send-user-wallet"
  | "report-withdraw"
  | "report-user"
  | "report-history-pay-wallet"
  | "report-main-order"
  | "report-pay-help"
  | "report-main-order-revenue"
  | "report-pay-order-history"
  | "report-transportation-order"
  | "out-stock-session"
  | "menu"
  | "step"
  | "service"
  | "customer-benefits"
  | "notification"
  | "order"
  | "tracking";
