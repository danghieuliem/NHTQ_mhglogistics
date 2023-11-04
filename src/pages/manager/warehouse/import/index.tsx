import React from 'react'
import { Layout, ImportForm } from '~/components'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'

import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  return (
    <div className='tableBox'>
      <p className='pb-3 italic text-red '>
        * Vui lòng import đúng file mẫu, tránh tình trạng lỗi dữ liệu khách hàng
      </p>
      <ImportForm type={1} />
    </div>
  )
}

Index.displayName = SEOConfigs.importWarehouseTQ
Index.breadcrumb = breadcrumb.warehouse.import
Index.Layout = Layout

export default Index
