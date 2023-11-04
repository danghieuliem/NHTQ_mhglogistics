import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { FC, useRef } from 'react'
import { ActionButton, FilterInput, FilterSelect } from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'

type TProps = {
  handleFilter: (newFilter: {}) => void
  userGroupCatalogue: TUserGroupCatalogue[]
  handleAddStaff: () => void
  onExportExcel?: () => void
}

const EmployeeManagementFilter: FC<TProps> = ({
  handleFilter,
  handleAddStaff,
  userGroupCatalogue,
  onExportExcel,
}) => {
  const router = useRouter()
  const UserName = useRef('')
  const UserGroupId = useRef<number | null>(null)

  return (
    <>
      <div className='grid gap-4 md:grid-cols-5'>
        {!router.asPath.includes('admin-management') ? (
          <>
            <FilterInput
              {...{
                id: 'username',
                name: 'username',
                placeholder: 'UserName',
                handleSearch: (val: string) => (UserName.current = val.trim()),
              }}
            />
            <FilterSelect
              data={userGroupCatalogue?.filter(
                (x) => x.Code !== 'USER' && x.Code !== 'STOREKEEPERS',
              )}
              placeholder='Quyền hạn'
              isClearable
              select={{ value: 'Id', label: 'Description' }}
              handleSearch={(val: number) => {
                UserGroupId.current = val
              }}
            />
          </>
        ) : (
          <div className='col-span-1 mb-0'>
            <FilterInput
              {...{
                id: 'username',
                name: 'username',
                placeholder: 'UserName',
                handleSubmit: (val) => {
                  handleFilter({
                    UserName: val,
                    UserGroupId: 1,
                    PageIndex: 1,
                  })
                },
                allowClear: false,
              }}
            />
          </div>
        )}

        <div
          className={clsx(
            'col-span-full flex items-end',
            router.asPath.includes('admin-management')
              ? 'justify-end md:col-span-4'
              : 'justify-between md:col-span-3',
          )}
        >
          {!router.asPath.includes('admin-management') && (
            <IconButton
              onClick={() =>
                handleFilter({
                  UserName: UserName.current,
                  UserGroupId: UserGroupId.current,
                  PageIndex: 1,
                })
              }
              title='Lọc'
              icon='fas fa-filter'
              showLoading
              btnClass='!mr-4'
              toolip='Lọc'
            />
          )}
          <div className='flex items-center gap-2'>
            <ActionButton
              onClick={handleAddStaff}
              title='Thêm'
              icon='fas fa-plus-circle'
              isButton
              isButtonClassName='bg-green !text-white'
            />
            <ActionButton
              onClick={onExportExcel}
              title='Xuất'
              icon='fas fa-file-export'
              isButton
              isButtonClassName='bg-blue !text-white'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const EmployeeManagementFilterMemo = React.memo(EmployeeManagementFilter)
