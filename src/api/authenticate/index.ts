import FormData from 'form-data'
import BaseAPI from '../methods'

const { put, get, post } = new BaseAPI('authenticate')

export const authenticate = {
  getKey: (params: { Key: string }) => {
    let frmData = new FormData()
    frmData.append('Key', params.Key)
    return post('/demon-get', frmData)
  },

  loginDemon: (params: { Key: string; ID: number }) => {
    let frmData = new FormData()
    frmData.append('Key', params.Key)
    frmData.append('ID', params.ID)
    return post('/demon-login', frmData)
  },

  login: (params: TLogin) => {
    let frmData = new FormData()
    frmData.append('UserName', params.userName)
    frmData.append('Password', params.password)
    return post<{ token: string; addCartToken: string }>('/login', frmData)
  },

  sendOTPByPhone: (params: { phoneNumber: string; otpValue: string }) =>
    post(
      `/send-otp-forget-password/${params.phoneNumber}/${params.otpValue}`,
      undefined,
      { params },
    ),

  sendOTPEmailForgetPassword: (params: { email: string; otpValue: string }) =>
    post(
      `/send-otp-email-forget-password/${params.email}/${params.otpValue}`,
      undefined,
      { params },
    ),

  getOTPCode: (params: { phoneNumber: string }) =>
    get(`/get-otp-code/${params.phoneNumber}`, { params }),

  getOTPCodeEmail: (params: { email: string }) =>
    get(`/get-otp-code-email/${params.email}`, { params }),

  register: (data: TUserRegister) => post('/register', data),

  logout: () => post('/logout'),

  changePassword: (
    userId: number,
    data: {
      oldPassword: string
      newPassword: string
      confirmNewPassword: string
    },
  ) => put(`/changePassword/${userId}`, data),

  forgotPassword: async (data: { Email: string }) =>
    await put(`/forgot-password`, { ...data }),

  checkCanUseThisName: async (params: { name: string; type: 1 | 2 | 3 }) =>
    await get<boolean>('/check-validate', { params }),
}
