export enum EParamQ {
  order = '',
  otherOrder = '3',
}

/**
 * Loại thanh toán
 * 1: Đặt cọc.
 * 2: Thanh toán.
 */
export enum EPaymentType {
  deposit = 1,
  pay = 2,
}

/**
 * Hình thức thanh toán
 * 1: Trực tiếp.
 * 2: Ví điện tử.
 */
export enum EPaymentMethod {
  cash = 1,
  card = 2,
}
