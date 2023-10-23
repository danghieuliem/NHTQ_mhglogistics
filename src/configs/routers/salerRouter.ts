import { EParamQ } from "~/enums";

export const salerRouter = [
  {
    Title: "TÀI KHOẢN",
    Icon: "fas fa-users",
    Children: [
      {
        Label: "Danh sách khách hàng",
        Icon: "fas fa-address-card",
        Path: "/manager/client/client-list/",
      },
      {
        Label: "Quản lý hoa hồng",
        Icon: "fas fa-users-cog",
        Path: "javascript:;",
        SubChildren: [
          {
            Path: "/manager/employee/bonus-order/",
            Label: "HH mua hộ",
            Icon: "fas fa-money-check-alt",
          },
          {
            Icon: "",
            Path: "/manager/employee/bonus-deposit/",
            Label: "HH ký gửi",
          },
          {
            Icon: "",
            Path: "/manager/employee/bonus-payment/",
            Label: "HH thanh toán hộ",
          },
        ],
      },
    ],
  },
  {
    Title: "ĐƠN HÀNG",
    Icon: "fas fa-box-full",
    Children: [
      {
        Label: "Đơn hàng",
        Icon: "fas fa-box-full",
        Path: "javascript:;",
        SubChildren: [
          {
            // key: "MainOrder",
            Path: "/manager/order/order-list/",
            Label: "ĐH mua hộ",
            Icon: "",
          },
          {
            // key: "MainOrderAnother",
            Path: `/manager/order/order-list/?q=${EParamQ.otherOrder}`,
            Label: "ĐH mua hộ khác",
            Icon: "",
          },
          {
            // key: "TransportationOrder",
            Path: "/manager/deposit/deposit-list/",
            Label: "ĐH ký gửi",
            Icon: "",
          },
          {
            // key: "PayHelp",
            Icon: "",
            Path: "/manager/order/request-payment/",
            Label: "ĐH thanh toán hộ",
          },
        ],
      },
      {
        Icon: "",
        Path: "/manager/order/buy-for/create-order/",
        Label: "Tạo đơn mua hộ khác",
      },
      {
        Icon: "",
        Path: "/manager/order/buy-for/create-deposit/",
        Label: "Tạo đơn ký gửi",
      },
    ],
  },
  {
    Title: "NGHIỆP VỤ KẾ TOÁN",
    Icon: "fas fa-funnel-dollar",
    Children: [
      {
        Icon: "",
        Path: "/manager/statistical/sales/",
        Label: "Doanh thu",
      },
    ],
  },
];
