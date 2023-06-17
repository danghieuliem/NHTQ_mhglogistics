type TUserGroupCatalogue = TBaseReponseParams &
  TBasePermissionParams & {
    UserIds: number;
    UserInGroups: number[];
  };

type TUserLevelCatalogue = Omit<TBaseReponseParams, "Description"> & {
  FeeBuyPro: number;
  FeeWeight: number;
  LessDeposit: number;
  Money: number;
  MoneyTo: number;
  TotalItem: number;
};

type TUserCatalogue = Omit<TBaseReponseParams, "Description" | "Name"> &
  TBaseUserFileParams &
  TBasePermissionParams & {
    UserName: string;
    FullName: string;
    Phone: string;
    Email: string;
    Address: string;
    Status: number;
    Birthday: Date;
    IsAdmin: boolean;
    Password: string;
    Token: string;
    ExpiredToken: string;
    TotalViolations: number;
    IsLocked: boolean;
    LockedDate: Date;
    Gender: number;
    IsCheckOTP: boolean;
    IsLoginFaceBook: boolean;
    IsLoginGoogle: boolean;
    CountryId: number;
    CityId: number;
    DistrictId: number;
    WardId: number;
    NationId: number;
    IsResetPassword: boolean;
    UserGroupIds: number[];
    UserInGroups: number[];
    LevelId: number;
    Wallet: number;
    SaleId: number;
    DatHangId: number;
    VIPLevel: unknown;
    WalletCNY: number;
    WarehouseFrom: string;
    WarehouseTo: string;
    Currency: unknown;
    FeeBuyPro: number;
    FeeTQVNPerWeight: number;
    Deposit: number;
    ShippingType: unknown;
    WareHouseTQ: string;
    WareHouseVN: string;
    FeeTQVNPerVolume: unknown;
    TienTichLuy: unknown;
    DateUpLevel: unknown;
    TotalItem: number;
  };

type TWarehouseTQCatalogue = TBaseReponseParams;

type TWarehouseVNCatalogue = TBaseReponseParams;

type TShippingTypeToWarehouse = TBaseReponseParams;

type TShippingTypeToVN = TBaseReponseParams;

type TBankCatalogue = TBaseReponseParams;
