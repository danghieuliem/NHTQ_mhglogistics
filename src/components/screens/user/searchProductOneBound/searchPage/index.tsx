import { Spin } from 'antd'
import { useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import {
  ProductList,
  SearchInput,
} from '~/components/screens/user/searchProductOneBound'
import { _taobaoAPI } from '~/api/onebound'
import { useHookOnebound } from './hookOnebound'

export const SearchPage = () => {
  const { isLoading, listProductRef, productList, handleFetchMore } =
    useHookOnebound()

  return (
    <Spin
      spinning={isLoading}
      size='large'
      indicator={<div className='spin spin-search-product'></div>}
    >
      <div className='mx-auto my-[24px] h-full w-full max-w-[1390px]'>
        <div className='titlePageUser'>Tìm kiếm sản phẩm</div>
        <div>
          <div className=''>
            <SearchInput />
          </div>
        </div>
        {/* Hidden on UI */}
        <div
          className='relative bottom-20 -z-50 bg-red'
          ref={listProductRef}
        ></div>
        {productList.length ? (
          <div>
            <ProductList products={productList} />
            <Waypoint onEnter={handleFetchMore}>
              <div className='flex w-full items-center justify-center p-12'>
                <Spin size='large' indicator={<div className='spin'></div>} />
              </div>
            </Waypoint>
          </div>
        ) : (
          <div className='mt-6 flex items-center justify-center'>
            Không tìm thấy dữ liệu
          </div>
        )}
      </div>
    </Spin>
  )
}
