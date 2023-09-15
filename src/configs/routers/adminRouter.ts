export const adminRouter = [
  {
    Title: "TỔNG QUAN",
    Icon: "fas fa-th-large",
    Children: [
      {
        Label: "Trang điều khiển",
        Icon: "fas fa-th-large",
        Path: "/dashboard/",
      },
      {
        Label: "Cài đặt",
        Icon: "fas fa-cogs",
        Path: "javascript:;",
        SubChildren: [
          {
            Path: "/manager/settings/configuration/",
            Label: "Hệ thống",
          },
          {
            Path: "/manager/settings/tariff-user/",
            Label: "Phí người dùng",
          },
          {
            Path: "/manager/settings/tariff-buy-pro/",
            Label: "Phí dịch vụ mua hàng",
          },
          {
            Path: "/manager/settings/tariff-china-vietnam/",
            Label: "Phí vận chuyển",
          },
          {
            Path: "/manager/settings/tariff-goods-checking/",
            Label: "Phí kiểm hàng",
          },
          {
            Path: "/manager/settings/tariff-price-change/",
            Label: "Phí thanh toán hộ",
          },
          {
            Path: "/manager/settings/volume/",
            Label: "Phí thể tích",
          },
          {
            Path: "/manager/settings/warehouse/",
            Label: "Kho vận chuyển",
          },
          {
            Path: "/manager/settings/banks/",
            Label: "Danh sách ngân hàng",
          },
          {
            Path: "/manager/settings/notifications/",
            Label: "Thông báo",
          },
          // {
          // 	Path: "manager/employee/decentralization-management",
          // 	name: "Quản lý phân quyền",
          // },
        ],
      },
    ],
  },
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
        Path: "/manager/employee/admin-management/",
        Label: "Danh sách admin",
        Icon: "",
      },
      {
        Path: "/manager/employee/employee-management/",
        Label: "Danh sách nhân viên",
        Icon: "",
      },
      {
        Path: "/manager/client/contact/",
        Label: "Danh sách liên hệ",
        Icon: "",
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
      // {
      //   Label: "Admin duyệt khiếu nại",
      //   Icon: "fas fa-exclamation-triangle",
      //   Path: "/manager/order/complain-list-admin/",
      // },
      {
        Label: "Đơn hàng",
        Icon: "fas fa-box-full",
        Path: "javascript:;",
        SubChildren: [
          {
            Key: "MainOrder",
            Path: "/manager/order/order-list/",
            Label: "ĐH mua hộ",
            Icon: "",
            Value: 0,
          },
          {
            Key: "MainOrderAnother",
            Path: "/manager/order/order-list/?q=3",
            Label: "ĐH mua hộ khác",
            Icon: "",
            Value: 0,
          },
          {
            Key: "TransportationOrder",
            Path: "/manager/deposit/deposit-list/",
            Label: "ĐH ký gửi",
            Icon: "",
            Value: 0,
          },
          {
            Key: "PayHelp",
            Icon: "",
            Value: 0,
            Path: "/manager/order/request-payment/",
            Label: "ĐH thanh toán hộ",
          },
          // {
          //   Path: "/manager/order-payment/",
          //   Label: "Phiếu yc thanh toán",
          // },
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
      {
        Label: "Xử lý khiếu nại",
        Icon: "fas fa-exclamation",
        Path: "/manager/order/complain-list/",
      },
    ],
  },
  {
    Title: "NGHIỆP VỤ KHO",
    Icon: "fas fa-warehouse-alt",
    Children: [
      {
        Path: "/manager/warehouse/add-package-customer/",
        Icon: "fas fa-hand-holding-medical",
        Label: "Gán kiện ký gửi",
      },
      {
        Path: "/manager/tracking",
        Icon: "fas fa-search",
        Label: "Tracking",
      },
      // {
      //   Label: "Mã vận đơn",
      //   Icon: "fas fa-warehouse-alt",
      //   Path: "javascript:;",
      //   SubChildren: [
      //     {
      //       Path: "/manager/warehouse/transaction-code-wait-hcm/",
      //       Icon: "fas fa-truck-loading",
      //       Label: "Chờ đi HCM",
      //     },
      //     {
      //       Path: "/manager/warehouse/transaction-code-going-hcm/",
      //       Icon: "fas fa-truck-loading",
      //       Label: "Đang đi HCM",
      //     },
      //   ],
      // },
      {
        Label: "Kho Trung Quốc",
        Icon: "fas fa-warehouse-alt",
        Path: "javascript:;",
        SubChildren: [
          {
            Path: "/manager/warehouse/check-warehouse-china/",
            Icon: "",
            Label: "Kiểm kho TQ",
          },
          {
            Path: "/manager/warehouse/import/",
            Icon: "",
            Label: "Import kho TQ",
          },
          {
            Path: "/manager/warehouse/export/check-export-china/",
            Icon: "",
            Label: "Xuất kho TQ",
          },
          {
            Path: "/manager/warehouse/export/ImportComingVN",
            Icon: "",
            Label: "Import xuất kho TQ",
          },
        ],
      },
      {
        Label: "Kho Việt Nam",
        Icon: "fas fa-warehouse-alt",
        Path: "javascript:;",
        SubChildren: [
          {
            Path: "/manager/warehouse/check-warehouse-vietnam/",
            Icon: "",
            Label: "Kiểm kho VN",
          },
          {
            Path: "/manager/warehouse/out-stock/",
            Icon: "",
            Label: "Xuất kho",
          },
          {
            Path: "/manager/money/out-stock-payment/",
            Icon: "",
            Label: "Thanh toán xuất kho",
          },
        ],
      },
      // {
      //   Label: "Thao tác phiên",
      //   Icon: "fas fa-network-wired",
      //   Path: "javascript:;",
      //   SubChildren: [
      //     {
      //       Path: "/manager/warehouse/manager-working-session/",
      //       Icon: "",
      //       Label: "Quản lý phiên",
      //     },
      //     {
      //       Path: "/manager/warehouse/working-session/",
      //       Icon: "",
      //       Label: "Phiên làm việc",
      //     },
      //   ],
      // },
      // {
      //   Label: "Xuất kho",
      //   Icon: "fas fa-file-export",
      //   Path: "javascript:;",
      //   SubChildren: [
      //     {
      //       Path: "/manager/warehouse/out-stock/",
      //       Icon: "",
      //       Label: "Xuất kho",
      //     },
      //     {
      //       Path: "/manager/money/out-stock-payment/",
      //       Icon: "",
      //       Label: "Thanh toán xuất kho",
      //     },
      //   ],
      // },
      {
        Label: "Quản lý kiện hàng",
        Icon: "fas fa-list-ul",
        Path: "javascript:;",
        SubChildren: [
          {
            Path: "/manager/warehouse/package-management/",
            Icon: "",
            Label: "Bao hàng",
          },
          {
            Path: "/manager/warehouse/transaction-code-management/",
            Icon: "",
            Label: "Mã vận đơn",
          },
          {
            Path: "/manager/warehouse/floating-package/",
            Icon: "",
            Label: "Kiện trôi nổi",
          },
        ],
      },
    ],
  },
  {
    Title: "NGHIỆP VỤ KẾ TOÁN",
    Icon: "fas fa-funnel-dollar",
    Children: [
      {
        Label: "Thống kê",
        Icon: "fas fa-funnel-dollar",
        Path: "javascript:;",
        SubChildren: [
          {
            Icon: "",
            Path: "/manager/statistical/sales/",
            Label: "Doanh thu",
          },
          {
            Icon: "",
            Path: "/manager/statistical/purchase-profit/",
            Label: "Lợi nhuận mua hộ",
          },
          {
            Icon: "",
            Path: "/manager/statistical/payment-profit/",
            Label: "Lợi nhuận thanh toán",
          },
          {
            Icon: "",
            Path: "/manager/statistical/recharge/",
            Label: "Nạp - rút tiền",
          },
          {
            Icon: "",
            Path: "/manager/statistical/surplus/",
            Label: "Số dư",
          },
          {
            Icon: "",
            Path: "/manager/statistical/transaction/",
            Label: "Giao dịch",
          },
        ],
      },
      {
        Icon: "fas fa-id-badge",
        Path: "/manager/money/personal-recharge/",
        Label: "Nạp tiền cá nhân",
      },
      {
        Icon: "fas fa-file-invoice-dollar",
        Path: "/manager/money/recharge-history/",
        Label: "Yêu cầu nạp",
      },
      {
        Icon: "fas fa-hand-holding-usd",
        Path: "/manager/money/withdrawal-history/",
        Label: "Yêu cầu rút",
      },
    ],
  },
  {
    Title: "CẤU HÌNH TRANG CHỦ",
    Icon: "fas fa-home",
    Children: [
      {
        Path: "/manager/content/home/",
        Icon: "fas fa-home",
        Label: "Cấu hình trang chủ",
      },
      {
        Path: "/manager/article/article-category/",
        Icon: "fas fa-list-alt",
        Label: "Chuyên mục bài viết",
      },
      {
        Path: "/manager/article/article-list/",
        Icon: "fas fa-newspaper",
        Label: "Danh sách bài viết",
      },
    ],
  },
];
