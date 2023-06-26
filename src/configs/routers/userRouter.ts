export const userRouter = [
  {
    path: "/user/",
    name: "Tổng quan",
    icon: "fas fa-home-alt",
    childrens: [
      {
        name: "Tổng quan",
        path: "/user/",
      },
    ],
  },
  {
    path: "/user/cart/",
    name: "Giỏ hàng",
    icon: "fas fa-bags-shopping",
    childrens: [
      {
        path: "/user/cart/",
        name: "Giỏ hàng",
      },
    ],
  },
  {
    path: "javascript:;",
    icon: "fas fa-shopping-basket",
    name: "Đơn hàng",
    childrens: [
      {
        path: "/user/order-list/",
        name: "Đơn mua hộ",
      },
      {
        path: "/user/order-list/?q=3",
        name: "Đơn mua hộ khác",
      },
      {
        path: "/user/create-order/",
        name: "Tạo mua hộ khác",
      },
    ],
  },
  {
    path: "javascript:;",
    icon: "far fa-envelope-open-text",
    name: "Ký gửi",
    childrens: [
      {
        path: "/user/deposit-list/",
        name: "Danh sách ký gửi",
      },
      {
        path: "/user/create-deposit/",
        name: "Tạo đơn ký gửi",
      },
    ],
  },
  {
    path: "javascript:;",
    icon: "far fa-credit-card",
    name: "Thanh toán hộ",
    childrens: [
      {
        path: "/user/request-list/",
        name: "Danh sách",
      },
      {
        path: "/user/create-request-payment/",
        name: "Tạo thanh toán hộ",
      },
    ],
  },
  {
    path: "javascript:;",
    icon: "far fa-sack-dollar",
    name: "Tài chính",
    childrens: [
      {
        path: "/user/history-transaction-vnd/",
        name: "Lịch sử giao dịch",
      },
      {
        path: "/user/recharge-vnd/",
        name: "Tạo yêu cầu nạp",
      },
      {
        path: "/user/withdrawal-vnd/",
        name: "Tạo yêu cầu rút",
      },
    ],
  },
  {
    path: "javascript:;",
    icon: "fas fa-edit",
    name: "Kiểm tra",
    childrens: [
      {
        path: "/user/tracking/",
        name: "Tracking",
      },
      {
        path: "/user/report/",
        name: "Khiếu nại",
      },
      {
        path: "/user/transaction-code-management/",
        name: "Quản lý mã vận đơn",
      },
    ],
  },
];
