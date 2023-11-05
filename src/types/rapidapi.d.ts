type PriceOfRange = {
  ConvertedPrice: string
  ConvertedPriceWithoutSign: string
  CurrencyName: string
  CurrencySign: string
  OriginalPrice: number
  OriginalCurrencyCode: string
}
type TQuantityRanges = {
  MinQuantity: number
  Price: PriceOfRange
}
interface TPriceItem {
  ConvertedPrice: string
  ConvertedPriceList: {
    ConvertedPriceWithoutSign: string
    CurrencyName: string
    CurrencySign: string
  }
  MarginPrice: number
  OriginalCurrencyCode: string //"CNY"
  OriginalPrice: number // 1.8
}
type TPictureProduct = {
  IsMain: boolean
  Url: string
  Large: {
    Url: string
    Height: number
    Width: number
  }
  Medium: {
    Url: string
    Height: number
    Width: number
  }
  Small: {
    Url: string
    Height: number
    Width: number
  }
}
type IRapidProductItem = {
  QuantityRanges?: TQuantityRanges[] | null
  CategoryId: string // abb-124742036
  ErrorCode: string
  ExternalCategoryId: string //124742036
  FeaturedValues: {
    Name: string
    Value: string
  }[] // SalesInLast30Days: 1788
  Id: string // "abb-44917729285"
  IsFiltered: boolean
  IsSellAllowed: boolean
  MainPictureUrl: string
  MasterQuantity: number
  OriginalTitle: string
  Title: string // vietnameses
  PhysicalParameters: {
    Weight: number
    Width: number
  }
  Pictures: TPictureProduct[]
  Price: TPriceItem
  ProviderType: string // Alibaba1688
  StuffStatus: string // "New"
  TaobaoItemUrl: string // "https://detail.1688.com/offer/44917729285.html"
  VendorDisplayName: string // tên cửa hàng hiển thị
  VendorId: string // code cửa hàng
  VendorName: string // tên cửa hàng

  PromotionPrice?: any
}

type TVideoProduct = {
  PreviewUrl: string // img
  Url: string // video
}
type TAttribute = {
  Pid: string // "颜色"
  Vid: string // "黑灰(强化镜片)"
  PropertyName: string // "màu"
  Value: string // "Đen và xám (ống kính tăng cường)"
  OriginalPropertyName: string // "颜色"
  OriginalValue: string // "黑灰(强化镜片)"
  IsConfigurator: boolean // true

  ImageUrl?: string //https://cbu01.alicdn.com/img/ibank/O1CN018NrfUe1rgmse5N7B8_!!2468675661-0-cib.jpg
  MiniImageUrl?: string // https://cbu01.alicdn.com/img/ibank/O1CN018NrfUe1rgmse5N7B8_!!2468675661-0-cib.100x100.jpg
}
type TConfigItem = {
  Configurators: {
    Pid: string //"颜色"
    Vid: string //透明(强化镜片)"
  }[]
  Id: string
  Price: PriceOfRange
  Quantity: number
  QuantityRanges: TQuantityRanges[]
  SalesCount: number
}
type IPromotionDetail = {
  ConfiguredItems: TConfigItem[]
  ErrorCode: string
  HasError: boolean
  Id: string
  Name: string
  Price: PriceOfRange
  PriceOfRange: string
}
interface IDetailRapidProductItem extends IRapidProductItem {
  ConfiguredItems: TConfigItem[]
  FirstLotQuantity: number
  Videos?: TVideoProduct[]
  Attributes: TAttribute[]
  ActualWeightInfo: {
    Type: string //"RealByVendor"
    DisplayName: string //"Trọng lượng thực sự"
    Weight: number //0.036
  }
  Promotions?: IPromotionDetail[]
  Site: string // 1699 | TAOBAO
  ShopId: string
}
