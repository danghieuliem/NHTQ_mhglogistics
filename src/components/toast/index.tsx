import * as toastify from 'react-toastify'

const toastOptions: toastify.ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
}

export const showToast = ({ title, message, type }: TToast) => {
  toastify.toast[type](
    <div className='flex flex-col'>
      <span className='text-base font-semibold'>{title}</span>
      <span className='text-sm text-label'>{message}</span>
    </div>,
    toastOptions,
  )
}

const success = (props: string) => {
  return showToast({ title: 'Thành công', message: props, type: 'success' })
}

const info = (props: string) => {
  return showToast({ title: 'Thông tin', message: props, type: 'info' })
}

const warning = (props: string) => {
  return showToast({ title: 'Cảnh báo', message: props, type: 'warning' })
}

const error = (props: any) => {
  if (typeof props === 'string') {
    return showToast({ title: 'Lỗi', message: props, type: 'error' })
  } else if (props?.title && props?.message) {
    return showToast({ ...props, type: 'error' })
  } else {
    return showToast({
      title: (props as any)?.response?.data?.ResultCode,
      message: (props as any)?.response?.data?.ResultMessage,
      type: 'error',
    })
  }
}

export const toast = { error, success, info, warning }
