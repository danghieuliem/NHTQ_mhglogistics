import Link from 'next/link'
import React from 'react'
import { ActionButton, FilterInput, FilterSelect } from '~/components'
import { useCatalogue } from '~/hooks'

type TProps = {
  handleFilter: (newFilter) => void
}

export const ArticleFilterBase: React.FC<TProps> = ({ handleFilter }) => {
  const { pageType } = useCatalogue({ pageTypeEnabled: true })

  return (
    <div className='grid w-full gap-4 md:flex'>
      <FilterInput
        name='code'
        handleSubmit={(val) =>
          handleFilter({
            SearchContent: val.trim().toLocaleLowerCase(),
            PageTypeId: null,
          })
        }
        allowClear={false}
        placeholder='Nhập tên bài viết'
        id={''}
      />
      <FilterSelect
        placeholder='Chọn chuyên mục'
        data={pageType}
        select={{ label: 'Name', value: 'Id' }}
        handleSearch={(val) =>
          handleFilter({ SearchContent: null, PageTypeId: val })
        }
        isClearable
      />
      <div className='flex flex-1 items-center justify-end'>
        <Link href={'/manager/article/article-list/add'}>
          <a target='_blank'>
            <ActionButton
              icon='fas fa-plus-circle'
              title={'Thêm bài viết'}
              isButton
              isButtonClassName='bg-green !text-white'
            />
          </a>
        </Link>
      </div>
    </div>
  )
}
