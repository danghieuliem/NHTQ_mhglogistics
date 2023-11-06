import { EParamQ } from '~/enums'

export const accountantRouter = [
  {
    Title: 'TÀI KHOẢN',
    Icon: 'fas fa-users',
    Children: [
      {
        Label: 'Danh sách khách hàng',
        Icon: 'fas fa-address-card',
        Path: '/manager/client/client-list/',
      },
      {
        Path: '/manager/employee/employee-management/',
        Label: 'Danh sách nhân viên',
        Icon: '',
      },
      {
        Label: 'Quản lý hoa hồng',
        Icon: 'fas fa-users-cog',
        Path: 'javascript:;',
        SubChildren: [
          {
            Path: '/manager/employee/bonus-order/',
            Label: 'HH mua hộ',
            Icon: 'fas fa-money-check-alt',
          },
          {
            Icon: '',
            Path: '/manager/employee/bonus-deposit/',
            Label: 'HH ký gửi',
          },
          {
            Icon: '',
            Path: '/manager/employee/bonus-payment/',
            Label: 'HH thanh toán hộ',
          },
        ],
      },
    ],
  },
  {
    Title: 'ĐƠN HÀNG',
    Icon: 'fas fa-box-full',
    Children: [
      {
        // key: "MainOrder",
        Path: '/manager/order/order-list/',
        Label: 'ĐH mua hộ',
        Icon: '',
      },
      {
        // key: "MainOrderAnother",
        Path: `/manager/order/order-list/?q=${EParamQ.otherOrder}`,
        Label: 'ĐH mua hộ khác',
        Icon: '',
      },
      {
        // key: "TransportationOrder",
        Path: '/manager/deposit/deposit-list/',
        Label: 'ĐH ký gửi',
        Icon: '',
      },
      {
        // key: "PayHelp",
        Icon: '',
        Path: '/manager/order/request-payment/',
        Label: 'ĐH thanh toán hộ',
      },
    ],
  },
  {
    Title: 'NGHIỆP VỤ KHO',
    Icon: 'fas fa-warehouse-alt',
    Children: [
      {
        Path: '/manager/money/out-stock-payment/',
        Icon: '',
        Label: 'Thanh toán xuất kho',
      },
    ],
  },
  {
    Title: 'NGHIỆP VỤ KẾ TOÁN',
    Icon: 'fas fa-funnel-dollar',
    Children: [
      {
        Label: 'Thống kê',
        Icon: 'fas fa-funnel-dollar',
        Path: 'javascript:;',
        SubChildren: [
          {
            Icon: '',
            Path: '/manager/statistical/sales/',
            Label: 'Doanh thu',
          },
          {
            Icon: '',
            Path: '/manager/statistical/purchase-profit/',
            Label: 'Lợi nhuận mua hộ',
          },
          {
            Icon: '',
            Path: '/manager/statistical/payment-profit',
            Label: 'Lợi nhuận thanh toán',
          },
          {
            Icon: '',
            Path: '/manager/statistical/recharge/',
            Label: 'Nạp - rút tiền',
          },
          {
            Icon: '',
            Path: '/manager/statistical/surplus/',
            Label: 'Số dư',
          },
          {
            Icon: '',
            Path: '/manager/statistical/transaction/',
            Label: 'Giao dịch',
          },
        ],
      },
      {
        Icon: 'fas fa-id-badge',
        Path: '/manager/money/personal-recharge/',
        Label: 'Nạp tiền cá nhân',
      },
      {
        Icon: 'fas fa-file-invoice-dollar',
        Path: '/manager/money/recharge-history/',
        Label: 'Yêu cầu nạp',
      },
      {
        Icon: 'fas fa-hand-holding-usd',
        Path: '/manager/money/withdrawal-history/',
        Label: 'Yêu cầu rút',
      },
    ],
  },
]
