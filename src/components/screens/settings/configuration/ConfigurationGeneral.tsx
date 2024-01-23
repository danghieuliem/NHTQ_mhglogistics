import { Switch, Tooltip } from 'antd'
import React, { FC, useState } from 'react'
import { Control } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {
  FormCheckbox,
  FormInput,
  FormRangeDate,
  FormSwitch,
  FormUpload,
} from '~/components'
import { RootState } from '~/store'

type TProps<T extends object = object> = {
  control: Control<T, object>
  data: T
}

export const ConfigurationGeneral: FC<TProps<TConfig1>> = ({
  control,
  data,
}) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )
  const [editChormeEx, setEditChormeEx] = useState(false)
  const [editCocCocEx, setEditCocCocEx] = useState(false)
  const [changeTimeWork, setChangeTimeWork] = useState(false)

  return (
    <React.Fragment>
      <div className='grid gap-4 sm:grid-cols-4 lg:grid-cols-3'>
        <div className='col-span-full text-xs' style={{ color: 'red' }}>
          * Lưu ý trước khi thay đổi!
        </div>
        <div className='grid gap-4 sm:col-span-2 lg:col-span-1'>
          <FormInput
            control={control}
            label='Tên website'
            placeholder='Tên website'
            name='WebsiteName'
            required={false}
          />
          <FormInput
            control={control}
            label='Tên công ty viết tắt'
            placeholder=''
            name='CompanyName'
            required={false}
            // rules={{ required: 'Không bỏ trống tên công ty viết tắt' }}
          />
          <FormInput
            control={control}
            label='Tên công ty ngắn'
            placeholder=''
            name='CompanyShortName'
            required={false}
            // rules={{ required: 'Không bỏ trống tên công ty ngắn' }}
          />
          <FormInput
            control={control}
            label='Tên công ty dài'
            placeholder=''
            name='CompanyLongName'
            required={false}
            // rules={{ required: 'Không bỏ trống tên công ty dài' }}
          />
          <FormInput
            control={control}
            label='Mã số thuế'
            placeholder=''
            name='TaxCode'
            required={false}
          />
          <FormInput
            control={control}
            label='Địa chỉ 1'
            name='Address'
            placeholder='Địa chỉ 1'
          />
          <FormInput
            control={control}
            label='Địa chỉ 2'
            name='Address2'
            placeholder='Địa chỉ 2'
            required={false}
          />
          <FormInput
            control={control}
            label='Địa chỉ 3'
            name='Address3'
            placeholder='Địa chỉ 3'
            required={false}
          />
        </div>

        <div className='grid h-fit gap-4 sm:col-span-2 lg:col-span-1'>
          <FormInput
            control={control}
            label='Email liên lạc'
            placeholder=''
            name='EmailContact'
            required={false}
            // rules={{ required: 'Không bỏ trống Email liên lạc' }}
          />
          <FormInput
            control={control}
            label='Email hỗ trợ'
            placeholder=''
            name='EmailSupport'
            required={false}
            // rules={{ required: 'không bỏ trống Email hỗ trợ' }}
          />
          <FormInput
            control={control}
            label='Hotline'
            placeholder=''
            name='Hotline'
            required={false}
            // rules={{ required: 'Không bỏ trống hotline' }}
          />
          <FormInput
            control={control}
            label='Hotline hỗ trợ'
            placeholder=''
            name='HotlineSupport'
            required={false}
            // rules={{ required: 'Không bỏ trống hotline hỗ trợ' }}
          />
          <FormInput
            control={control}
            label='Hotline phản hồi'
            placeholder=''
            name='HotlineFeedback'
            required={false}
            // rules={{ required: 'Không bỏ trống hotline phản hồi' }}
          />
          <div className=''>
            <div className='mr-4 flex flex-col items-baseline'>
              <div>
                Giờ hoạt động:{' '}
                <span className='ml-2 font-bold'>{data?.TimeWork}</span>
              </div>
              <Tooltip title='Thay đổi thời gian làm việc!'>
                <Switch
                  className='!mr-4'
                  onChange={() => setChangeTimeWork(!changeTimeWork)}
                />
              </Tooltip>
            </div>
            <div>
              {changeTimeWork && (
                <FormRangeDate
                  control={control}
                  label='Chọn giờ làm việc mới!'
                  placeholder={['Bắt đầu', 'Kết thúc']}
                  name='TimeWork'
                  required={false}
                  // rules={{ required: 'Chọn giờ hoạt động' }}
                />
              )}
            </div>
          </div>

          {[20, 22].includes(userCurrentInfo.Id) ? (
            <div>
              <FormCheckbox
                label='App đang chờ duyệt' // true: đã duyệt - false: chờ duyệt
                control={control}
                name='IsAppAccepted'
              />
              <div className='text-red'>Check TRUE nếu app ĐÃ DUYỆT</div>
            </div>
          ) : null}
        </div>

        <div className='col-span-full grid h-fit gap-4 lg:col-span-1'>
          <div className='col-span-1 mb-3 flex flex-col xs:flex-row'>
            <div className='mr-8'>
              <FormUpload
                control={control}
                name='LogoIMG'
                label='Logo'
                required={false}
              />
            </div>
            <div className='mr-8'>
              <FormUpload
                control={control}
                name='BannerIMG'
                label='Banner'
                required={false}
              />
            </div>
          </div>
          <FormInput
            onBlur={() => setEditChormeEx(!editChormeEx)}
            control={control}
            label='Đường đến công cụ (Chrome)'
            placeholder=''
            name='ChromeExtensionLink'
            // disabled={!editChormeEx}
            // rules={{ required: 'Không bỏ trống tên đường dẫn!' }}
          />
          <FormInput
            onBlur={() => setEditCocCocEx(!editCocCocEx)}
            control={control}
            label='Đường dẫn đến công cụ (Cốc cốc)'
            placeholder=''
            name='CocCocExtensionLink'
            // disabled={!editCocCocEx}
            // rules={{ required: 'Không bỏ trống tên đường dẫn!' }}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
