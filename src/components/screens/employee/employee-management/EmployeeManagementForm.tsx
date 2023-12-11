import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { user } from '~/api'
import {
  Button,
  FormCard,
  FormDate,
  FormInput,
  FormSelect,
  Modal,
} from '~/components'
import {
  EActiveData,
  EGenderData,
  activeData,
  genderData,
} from '~/configs/appConfigs'
import { TForm } from '~/types/table'
import { _format } from '~/utils'
import { EUnique, checkUnique, createComplain } from '../../auth/method'

type TProps = TForm<TEmployee> & {
  userLevelCatalogue: TUserLevelCatalogue[]
  userGroupCatalogue: TUserGroupCatalogue[]
  userSaleCatalogue: TUserCatalogue[]
  userOrderCatalogue: TUserCatalogue[]
}

const EmployeeManagementForm: FC<TProps> = ({
  onCancel,
  visible,
  userLevelCatalogue,
  userGroupCatalogue,
  userOrderCatalogue,
  userSaleCatalogue,
}) => {
  const router = useRouter()
  const { handleSubmit, setValue, watch, reset, control } = useForm<
    TEmployee & { UserGroupId: number }
  >({
    mode: 'onBlur',
    defaultValues: { Gender: 0 },
  })
  const password = watch('Password')
  const [isDisableBtnCreate, setIsDisableBtnCreate] = useState<boolean>(false)

  React.useEffect(() => {
    if (visible) {
      reset({
        Gender: EGenderData.FEMALE,
        LevelId: userLevelCatalogue?.[0]?.Id,
        UserGroupId: router.asPath.includes('admin-management') && 1,
        Status: EActiveData.Actived,
        IsAdmin: false,
        DatHangId: 0,
        SaleId: 0,
        Deposit: 0,
        FeeTQVNPerWeight: 0,
        FeeBuyPro: 0,
        Currency: 0,
        IsLocked: false,
      })
    }
  }, [visible])

  const queryClient = useQueryClient()

  const _onPress = async (data: TEmployee) => {
    onCancel()
    const id = toast.loading('Đang xử lý ...')
    return user
      .create(data)
      .then((res) => {
        queryClient.invalidateQueries('employeeData')
        toast.update(id, {
          render: 'Thêm nhân viên thành công',
          type: 'success',
          autoClose: 500,
          isLoading: false,
        })
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          type: 'error',
          autoClose: 2000,
          isLoading: false,
        })
      })
  }

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Thêm nhân viên</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='col-span-1 grid h-fit grid-cols-1 gap-2'>
              <div className='col-span-1'>
                <FormInput
                  control={control}
                  name='FullName'
                  label='Họ và tên'
                  placeholder='Họ và tên'
                  rules={{ required: 'This field is required' }}
                />
              </div>
              <div className='col-span-1'>
                <FormInput
                  control={control}
                  name='Phone'
                  label='Số điện thoại'
                  placeholder='Số điện thoại'
                  rules={{
                    required: 'Vui lòng điền số điện thoại..',
                    minLength: {
                      value: 10,
                      message: 'Số điện thoại tối thiểu 10 số!',
                    },
                    pattern: {
                      value:
                        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                      message: 'Sđt không đúng định dạng',
                    },
                    validate: {
                      check: (value) => {
                        return checkUnique(value.trim(), EUnique.phone)
                      },
                    },
                  }}
                />
              </div>
              <div className='col-span-1'>
                <FormDate
                  control={control}
                  name='Birthday'
                  label='Ngày sinh'
                  placeholder='Ngày sinh'
                  rules={{ required: 'This field is required' }}
                />
              </div>
              <div className='col-span-1'>
                <FormSelect
                  control={control}
                  label='Giới Tính'
                  placeholder='Giới tính'
                  name='Gender'
                  data={genderData}
                  select={{ label: 'Name', value: 'Id' }}
                  required={false}
                />
              </div>
            </div>

            <div className='col-span-1 grid h-fit grid-cols-1 gap-2'>
              <div className='col-span-1'>
                <FormInput
                  control={control}
                  name='UserName'
                  label='Tên đăng nhập / Nick name'
                  placeholder='Username'
                  rules={{
                    required: 'Vui lòng điền thông tin đăng nhập',
                    minLength: {
                      value: 6,
                      message: 'username phải ít nhất 6 kí tự',
                    },
                    maxLength: {
                      value: 30,
                      message: 'username phải ít hơn 30 kí tự',
                    },
                    validate: {
                      check: (value) => {
                        const check = _format.checkUserNameVNese(value.trim())
                        if (value.trim().includes(' ')) {
                          return 'username chứa khoảng trắng giữa 2 chữ!'
                        }
                        if (check) {
                          return 'Username không được chứa Tiếng Việt'
                        }
                        return checkUnique(value.trim(), EUnique.username)
                      },
                    },
                  }}
                />
              </div>
              <div className='col-span-1'>
                <FormInput
                  control={control}
                  name='Email'
                  label='Email'
                  placeholder='example@gmail.com'
                  rules={{
                    required: 'Vui lòng điền email.',
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: 'email không đúng định dạng',
                    },
                    validate: {
                      check: (value) => {
                        return checkUnique(value.trim(), EUnique.email)
                      },
                    },
                  }}
                />
              </div>
              <div className='col-span-1'>
                <FormInput
                  control={control}
                  name='Password'
                  label='Mật khẩu'
                  placeholder='Mật khẩu'
                  type='password'
                  rules={{
                    required: 'Vui lòng điền email.',
                    minLength: {
                      value: 8,
                      message: 'Mật khẩu ít nhất 8 kí tự',
                    },
                    validate: {
                      check: (value) => {
                        const check = _format.checkUserNameVNese(value.trim())

                        if (value.trim() === '') {
                          return 'Vui lòng điền mật khẩu'
                        }

                        if (value.trim().includes(' ')) {
                          return 'Mật khẩu không chứa khoảng trắng giữa 2 chữ!'
                        }
                        if (check) {
                          return 'Mật khẩu không được chứa Tiếng Việt'
                        }
                      },
                    },
                  }}
                />
              </div>
              <div className='col-span-1'>
                <FormInput
                  control={control}
                  name='ConfirmPassWord'
                  label='Nhập lại mật khẩu'
                  type='password'
                  placeholder='Nhập lại mật khẩu'
                  rules={{
                    required: 'Vui lòng xác nhận mật khẩu..',
                    validate: {
                      checkEqualPassword: (value) => {
                        const check = _format.checkUserNameVNese(value.trim())

                        if (value.trim() === '') {
                          return 'Vui lòng điền mật khẩu'
                        }

                        if (value.trim().includes(' ')) {
                          return 'Mật khẩu không chứa khoảng trắng giữa 2 chữ!'
                        }
                        if (check) {
                          return 'Mật khẩu không được chứa Tiếng Việt'
                        }
                        return password === value.trim() || createComplain()
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className='col-span-1 grid h-fit grid-cols-1 gap-2'>
              <div className='col-span-1'>
                <FormSelect
                  control={control}
                  name='SaleId'
                  label='Nhân viên kinh doanh'
                  data={userSaleCatalogue}
                  select={{ label: 'FullName', value: 'Id' }}
                  defaultValue={{
                    FullName: 'Chọn nhân viên kinh doanh',
                    Id: 0,
                  }}
                  placeholder=''
                  required={false}
                  menuPlacement='bottom'
                />
              </div>
              <div className='col-span-1'>
                <FormSelect
                  control={control}
                  name='DatHangId'
                  data={userOrderCatalogue}
                  select={{ label: 'FullName', value: 'Id' }}
                  label='Nhân viên đặt hàng'
                  defaultValue={{ FullName: 'Chọn nhân viên đặt hàng', Id: 0 }}
                  placeholder=''
                  required={false}
                  menuPlacement='bottom'
                />
              </div>
              {!router.asPath.includes('admin-management') && (
                <div className='col-span-1'>
                  <FormSelect
                    control={control}
                    name='UserGroupId'
                    data={
                      router.asPath.includes('admin-management')
                        ? userGroupCatalogue?.filter((x) => x.Id === 1)
                        : userGroupCatalogue?.filter(
                            (x) => x.Id !== 1 && x.Id !== 2,
                          )
                    }
                    select={{ label: 'Description', value: 'Id' }}
                    label='Quyền hạn'
                    placeholder='Quyền hạn nhân viên'
                    rules={{
                      required: 'Vui lòng chọn quyền hạn',
                    }}
                    menuPlacement='bottom'
                    disabled={router.asPath.includes('admin-management')}
                  />
                </div>
              )}
              <div className='col-span-1'>
                <FormSelect
                  control={control}
                  name='LevelId'
                  data={userLevelCatalogue}
                  defaultValue={userLevelCatalogue?.[0]}
                  select={{ label: 'Name', value: 'Id' }}
                  label='Level'
                  placeholder=''
                  menuPlacement='bottom'
                  required={false}
                />
              </div>
              <div className='col-span-1'>
                <FormSelect
                  control={control}
                  name='Status'
                  data={activeData.slice(1)}
                  label='Trạng thái tài khoản'
                  placeholder=''
                  menuPlacement='bottom'
                  defaultValue={activeData[1]}
                  rules={{ required: 'Vui lòng chọn thông tin!' }}
                  required={false}
                  callback={() =>
                    setValue(
                      'IsLocked',
                      watch('Status') === EActiveData.Blocked ? true : false,
                    )
                  }
                />
              </div>
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title='Thêm mới'
            btnClass='!bg-main mr-2'
            disabled={isDisableBtnCreate}
            onClick={
              isDisableBtnCreate
                ? null
                : () => {
                    setIsDisableBtnCreate(true)
                    handleSubmit(_onPress)().finally(() => {
                      setIsDisableBtnCreate(false)
                    })
                  }
            }
          />
          <Button title='Hủy' btnClass='!bg-red' onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}

export const EmployeeManagementFormMemo = React.memo(EmployeeManagementForm)
