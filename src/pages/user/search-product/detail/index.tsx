import { UserLayout } from '~/components'
import { TNextPageWithLayout } from '~/types/layout'
import DetailSearchPage from '~/components/screens/user/searchProductOneBound/detailSearchPage'

const Index: TNextPageWithLayout = () => {
  return (
    <div className='my-[24px]'>
      <DetailSearchPage />
    </div>
  )
}

Index.displayName = 'Tìm kiếm sản phẩm'
Index.Layout = UserLayout

export default Index
