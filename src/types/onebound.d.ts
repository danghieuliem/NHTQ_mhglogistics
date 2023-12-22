type TSearchEC = {
  q: string
  key: string
  ang: string
  secret: string
  start_price?: string | number
  end_price?: string | number
  page?: string | number
  cat?: string | number
  discount_only?: string | number
  sort?: string | number
  page_size?: string | number
  seller_info?: string | number
  nick?: string | number
  ppath?: string | number
  imgid?: string | number
  filter?: string | number
}

type TPriceRange = string[]

type TItem_imgs = {
  url: string
}

type TProps_images = {
  properties: string //"1627207:3232483",
  url: string //"//img.alicdn.com/imgextra/i2/456706214/O1CN01rzTZEL1vm3ikk8Gum_!!456706214.jpg"
}

type TProps = {
  name: string //"品牌",
  value: string //"MRY"
}

type TSellerInfo = {
  nick: string // "tongyin1982",
  item_score: string //"4.8 ",
  score_p: string //"4.8 ",
  delivery_score: string //"4.8 ",
  shop_type: string //"C",
  user_num_id: string //"456706214",
  sid: string //"112458579",
  title: string // "泳装原产地直销店",
  zhuy: string //"https://shop112458579.taobao.com/",
  shop_name: string //"泳装原产地直销店"
}

type TSku = {
  properties_name_trans?: string
  price?: string // "39.8",
  total_price?: number // 0,
  orginal_price?: string //"39.8",
  properties: string //"20509:398278313;1627207:3232483",
  properties_name: string // "20509:398278313:尺码:S（建议70-85斤）;1627207:3232483:颜色分类:军绿色",
  quantity?: string //"200",
  sku_id?: string //4476715631140"
  prop_list?: string[]
  image?: string
  name?: string
}

type TItemDetail = {
  num_iid: number // "606725453107",
  title: string // "bikini游泳衣女夏分体纯色大胸挂脖比基尼性感三点式小胸聚拢泳装",
  desc_short: string // "",
  price: string // "39.80",
  orginal_price: string // "119.80",
  nick: string //  "tongyin1982",
  num: string // "200",
  pic_url: string // "//img.alicdn.com/imgextra/i1/456706214/O1CN01hkv7uI1vm3ikk6C0d_!!0-item_pic.jpg",
  brand: string // "MRY",
  brandId: string // "6000245",
  rootCatId: string // "50010728",
  cid: string //  "50016737",
  crumbs: []
  detail_url: string // "https://item.taobao.com/item.htm?id=606725453107",
  desc: string // "<p><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i1/456706214/O1CN01T8dmRo1vm3lWKmnnP_!!456706214.jpg\"  /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i1/456706214/O1CN01rSZtoy1vm3ilT24fA_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i2/456706214/O1CN018SB7sp1vm3ikGEp4k_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i2/456706214/O1CN01JLkRZT1vm3ikk94lP_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i2/456706214/O1CN01OhyTjj1vm3ijw8jmM_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01UpWGDb1vm3im4i5QR_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i4/456706214/O1CN01lHAQDo1vm3ikjCoMI_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01lOKrOh1vm3io4s4BY_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i4/456706214/O1CN01Wrm7iI1vm3ijw7b6z_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01d1067H1vm3ikk7KdG_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i4/456706214/O1CN01RKx5Ub1vm3io4tL9N_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i2/456706214/O1CN018TU6ER1vm3icjalmC_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01DMtrLL1vm3ijw9LCv_!!456706214.jpg\" /><img align=\"middle\" src=\"http://img.alicdn.com/imgextra/i2/456706214/O1CN01e8dnT11vm3ijw94aG_!!456706214.jpg\" /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01Y4cY631vm3jSlOo8p_!!456706214.jpg\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01Veyzwh1vm3kNKA4U3_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i4/456706214/O1CN01w5fayo1vm3kMwxF38_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01Anhh9w1vm3kPj1Bcc_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i2/456706214/O1CN01Uu5JPu1vm3kRUT0ht_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01YEFBJo1vm3kPGAqPr_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01lYqomu1vm3kNK8fA1_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01w6AanE1vm3kPixZ5O_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i3/456706214/O1CN01RZjwd71vm3kMwwRAI_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i1/456706214/O1CN01TolzWT1vm3kMwvy3n_!!456706214.png\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i4/456706214/O1CN01eJyUSS1vm3jUsyvZe_!!456706214.jpg\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i4/456706214/O1CN01nKpGFz1vm3jR7sLC4_!!456706214.jpg\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i1/456706214/O1CN015QDMvB1vm3jORYcR1_!!456706214.jpg\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i4/456706214/O1CN01abAwYT1vm3jORZUTm_!!456706214.jpg\"  /><img align=\"absmiddle\" src=\"http://img.alicdn.com/imgextra/i2/456706214/O1CN01lSfpUW1vm3jUsprTq_!!456706214.jpg\"  /></p> \n  <p>&nbsp;</p> \n  <p>&nbsp;</p> \n  <div >\n   <img src=\"http://img.alicdn.com/imgextra/i4/14192221/TB2mRB8gFXXXXbQXXXXXXXXXXXX-14192221.png?p=wonbao_marketing_poster_183832_start_bottom_6\" />\n  </div> \n  <div data-title=\"wonbao_marketing_poster_183832\"> \n   <div>\n    <img border=\"0\" src=\"http://img.alicdn.com/imgextra/i2/456706214/O1CN01opz7Vp1vm3lHkCZ3A_!!456706214.png\" />\n   </div> \n  </div> \n  <div >\n   <img src=\"http://img.alicdn.com/imgextra/i4/14192221/TB2mRB8gFXXXXbQXXXXXXXXXXXX-14192221.png?p=wonbao_marketing_poster_183832_end_bottom_6\" />\n  </div> \n  <p>&nbsp;</p><img src=\"https://www.o0b.cn/i.php?t.png&rid=gw-3.6468bbc8c6cd8&p=311456762&k=y.com&t=1684585419\" style=\"display:none\" />",
  item_imgs: TItem_imgs[]
  item_weight: number //0,
  location: string // "辽宁葫芦岛",
  post_fee: number //0,
  express_fee: number //0,
  ems_fee: number //0,
  shipping_to: ''
  has_discount: 'true' | 'false' // "true",
  video: {
    url: string //"https://cloud.video.taobao.com/play/u/456706214/p/2/e/6/t/1/362541952268.mp4?appKey=38829"
  }
  is_virtual: string // "",
  sample_id: string //  "",
  is_promotion: 'true' | 'false'
  prop_imgs: {
    prop_img: TProps_images[]
  }
  property_alias: string // "",
  props: TProps[]
  props_name: string // "20509:398278313:尺码:S（建议70-85斤）;20509:802208820:尺码:M（建议85--100斤）;20509:398278315:尺码:L（建议100-115斤）;20509:398278316:尺码:XL（建议115-130斤）;1627207:3232483:颜色分类:军绿色;1627207:28341:颜色分类:黑色;1627207:3455405:颜色分类:青色;1627207:3232480:颜色分类:粉红色;1627207:28320:颜色分类:白色;1627207:14031282:颜色分类:砖红色",
  total_sold: number // 200,
  skus: {
    sku: TSku[]
  }
  seller_id: string //"456706214",
  shop_id: string //"112458579",
  props_list: {}
  // "props_list": {
  //   "20509:398278313": "尺码:S（建议70-85斤）",
  //   "20509:802208820": "尺码:M（建议85--100斤）",
  //   "20509:398278315": "尺码:L（建议100-115斤）",
  //   "20509:398278316": "尺码:XL（建议115-130斤）",
  //   "1627207:3232483": "颜色分类:军绿色",
  //   "1627207:28341": "颜色分类:黑色",
  //   "1627207:3455405": "颜色分类:青色",
  //   "1627207:3232480": "颜色分类:粉红色",
  //   "1627207:28320": "颜色分类:白色",
  //   "1627207:14031282": "颜色分类:砖红色"
  // },
  seller_info: TSellerInfo
  tmall: false
  update_time: string //"2023-05-20 20:23:39",
  data_update: string // "2023-05-20 20:23:39",
  data_f: string //"xdl",
  data_from: string //"hid",
  promo_type: null
  props_img: {}
  error: null | string
  format_check: string // "ok",
  sales: number // 0,
  desc_img: string[]
  shop_item: []
  relate_items: []
  priceRange?: TPriceRange
}

type TDataSend = {
  category_id?: string
  category_name?: string
  comment?: string
  data_value?: string
  error?: string
  is_translate?: string
  location_sale?: string
  maxTimes?: string
  outer_id?: string
  require_min?: string
  selectedProps?: string
  selectedSKU_ID?: string
  title_translated?: string
  tool?: string
  version?: string
  weight?: string
  Site?: string
  property_translated?: string
  price_table?: any
  step?: any

  // standard + obligatory data send
  title_origin: string | undefined
  price_origin: string | number | undefined
  price_promotion: string | number | undefined
  seller_id: string | undefined
  shop_id: string | undefined
  shop_name: string | undefined
  wangwang: string | undefined
  quantity: number | undefined
  stock: string | number | undefined
  item_id: string | undefined
  brand: string | undefined
  property: string | undefined
  link_origin: string | undefined
  image_model: string | undefined
  site: string | undefined
  image_origin: string | undefined
  MinimumQuantity?: string | number | undefined
  pricestep?:
    | string
    | undefined
    | {
        minQuantity: number
        price: number
      }[]
}

type TRenderProps = {
  [name: string]: {
    transName: string // name trans
    name: string
    value: string
    transValue: string // value trans
    key: string
    image: string | undefined
  }[]
}

type TDataRender =
  | (TItemDetail & {
      defautlSelected: TSku
      titleTrans?: string
      newSku: TSku[]
      renderProps: TRenderProps
      keyOutStock: string[]
    })
  | undefined

type TGetItemAPI = {
  key: string //t84368626097,
  num_iid: number //606725453107
  is_promotion: number //1,
  lang: string //zh-CN
  secret: string //20230925
}

type TResponseOnebound = {
  detail_url: string
  num_iid: string
  orginal_price: string
  pic_url: string
  price: string
  promotion_price: string
  sales: number
  seller_id: string
  title: string
}
