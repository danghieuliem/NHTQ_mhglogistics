import { UserLayout } from '~/components'
import { SearchPage } from '~/components/screens/user/searchProductOneBound'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  return <SearchPage />
}

Index.displayName = 'Tìm kiếm sản phẩm'
Index.Layout = UserLayout

export default Index
