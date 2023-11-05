import { FC } from 'react'
import { useSelector } from 'react-redux'
import { FormSelect } from '~/components'
import { RootState } from '~/store'
import { TControl } from '~/types/field'

type TProps = TControl<TUserCreateOrder> & {
  warehouseTQCatalogue: TWarehouseTQCatalogue[]
  warehouseVNCatalogue: TWarehouseVNCatalogue[]
  shippingTypeToWarehouseCatalogue: TShippingTypeToWarehouse[]
  userList?: any
}
const infoContainer = 'col-span-2'

export const CreateOrderSelect: FC<TProps> = ({
  control,
  warehouseTQCatalogue,
  shippingTypeToWarehouseCatalogue,
  warehouseVNCatalogue,
  append,
  userList,
}) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo,
  )

  return (
    <>
      <div className='grid gap-2 xs:grid-cols-4'>
        {userList && (
          <div className={infoContainer}>
            <div className=''>
              <FormSelect
                data={userList}
                label='Username'
                control={control}
                name='UID'
                placeholder='Khách hàng'
                select={{ label: 'UserName', value: 'Id' }}
                rules={{ required: 'This field is required' }}
              />
            </div>
          </div>
        )}
        <div className={infoContainer}>
          <FormSelect
            data={shippingTypeToWarehouseCatalogue}
            control={control}
            name='ShippingType'
            label='Phương thức vận chuyển'
            placeholder='Phương thức'
            rules={{ required: 'This field is required' }}
            select={{ label: 'Name', value: 'Id' }}
            defaultValue={
              !userList && {
                Name: shippingTypeToWarehouseCatalogue?.find(
                  (x) => x.Id === userCurrentInfo?.ShippingType,
                )?.Name,
                Id: shippingTypeToWarehouseCatalogue?.find(
                  (x) => x.Id === userCurrentInfo?.ShippingType,
                )?.Id,
              }
            }
          />
        </div>
        <div className={infoContainer}>
          <FormSelect
            data={warehouseTQCatalogue}
            control={control}
            name='WarehouseTQ'
            label='Kho Trung Quốc'
            placeholder='Kho Trung Quốc'
            rules={{ required: 'This field is required' }}
            select={{ label: 'Name', value: 'Id' }}
            defaultValue={
              !userList && {
                Name: warehouseTQCatalogue?.find(
                  (x) => x.Id === userCurrentInfo?.WarehouseFrom,
                )?.Name,
                Id: warehouseTQCatalogue?.find(
                  (x) => x.Id === userCurrentInfo?.WarehouseFrom,
                )?.Id,
              }
            }
          />
        </div>
        <div className={infoContainer}>
          <FormSelect
            data={warehouseVNCatalogue}
            control={control}
            name='WarehouseVN'
            label='Kho đích'
            placeholder='Kho Việt Nam'
            rules={{ required: 'This field is required' }}
            select={{ label: 'Name', value: 'Id' }}
            defaultValue={
              !userList && {
                Name: warehouseVNCatalogue?.find(
                  (x) => x.Id === userCurrentInfo?.WarehouseTo,
                )?.Name,
                Id: warehouseVNCatalogue?.find(
                  (x) => x.Id === userCurrentInfo?.WarehouseTo,
                )?.Id,
              }
            }
          />
        </div>
      </div>
    </>
  )
}
