import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { authenticate, setToken, user as userAPI } from '~/api'
import { Button, FormInput } from '~/components'
import { showToast } from '~/components/toast'
import { config } from '~/configs'
import { setRouter, updateUser, useAppDispatch } from '~/store'
import { _format } from '~/utils'

const aLink =
  'cursor-pointer text-main hover:text-sec transition-all duration-300'

export const SignInForm = ({ handleOpen }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { handleSubmit, control, reset, resetField } = useForm<TLogin>({
    mode: 'onBlur',
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  useEffect(() => {
    reset({
      userName: '',
      password: '',
    })
  }, [])

  const [loading, setLoading] = useState(false)
  const [showP, setShowP] = useState(false)

  const _onPress = (data: TLogin) => {
    setLoading(true)
    authenticate
      .login(data)
      .then((res) => {
        const token = res.Data.token
        Cookie.set(config.tokenName, token)
        setToken(token)
        const user: TUser = JSON.parse(
          _format.getJWTDecode(token)[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'
          ],
        )
        userAPI
          .getByID(user?.UserId)
          .then((res) => {
            const newData: any = res?.Data
            dispatch(
              updateUser({
                ...newData,
                IsConfirmOTP: false,
                Roles: [],
                LastName: '',
                FirstName: '',
                Token: token,
              }),
            )
            setLoading(false)
            router.push('/user/')
            dispatch(setRouter(user.UserGroupId))
          })
          .catch(() => console.log('error to fetching user by id!'))
      })
      .catch(() => {
        resetField('password')
        showToast({
          title: '',
          message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
          type: 'error',
        })
        setLoading(false)
      })
  }

  return (
    <div className='authContainer'>
      <form onSubmit={handleSubmit(_onPress)}>
        <div className='col-span-2'>
          <FormInput
            disabled={loading}
            control={control}
            name='userName'
            homeType='login'
            label='Tài khoản'
            placeholder='Nhập tài khoản'
            rules={{
              required: 'Bạn chưa điền thông tin!',
            }}
            prefix={<i className='fas fa-user'></i>}
          />
        </div>
        <div className='col-span-2'>
          <FormInput
            disabled={loading}
            control={control}
            name='password'
            label='Mật khẩu'
            allowClear={false}
            prefix={<i className='fas fa-lock'></i>}
            suffix={
              <i
                onClick={() => setShowP(!showP)}
                className={!showP ? 'fas fa-eye-slash' : 'fas fa-eye'}
              ></i>
            }
            homeType='login'
            type={!showP ? 'password' : 'text'}
            placeholder='Nhập mật khẩu'
            rules={{
              required: 'Bạn chưa điền thông tin!',
            }}
          />
        </div>
        <div className='col-span-2'>
          <Button
            loading={loading}
            title='Đăng nhập'
            btnClass='w-full'
            htmlType='submit'
          />
        </div>
      </form>

      <div className='flex flex-col justify-between gap-4 py-4 xs:flex-row'>
        <span className={aLink} onClick={() => handleOpen('register')}>
          Đăng ký
        </span>
        <span className={aLink} onClick={() => handleOpen('forgetPass')}>
          Quên mật khẩu?
        </span>
      </div>
    </div>
  )
}
