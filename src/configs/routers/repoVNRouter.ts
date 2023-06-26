export const repoVNRouter = [
  {
    path: "javascript:;",
    name: "Quản lý kho",
    icon: "fas fa-warehouse-alt",
    childrens: [
      {
        path: "/manager/warehouse/check-warehouse-vietnam/",
        name: "Kiểm hàng kho VN",
      },
      {
        path: "/manager/money/out-stock-payment/",
        name: "Thanh toán xuất kho",
      },
    ],
  },
  {
    path: "/manager/warehouse/out-stock/",
    name: "Xuất kho",
    icon: "fas fa-file-export",
    childrens: [
      {
        path: "/manager/warehouse/out-stock/",
        name: "Xuất kho",
        icon: "fas fa-file-export",
      },
    ],
  },
  {
    path: "/manager/warehouse/package-management/",
    name: "Bao hàng",
    icon: "far fa-box-full",
    childrens: [
      {
        path: "/manager/warehouse/package-management/",
        name: "Bao hàng",
      },
    ],
  },
  {
    path: "/manager/warehouse/transaction-code-management/",
    name: "Mã vận đơn",
    icon: "fas fa-barcode-scan",
    childrens: [
      {
        path: "/manager/warehouse/transaction-code-management/",
        name: "Mã vận đơn",
      },
    ],
  },
  {
    path: "/manager/warehouse/floating-package/",
    name: "Kiện trôi nổi",
    icon: "fas fa-truck-loading",
    childrens: [
      {
        path: "/manager/warehouse/floating-package/",
        name: "Kiện trôi nổi",
      },
    ],
  },
];
