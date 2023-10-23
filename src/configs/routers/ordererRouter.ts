import { EParamQ } from "~/enums";

export const ordererRouter = [
  {
    Title: "ĐƠN HÀNG",
    Icon: "fas fa-box-full",
    Children: [
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
        Path: "/manager/employee/bonus-order/",
        Label: "Hoa hồng",
        Icon: "fas fa-money-check-alt",
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
