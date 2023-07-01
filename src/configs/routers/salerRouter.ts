export const salerRouter = [
  {
    name: "Nhân viên - khách hàng",
    path: "/manager/client/client-list/",
    icon: "fas fa-users",
    childrens: [
      {
        path: "/manager/client/client-list/",
        name: "Danh sách khách hàng",
      },
    ],
  },
  {
    name: "Danh sách đơn hàng",
    path: "javascript:;",
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
    name: "Lên đơn hộ",
    icon: "far fa-person-carry",
    childrens: [
      {
        path: "/manager/order/buy-for/create-order/",
        name: "Tạo đơn mua hộ khác",
      },
      {
        path: "/manager/order/buy-for/create-deposit/",
        name: "Tạo đơn ký gửi",
      },
    ],
  },
  {
    path: "/manager/statistical/sales/",
    name: "Doanh thu",
    icon: "fas fa-sack-dollar",
    childrens: [
      {
        path: "/manager/statistical/sales/",
        name: "Doanh thu",
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
        path: "/manager/employee/bonus-payment/",
        name: "Hoa hồng thanh toán hộ",
      },
    ],
  },
];
