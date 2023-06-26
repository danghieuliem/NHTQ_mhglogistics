export const ordererRouter = [
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
    ],
  },
  {
    name: "Thống kê",
    path: "/manager/statistical/sales/",
    icon: "fas fa-sack-dollar",
    childrens: [
      {
        path: "/manager/statistical/sales/",
        name: "Doanh thu",
      },
    ],
  },
  {
    name: "Hoa hồng cá nhân",
    icon: "far fa-computer-classic",
    path: "/manager/employee/bonus-order/",
    childrens: [
      {
        path: "/manager/employee/bonus-order/",
        name: "Quản lý hoa hồng",
      },
    ],
  },
];
