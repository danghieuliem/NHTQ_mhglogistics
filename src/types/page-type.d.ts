type _TPageType_Field_Page = Omit<
  TBaseReponseParams,
  'Name' | 'Description'
> & {
  PageTypeId: number
  Title: string
  Summary: string
  PageContent: string
  IsHidden: boolean
  SideBar: boolean
  IMG: string
  OGUrl: string
  OGTitle: string
  OGDescription: string
  OGImage: string
  MetaTitle: string
  MetaDescription: string
  MetaKeyword: string
  OGFacebookTitle: string
  OGFacebookDescription: string
  OGFacebookIMG: string
  OGTwitterTitle: string
  OGTwitterDescription: string
  OGTwitterIMG: string
}

type TPageType = TBaseReponseParams & {
  MetaDescription: string
  MetaKeyword: string
  MetaTitle: string
  OGDescription: string
  OGFacebookDescription: string
  OGFacebookIMG: string
  OGFacebookTitle: string
  OGImage: string
  OGTitle: string
  OGTwitterDescription: string
  OGTwitterIMG: string
  OGTwitterTitle: string
  OGUrl: string
  SideBar: boolean
  Pages: _TPageType_Field_Page[]
  PagesJson?: string
  NewPages?: any
}
