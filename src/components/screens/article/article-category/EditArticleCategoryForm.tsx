import React from 'react'
import {
  FormEditor,
  FormInput,
  FormSwitch,
} from '~/components/globals/formBase'
import { TControl } from '~/types/field'

export const EditArticleCategoryForm: React.FC<TControl<TArticleCategory>> = ({
  control,
}) => {
  return (
    <React.Fragment>
      <div className='grid grid-cols-12 gap-4 p-2'>
        <div className='col-span-full sm:col-span-3'>
          <div className='mb-4'>
            <FormInput
              control={control}
              label='Tên chuyên mục'
              placeholder='Nhập tên chuyên mục'
              name='Name'
              rules={{
                required: 'Không bỏ trống tên chuyên mục',
              }}
            />
          </div>
          <div className='mb-4'>
            <FormInput
              control={control}
              label='Tiêu đề chuyên mục'
              placeholder='Nhập tiêu đề chuyên mục'
              name='Title'
              rules={{
                required: 'Không bỏ trống tiêu đề chuyên mục',
              }}
            />
          </div>
          <div className='mb-4'>
            <FormSwitch
              control={control}
              name='Active'
              label={'Hiển thị chuyên mục?'}
            />
          </div>
        </div>
        <div className='col-span-full min-h-[700px] sm:col-span-9'>
          <FormEditor
            control={control}
            label=''
            name='Description'
            required={false}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
