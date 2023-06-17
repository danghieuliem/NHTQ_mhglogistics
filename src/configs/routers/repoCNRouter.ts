export const repoCNRouter = [
  {
    group: "Kiểm kho Trung Quốc",
    controllers: [
      {
        path: "/manager/warehouse/check-warehouse-china",
        name: "Kiểm kho Trung Quốc",
        icon: "fas fa-warehouse-alt",
      },
    ],
  },
  {
    group: "Import mã vận đơn",
    controllers: [
      {
        path: "/manager/warehouse/import",
        name: "Import mã vận đơn",
        icon: "fas fa-upload",
      },
    ],
  },
  {
    group: "Quản lý bao hàng",
    controllers: [
      {
        path: "/manager/warehouse/package-management",
        name: "Bao hàng",
        icon: "far fa-box-full",
      },
    ],
  },
  {
    group: "Quản lý mã vận đơn",
    controllers: [
      {
        path: "/manager/warehouse/transaction-code-management",
        name: "Mã vận đơn",
        icon: "fas fa-barcode-scan",
      },
    ],
  },
  {
    group: "Quản lý kiện trôi nổi",
    controllers: [
      {
        path: "/manager/warehouse/floating-package",
        name: "Quản lý kiện trôi nổi",
        icon: "fas fa-truck-loading",
      },
    ],
  },
];
