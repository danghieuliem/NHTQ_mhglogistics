import { useQuery } from 'react-query'
import { pageType } from '~/api'
import { ArticleCategoryTable, Layout, toast } from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  const { data, isFetching } = useQuery(
    [
      'pageType',
      {
        PageIndex: 1,
        PageSize: 1000,
        OrderBy: 'Id desc',
      },
    ],
    () =>
      pageType
        .getList({
          PageIndex: 1,
          PageSize: 1000,
          OrderBy: 'Id desc',
        })
        .then((res) => {
          return res?.Data
        }),
    {
      onSuccess: (data) => data?.Items,
      onError: toast.error,
    },
  )
  return <ArticleCategoryTable data={data?.Items} loading={isFetching} />
}

Index.displayName = SEOConfigs.post.Categories
Index.breadcrumb = breadcrumb.article.articleCategory.main
Index.Layout = Layout

export default Index
