type TArticleCategory = {
  Id: number
  metatitle: string
  lastEdited: Date
  Description: string
  PageContent: string
  Name: string
  Code: string
  Active: boolean
  Title: string
}

type TArticleList = {
  Id: number
  link: string
  Title: string
  content: string
  description: string
  Active: boolean
  SideBar: boolean
  categoryId: number
  PageContent: string
  img: any
  createdAt: Date
  IMG: string
  PageTypeId: number
  Summary: string
  Name: string
  IsHidden: boolean
}

type TArticleList = {
  id: number
  title: string
  status: number
  category: string
  createdAt: Date
  content: string
  shortDescription: string
  image: string
  link: string
}

type TArticleSEO = {
  OGTitle: string
  OGDescription: string
  OGFacebookTitle: string
  OGFacebookDescription: string
  OGFacebookIMG: string
  OGTwitterTitle: string
  OGTwitterDescription: string
  OGTwitterIMG: string
  MetaTitle: string
  MetaDescription: string
  MetaKeyword: string
  OGUrl: string
}
