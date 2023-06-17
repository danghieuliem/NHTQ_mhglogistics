export const ordererRouter = [
  {
    group: "Danh sách đơn hàng",
    icon: "far fa-file-invoice-dollar",
    controllers: [
      {
        path: "javascript:;",
        name: "Đơn hàng",
        icon: "fas fa-cubes",
        childrens: [
          {
            key: "MainOrder",
            path: "/manager/order/order-list",
            name: "Đơn mua hộ",
          },
          {
            key: "MainOrderAnother",
            path: "/manager/order/order-list?q=3",
            name: "Đơn mua hộ khác",
          },
        ],
      },
    ],
  },
  // {
  //   group: "Lên đơn hộ",
  //   icon: "far fa-file-invoice-dollar",
  //   controllers: [
  //     {
  //       path: "javascript:;",
  //       name: "Lên đơn hộ",
  //       icon: "far fa-person-carry",
  //       childrens: [
  //         {
  //           path: "/manager/order/buy-for/create-order",
  //           name: "Tạo đơn mua hộ khác",
  //         },
  //         {
  //           path: "/manager/order/buy-for/create-deposit",
  //           name: "Tạo đơn ký gửi",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    group: "Thống kê tổng quan",
    icon: "far fa-computer-classic",
    controllers: [
      {
        path: "/manager/statistical/sales",
        name: "Doanh thu",
        icon: "fas fa-sack-dollar",
      },
    ],
  },
  {
    group: "Hoa hồng cá nhân",
    icon: "far fa-computer-classic",
    controllers: [
      {
        path: "/manager/employee/bonus-order",
        name: "Quản lý hoa hồng",
        icon: "fas fa-envelope-open-dollar",
      },
    ],
  },
];
