import {
  LayoutLeft,
  LayoutRight,
} from '~/components/screens/user/searchProductOneBound'
import { ShopName } from '~/configs'
import { useHookOnebound } from './hookOnebound'

const DetailSearchPage = () => {
  const { data, previewImg, handleChangePreview, ecsite } = useHookOnebound()
  // const {} = useHookOnebound()

  const renderView = () => {
    if (data) {
      return (
        <div className='tableBox mx-auto flex w-full max-w-[1200px] flex-row flex-wrap justify-between gap-4'>
          <div className='w-full md:w-[36%]'>
            <div className='w-full'>
              <LayoutLeft item={data} attributeImage={previewImg} />
            </div>
          </div>

          <div className='w-full md:w-[60%]'>
            <div>
              <LayoutRight
                onChangePreview={handleChangePreview}
                item={data}
                ecsite={ecsite as ShopName}
              />
            </div>
          </div>
        </div>
      )
    } else
      return (
        <div className='mt-[30px] flex h-full w-full flex-col items-center justify-center'>
          <div className='relative h-[50px] w-[0px]'>
            <span className='spin'></span>
          </div>

          <div className='text-[18px]'>
            Vui lòng đợi. Hệ thống đang tải dữ liệu
          </div>
        </div>
      )
  }
  return <div className='my-[24px]'>{renderView()}</div>
}
export default DetailSearchPage
