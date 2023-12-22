import { UserLayout } from '~/components'
import { SearchPage } from '~/components/screens/user/searchProduct'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  return <SearchPage />
}

Index.displayName = 'Tìm kiếm sản phẩm'
Index.Layout = UserLayout

export default Index
