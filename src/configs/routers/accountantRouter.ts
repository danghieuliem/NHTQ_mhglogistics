export const accountantRouter = [
  {
    path: "javascript:;",
    name: "Khách - nhân sự",
    icon: "fas fa-users",
    childrens: [
      {
        path: "/manager/employee/employee-management/",
        name: "Danh sách nhân viên",
      },
      {
        path: "/manager/client/client-list/",
        name: "Danh sách khách hàng",
      },
    ],
  },
  {
    path: "javascript:;",
    name: "Đơn hàng",
    icon: "fas fa-cubes",
    childrens: [
      {
        key: "MainOrder",
        path: "/manager/order/order-list/",
        name: "Đơn mua hộ",
      },
      {
        key: "MainOrderAnother",
        path: "/manager/order/order-list?q=3",
        name: "Đơn mua hộ khác",
      },
      {
        key: "TransportationOrder",
        path: "/manager/deposit/deposit-list/",
        name: "Đơn ký gửi",
      },
      {
        key: "PayHelp",
        path: "/manager/order/request-payment/",
        name: "Đơn thanh toán hộ",
      },
    ],
  },
  {
    path: "javascript:;",
    name: "Nạp rút - tiền",
    icon: "fas fa-hands-usd",
    childrens: [
      {
        path: "/manager/money/personal-recharge/",
        name: "Nạp tiền cá nhân",
      },
      {
        path: "/manager/money/recharge-history/",
        name: "Yêu cầu nạp",
      },
      {
        path: "/manager/money/withdrawal-history/",
        name: "Yêu cầu rút",
      },
    ],
  },
  {
    path: "javascript:;",
    name: "Thống kê tổng quan",
    icon: "fas fa-chart-bar",
    childrens: [
      {
        path: "/manager/statistical/sales/",
        name: "Doanh thu",
      },
      {
        path: "/manager/statistical/purchase-profit/",
        name: "Lợi nhuận mua hộ",
      },
      {
        path: "/manager/statistical/payment-profit",
        name: "Lợi nhuận thanh toán",
      },
      {
        path: "/manager/statistical/recharge/",
        name: "Nạp - rút tiền",
      },
      {
        path: "/manager/statistical/surplus/",
        name: "Số dư",
      },
      {
        path: "/manager/statistical/transaction/",
        name: "Giao dịch",
      },
    ],
  },
  {
    path: "javascript:;",
    name: "Quản lý hoa hồng",
    icon: "fas fa-envelope-open-dollar",
    childrens: [
      {
        path: "/manager/employee/bonus-order/",
        name: "Hoa hồng mua hộ",
      },
      {
        path: "/manager/employee/bonus-deposit/",
        name: "Hoa hồng ký gửi",
      },
      {
        path: "/manager/employee/bonus-payment",
        name: "Hoa hồng thanh toán hộ",
      },
      // {
      // 	path: "manager/employee/decentralization-management",
      // 	name: "Quản lý phân quyền",
      // },
    ],
  },
  {
    path: "/manager/money/out-stock-payment/",
    name: "Thanh toán xuất kho",
    icon: "fad fa-abacus",
    childrens: [
      {
        path: "/manager/money/out-stock-payment/",
        name: "Thanh toán xuất kho",
      },
    ],
  },
];
