export const repoCNRouter = [
  {
    path: "/manager/warehouse/check-warehouse-china/",
    name: "Kiểm kho Trung Quốc",
    icon: "fas fa-warehouse-alt",
    childrens: [
      {
        path: "/manager/warehouse/check-warehouse-china/",
        name: "Kiểm kho Trung Quốc",
      },
    ],
  },
  {
    name: "Import mã vận đơn",
    path: "/manager/warehouse/import/",
    icon: "fas fa-upload",
    childrens: [
      {
        path: "/manager/warehouse/import/",
        name: "Import mã vận đơn",
      },
    ],
  },
  {
    name: "Quản lý bao hàng",
    path: "/manager/warehouse/package-management/",
    icon: "far fa-box-full",
    childrens: [
      {
        path: "/manager/warehouse/package-management/",
        name: "Bao hàng",
      },
    ],
  },
  {
    name: "Quản lý mã vận đơn",
    path: "/manager/warehouse/transaction-code-management/",
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
    name: "Quản lý kiện trôi nổi",
    icon: "fas fa-truck-loading",
    childrens: [
      {
        path: "/manager/warehouse/floating-package/",
        name: "Quản lý kiện trôi nổi",
      },
    ],
  },
];
