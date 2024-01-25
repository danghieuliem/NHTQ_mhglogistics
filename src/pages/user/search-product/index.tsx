// import { UserLayout } from '~/components'
// import { SearchPage } from '~/components/screens/user/searchProductOneBound'
// import { TNextPageWithLayout } from '~/types/layout'

// const Index: TNextPageWithLayout = () => {
//   return <SearchPage />
// }

// Index.displayName = 'Tìm kiếm sản phẩm'
// Index.Layout = UserLayout

// export default Index
import React from 'react'
import { NotFound } from '~/components'
import BlankLayout from '~/components/globals/layout/blankLayouts'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  return <NotFound />
}

Index.Layout = BlankLayout

export default Index
