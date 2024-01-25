import { EParamQ } from '~/enums'

export const userRouter = [
  {
    Title: 'TỔNG QUAN',
    Children: [
      {
        Label: 'Tổng quan',
        Icon: 'fas fa-th-large',
        Path: '/user/',
      },
    ],
  },
  {
    Title: 'GIỎ HÀNG',
    Children: [
      {
        Label: 'Giỏ hàng',
        Icon: 'fas fa-bags-shopping',
        Path: '/user/cart/',
      },
    ],
  },
  // {
  //   Title: 'TÌM SẢN PHẨM',
  //   Children: [
  //     {
  //       Label: 'Tìm sản phẩm',
  //       Icon: 'fas fa-search',
  //       Path: '/user/search-product/',
  //     },
  //   ],
  // },
  {
    Title: 'ĐƠN MUA HỘ',
    Children: [
      {
        Label: 'Đơn mua hộ',
        Icon: 'fas fa-envelope-open-text',
        Path: 'javascript:;',
        SubChildren: [
          {
            Label: 'Đơn mua hộ',
            Icon: 'fas fa-shopping-basket',
            Path: '/user/order-list/',
          },
          {
            Path: `/user/order-list/?q=${EParamQ.otherOrder}`,
            Label: 'Đơn mua hộ khác',
            Icon: '',
          },
          {
            Path: '/user/create-order/',
            Label: 'Tạo mua hộ khác',
            Icon: '',
          },
        ],
      },
    ],
  },
  {
    Title: 'ĐƠN KÝ GỬI',
    Children: [
      {
        Label: 'Ký gửi',
        Icon: 'fas fa-envelope-open-text',
        Path: 'javascript:;',
        SubChildren: [
          {
            Path: '/user/deposit-list/',
            Label: 'Danh sách ký gửi',
          },
          {
            Path: '/user/create-deposit/',
            Label: 'Tạo đơn ký gửi',
          },
        ],
      },
    ],
  },
  {
    Title: 'THANH TOÁN HỘ',
    Children: [
      {
        Label: 'Thanh toán hộ',
        Icon: 'fas fa-envelope-open-text',
        Path: 'javascript:;',
        SubChildren: [
          {
            Path: '/user/request-list/',
            Label: 'Danh sách',
          },
          {
            Path: '/user/create-request-payment/',
            Label: 'Tạo thanh toán hộ',
          },
        ],
      },
    ],
  },
  {
    Title: 'TÀI CHÍNH',
    Children: [
      {
        Label: 'Tài chính',
        Icon: 'fas fa-envelope-open-text',
        Path: 'javascript:;',
        SubChildren: [
          {
            Path: '/user/history-transaction-vnd/',
            Label: 'Lịch sử giao dịch',
          },
          {
            Path: '/user/recharge-vnd/',
            Label: 'Tạo yêu cầu nạp',
          },
          {
            Path: '/user/withdrawal-vnd/',
            Label: 'Tạo yêu cầu rút',
          },
        ],
      },
    ],
  },
  {
    Title: 'KIỂM TRA',
    Children: [
      {
        Label: 'Kiểm tra',
        Icon: 'fas fa-edit',
        Path: 'javascript:;',
        SubChildren: [
          {
            Path: '/user/tracking/',
            Label: 'Tracking',
          },
          {
            Path: '/user/report/',
            Label: 'Khiếu nại',
          },
          {
            Label: 'Quản lý kiện',
            Path: '/user/transaction-code-management/',
          },
        ],
      },
    ],
  },
]
