type TConfig1 = {
  WebsiteName: string;
  LogoIMG: string;
  CompanyName: string;
  CompanyShortName: string;
  CompanyLongName: string;
  TaxCode: string;
  Address: string;
  Address2: string;
  Address3: string;
  AboutText: string;
  TimeWork: string;
  EmailContact: string;
  EmailSupport: string;
  Hotline: string;
  HotlineSupport: string;
  HotlineFeedback: string;
  BannerIMG: string;
  BannerText: string;
  BackgroundAuth: string;
  ChromeExtensionLink: string;
  CocCocExtensionLink: string;
};

type TConfig2 = {
  Facebook: string;
  Twitter: string;
  Instagram: string;
  Youtube: string;
  GoogleMapLink: string;
  WechatLink: string;
  ZaloLink: string;
  Skype: string;
  Pinterest: string;
  FacebookFanpage: string;
};

type TConfig3 = {
  Currency: number;
  PricePayHelpDefault: number;
  SalePercent: number;
  SalePercentAfter3Month: number;
  DatHangPercent: number;
  InsurancePercent: number;
  InsurancePercentTransport: number;
  AgentCurrency: number;
  NumberLinkOfOrder: number;
  SaleTranportationPersent: number;
  SalePayHelpPersent: numnber;
  RemoveCartDay: numner;
};

type TConfig4 = {
  NotiPopupTitle: string;
  NotiPopupEmail: string;
  NotiPopup: string;
  NotiRun: string;
};

type TConfig5 = {
  FooterLeft: string;
  FooterRight: string;
};

type TConfig6 = {
  MetaTitle: string;
  MetaKeyword: string;
  MetaDescription: string;
  OGTitle: string;
  OGDescription: string;
  OGImage: string;
  OGTwitterTitle: string;
  OGTwitterDescription: string;
  OGTwitterImage: string;
  GoogleAnalytics: string;
  WebmasterTools: string;
  HeaderScriptCode: string;
  FooterScriptCode: string;
  GoogleSiteVerification: string;
  OGLocale: string;
};

type TConfig = TConfig1 &
  TConfig2 &
  TConfig3 &
  TConfig4 &
  TConfig5 &
  TConfig6 & {
    OneSignalAppID: string;
    RestAPIKey: string;
  };

type TTariffTQVN = {
  Active: boolean;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  HelpMovingName: string;
  Id: number;
  IsHelpMoving: boolean;
  Price: number;
  RowNumber: number;
  ShippingType: number;
  ShippingTypeToWareHouseId: number;
  ShippingTypeToWareHouseName: string;
  Updated: Date;
  UpdatedBy: string;
  WareHouseFromName: string;
  WareHouseToName: string;
  WarehouseFromId: number;
  WarehouseId: number;
  WeightFrom: number;
  WeightTo: number;
  Name: string;
};

type TVolumeFee = {
  Active: boolean;
  Created: Date;
  CreatedBy: string;
  Deleted: boolean;
  HelpMovingName: string;
  Id: number;
  IsHelpMoving: boolean;
  Price: number;
  RowNumber: number;
  ShippingType: number;
  ShippingTypeToWareHouseId: number;
  ShippingTypeToWareHouseName: string;
  Updated: Date;
  UpdatedBy: string;
  WareHouseFromName: string;
  WareHouseToName: string;
  WarehouseFromId: number;
  WarehouseId: number;
  VolumeFrom: number;
  VolumeTo: number;
  Name: string;
};

type TTariffBuyPro = {
  Id: number;
  PriceFrom: number;
  PriceTo: number;
  FeePercent: number;
  FeeMoney: number;
};

type TTariffUser = {
  Id: number;
  Name: string;
  FeeBuyPro: number;
  FeeWeight: number;
  LessDeposit: number;
  Money: number;
  MoneyTo: number;
};

type TBank = TBaseReponseParams & {
  BankName: string;
  BankNumber: string;
  Branch: string;
  IMG: string;
  IMGQR: string;
};

type TSettingNotification = {
  Id: number;
  Name: string;
  IsEmailAdmin: boolean;
  IsEmailUser: boolean;
  IsNotifyAccountant: boolean;
  IsNotifyAdmin: boolean;
  IsNotifyOrderer: boolean;
  IsNotifySaler: boolean;
  IsNotifyStorekeepers: boolean;
  IsNotifyUser: boolean;
  IsNotifyWarehoue: boolean;
  IsNotifyWarehoueFrom: boolean;
};

type TTariffPriceChange = {
  Id: number;
  PriceFromCNY: number;
  PriceToCNY: number;
  Vip0: number;
  Vip1: number;
  Vip2: number;
  Vip3: number;
  Vip4: number;
  Vip5: number;
  Vip6: number;
  Vip7: number;
  Vip8: number;
};

type TTariffGoodsChecking = {
  RowNumber?: number;
  AmountFrom: number;
  AmountTo: number;
  Fee: number;
  Type: number;
  TypeName: string;
  Id: number;
  Created: Date;
  CreatedBy: string;
};
