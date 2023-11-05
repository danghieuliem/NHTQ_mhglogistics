import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { Page } from '~/api'
import {
  ActionButton,
  ArticleFilterBase,
  ArticleListTable,
  Layout,
} from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter })
  }

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 20,
    OrderBy: 'PageTypeId',
    SearchContent: null,
    TotalItems: null,
    PageTypeId: null,
  })

  const { data, isFetching } = useQuery(
    ['Page', [filter.PageIndex, filter.SearchContent, filter.PageTypeId]],
    () => Page.getList(filter).then((res) => res?.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      refetchOnWindowFocus: true,
      staleTime: 5000,
    },
  )

  return (
    <>
      <div className='flex items-end justify-between'>
        <ArticleFilterBase handleFilter={handleFilter} />
      </div>
      <ArticleListTable
        data={data?.Items}
        loading={isFetching}
        filter={filter}
        handleFilter={handleFilter}
      />
    </>
  )
}

Index.displayName = SEOConfigs.post.listPost
Index.breadcrumb = breadcrumb.article.articleList.main
Index.Layout = Layout
export default Index
