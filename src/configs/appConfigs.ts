import { EParamQ } from "~/enums";

export const config = {
  // PRODUCTION: '' || process.env.PRODUCTION,
  // DEVELOPMENT: '' || process.env.DEVELOPMENT,
  API_URL: "" || process.env.NEXT_PUBLIC_API_SERVER,
  ENV: process.env.NODE_ENV,
  tokenName: "tokenNHTQ-demo",
};

export const regex = {
  email: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
  number: /^[0-9]+$/,
  numberAndWord: /^[a-zA-Z 0-9_.+-]+$/,
  numbersWithCommas: /^\d+(\,\d+)*$/g,
};

export const defaultPagination = {
  current: 1,
  pageSize: 20,
  total: 0,
  typeTag: 4,
};

export const defaultSorter = {
  field: "Id",
  order: "descend",
} as any;

export const notificationTypes = [
  { title: "Tất cả", value: 4 },
  { title: "Tài chính", value: 1 },
  { title: "Đơn hàng", value: 2 },
  { title: "Khiếu nại", value: 3 },
];

// order status data scope
// ===== BEGIN =====
export enum EOrderStatusData {
  null = -1,
  All = 0,
  Canceled = 1,
  NewOrder = 2,
  Approved = 3,
  ArrivedToChinaWarehouse = 4,
  ArrivedToVietNamWarehouse = 5,
  Requested = 6,
  Paid = 6,
  ReceivedOrder = 7,
}

export const orderMoneyOfOrdersData = [
  {
    key: "AmountAll",
    label: "Tổng tiền hàng tất cả",
    value: null,
    bold: true,
  },
  {
    key: "AmountNotDelivery",
    label: "Tổng tiền hàng chưa giao",
    value: null,
    bold: true,
  },
  {
    key: "AmountInChina",
    label: "Tổng tiền hàng đã về kho Trung Quốc",
    value: null,
    bold: true,
  },
  {
    key: "AmoutWattingToChina",
    label: "Tổng tiền hàng chờ về kho Trung Quốc",
    value: null,
    bold: true,
  },
  {
    key: "AmountInVietnam",
    label: "Tổng tiền hàng đang ở kho đích",
    value: null,
    bold: true,
  },
  {
    key: "AmountPaid",
    label: "Tổng tiền hàng đã thanh toán",
    value: null,
    bold: true,
  },
  {
    key: "AmountCompleted",
    label: "Tổng tiền hàng đã hoàn thành",
    value: null,
    bold: true,
  },
  {
    key: "AmountPay",
    label: "Tổng tiền cần thanh toán để lấy hàng trong kho",
    value: null,
    bold: true,
  },
];

// ===== END =====

// created order status data scope
// ===== BEGIN =====

export enum ECreatedOrderStatusData {
  All = null,
  Undeposited = 0,
  Canceled = 1,
  Deposited = 2,
  WaitingForOrderApproval = 100,
  Approved = 4,
  BoughtForOrder = 5,
  ArrivedToChinaWarehouse = 6,
  ArrivedToVietNamWarehouse = 7,
  WaitingForPayment = 8,
  Paid = 9,
  Finished = 10,
}

export const createdOrderStatusData = [
  {
    id: ECreatedOrderStatusData.All,
    name: "Tất cả trạng thái",
    color: "transparent",
  },
  {
    id: ECreatedOrderStatusData.Undeposited,
    name: "Chưa đặt cọc",
    color: "#FF0000",
  },
  {
    id: ECreatedOrderStatusData.Canceled,
    name: "Huỷ đơn hàng",
    color: "#000",
  },
  {
    id: ECreatedOrderStatusData.Deposited,
    name: "Đã đặt cọc",
    color: "#ffa500",
  },
  {
    id: ECreatedOrderStatusData.BoughtForOrder,
    name: "Đã mua hàng",
    color: "#008080",
  },
  {
    id: ECreatedOrderStatusData.ArrivedToChinaWarehouse,
    name: "Đã về kho TQ",
    color: "#f57c00",
  },
  {
    id: ECreatedOrderStatusData.ArrivedToVietNamWarehouse,
    name: "Đã về kho VN",
    color: "#c71585",
  },
  {
    id: ECreatedOrderStatusData.Paid,
    name: "Khách đã thanh toán",
    color: "#096dd9",
  },
  {
    id: ECreatedOrderStatusData.Finished,
    name: "Đã hoàn thành",
    color: "#008000",
  },
];

export const createdMoneyOfOrdersData = [
  {
    key: "AmountNotDelivery",
    label: "Tổng tiền hàng chưa giao",
    value: null,
    bold: true,
  },
  {
    key: "AmountMustDeposit",
    label: "Tổng tiền hàng cần đặt cọc",
    value: null,
  },
  {
    key: "AmountOrderRequireDeposit",
    label: "Tổng tiền hàng (đơn hàng cần đặt cọc)",
    value: null,
  },
  {
    key: "AmoutWattingToChina",
    label: "Tổng tiền hàng chờ về kho TQ",
    value: null,
  },
  {
    key: "AmountInChina",
    label: "Tổng tiền hàng đã về kho TQ",
    value: null,
  },
  {
    key: "AmountInVietnam",
    label: "Tổng tiền hàng đang ở kho đích",
    value: null,
  },
  {
    key: "AmountPay",
    label: "Tổng tiền cần thanh toán để lấy hàng trong kho",
    value: null,
  },
  {
    key: "AmountOfDeposit",
    label: "Tổng tiền của những đơn đã cọc",
    value: null,
  },
  {
    key: "AmountCompleted",
    label: "Tổng tiền đơn đã hoàn thành",
    value: null,
  },
];

export const statusData = [
  {
    id: ECreatedOrderStatusData.Undeposited,
    name: "Chờ đặt cọc",
  },
  {
    id: ECreatedOrderStatusData.Canceled,
    name: "Hủy đơn hàng",
  },
  {
    id: ECreatedOrderStatusData.Deposited,
    name: "Đã đặt cọc",
  },
  {
    id: ECreatedOrderStatusData.BoughtForOrder,
    name: "Đã mua hàng",
  },
  {
    id: ECreatedOrderStatusData.ArrivedToChinaWarehouse,
    name: "Đang về kho đích",
  },
  {
    id: ECreatedOrderStatusData.ArrivedToVietNamWarehouse,
    name: "Đã nhận hàng tại kho đích",
  },
  {
    id: ECreatedOrderStatusData.Paid,
    name: "Khách đã thanh toán",
  },
  {
    id: ECreatedOrderStatusData.Finished,
    name: "Đã hoàn thành",
  },
];

// ===== END =====

export const dataGender = [
  {
    Id: 0,
    Name: "Nam",
  },
  {
    Id: 1,
    Name: "Nữ",
  },
];

export const categoryData = [
  { Id: true, Name: "Đơn ký gửi" },
  { Id: false, Name: "Đơn mua hộ" },
];

// active data scope
// ===== BEGIN =====
export const enum EActiveData {
  All = 0,
  Actived = 1,
  Unactived = 2,
  Blocked = 3,
}

export const activeData = [
  {
    id: EActiveData.All,
    name: "Tất cả",
    color: "rgba(255,255,255,.4)",
  },
  {
    id: EActiveData.Actived,
    name: "Đã kích hoạt",
    color: "green",
  },
  {
    id: EActiveData.Unactived,
    name: "Chưa kích hoạt",
    color: "yellow",
  },
  {
    id: EActiveData.Blocked,
    name: "Đang bị khóa",
    color: "red",
  },
];
// ===== END =====

// gender data scope
// ===== BEGIN =====
export const enum EGenderData {
  FEMALE = 0,
  MALE = 1,
}

export const genderData = [
  {
    Id: EGenderData.FEMALE,
    Name: "Nữ",
  },
  {
    Id: EGenderData.MALE,
    Name: "Nam",
  },
];
// ===== END =====

export const orderIdData = [
  {
    id: 1,
    value: "4354354354324233",
  },
  {
    id: 2,
    value: "32ed43535",
  },
  {
    id: 3,
    value: "2357544",
  },
  {
    id: 4,
    value: "fdg4352523",
  },
  {
    id: 5,
    value: "sfjklsdj234",
  },
];

// payment status scope
// ===== BEGIN =====
export enum EPaymentData {
  All = 0,
  Unpaid = 1,
  Paid = 2,
  Canceled = 3,
  Finished = 4,
  Confirmed = 5,
}

export const paymentData = [
  {
    id: EPaymentData.All,
    name: "Tất cả",
    color: "default",
  },
  {
    id: EPaymentData.Confirmed,
    name: "Xác nhận",
    color: "#fbc02d",
  },
  {
    id: EPaymentData.Unpaid,
    name: "Chờ xác nhận",
    color: "#D32F2F",
  },
  {
    id: EPaymentData.Paid,
    name: "Đã thanh toán",
    color: "#1976D2",
  },
  {
    id: EPaymentData.Finished,
    name: "Hoàn thành",
    color: "#1976D2",
  },
  {
    id: EPaymentData.Canceled,
    name: "Đã hủy",
    color: "#000",
  },
];
// ===== END =====

// payment status data scope
// ===== BEGIN =====
export enum EPaymentStatusData {
  All = null,
  Approved = 2,
  Unapproved = 1,
  Cancel = 3,
}

export const paymentStatusData = [
  { id: EPaymentStatusData.All, name: "Tất cả", color: "default" },
  { id: EPaymentStatusData.Approved, name: "Đã duyệt", color: "#fbc02d" },
  { id: EPaymentStatusData.Unapproved, name: "Chưa duyệt", color: "#cf1322" },
  { id: EPaymentStatusData.Cancel, name: "Hủy", color: "#000" },
];
// ===== END =====

// small package status data scope
// ===== BEGIN =====
export enum ESmallPackageStatusData {
  Cancelled = 0,
  New = 1,
  ArrivedToChinaWarehouse = 2,
  ArrivedToVietNamWarehouse = 3,
  Paid = 4,
  Shipped = 5,
}

export const smallPackageStatusData = [
  {
    id: ESmallPackageStatusData.New,
    name: "Đơn mới đặt",
    color: "#FF0000",
  },
  {
    id: ESmallPackageStatusData.ArrivedToChinaWarehouse,
    name: "Đã về kho TQ",
    color: "#faad14",
  },
  {
    id: ESmallPackageStatusData.ArrivedToVietNamWarehouse,
    name: "Đã về kho đích",
    color: "#c71585",
  },
  // {
  // 	id: ESmallPackageStatusData.Paid,
  // 	name: "Đã thanh toán",
  // 	color: "#000080",
  // },
  {
    id: ESmallPackageStatusData.Shipped,
    name: "Đã giao khách",
    color: "#008000",
  },
  {
    id: ESmallPackageStatusData.Cancelled,
    name: "Đã huỷ",
    color: "#000",
  },
];

export enum ESmallPackageStatusConfirm {
  Not = 0,
  NotReceived = 1,
  waitConfirm = 2,
  received = 3,
}

export const smallPackageStatusConfirm = [
  {
    id: ESmallPackageStatusConfirm.Not,
    name: "Chưa xác nhận",
    color: "red",
  },
  {
    id: ESmallPackageStatusConfirm.NotReceived,
    name: "Chưa có người nhận",
    color: "blue",
  },
  {
    id: ESmallPackageStatusConfirm.waitConfirm,
    name: "Đang chờ xác nhận",
    color: "green",
  },
  {
    id: ESmallPackageStatusConfirm.received,
    name: "Đã có người nhận",
    color: "green",
  },
];
// ===== END =====

// big package status data scope
// ===== BEGIN =====
export enum EBigPackageStatusData {
  ArrivedToChinaWarehouse = 1,
  ArrivedToVietNamWarehouse = 2,
  Cancel = 3,
}
export const bigPackageStatusData = [
  {
    id: EBigPackageStatusData.ArrivedToChinaWarehouse,
    name: "Bao hàng ở Trung Quốc",
    color: "red",
  },
  {
    id: EBigPackageStatusData.ArrivedToVietNamWarehouse,
    name: "Đã nhận hàng tại Việt Nam",
    color: "green",
  },
  {
    id: EBigPackageStatusData.Cancel,
    name: "Huỷ",
    color: "black",
  },
];
// ===== END =====

// product status data scope
// ===== BEGIN =====
export enum EProductStatusData {
  Stock = 1,
  OutStock = 2,
}

export const productStatusData = [
  {
    id: EProductStatusData.Stock,
    name: "Còn hàng",
    color: "green",
  },
  {
    id: EProductStatusData.OutStock,
    name: "Hết hàng",
    color: "red",
  },
];
// ===== END =====

// export status data scope
export enum EExportStatusData {
  Unexport = 1,
  Export = 2,
}

export const exportStatusData = [
  {
    id: EExportStatusData.Unexport,
    name: "Chưa xuất kho",
    color: "yellow",
  },
  {
    id: EExportStatusData.Export,
    name: "Đã xuất kho",
    color: "green",
  },
];

// report status data scope
// ===== BEGIN =====
export enum EReportStatusData {
  All = null,
  Canceled = 0,
  Pending = 1,
  Processing = 2,
  Processed = 3,
}

export const reportStatusData = [
  {
    id: EReportStatusData.All,
    name: "Tất cả",
    color: "default",
  },
  {
    id: EReportStatusData.Canceled,
    name: "Đã hủy",
    color: "#000",
  },
  {
    id: EReportStatusData.Pending,
    name: "Chưa duyệt",
    color: "#d4b106",
  },
  {
    id: EReportStatusData.Processing,
    name: "Đang xử lý",
    color: "orange",
  },
  {
    id: EReportStatusData.Processed,
    name: "Đã xử lý",
    color: "green",
  },
];
// ===== END =====

// search data scope
// ===== BEGIN =====
export enum ESearchData {
  All = 0,
  ID = 1,
  Transport = 2,
  Website = 3,
  Username = 4,
  ID_Don = 5,
}

export enum ESearch3Data {
  All = null,
  ID = 1,
  Transport = 2,
  Username = 3,
}

export const search3Data = [
  {
    id: ESearch3Data.All,
    name: "Tất cả",
  },
  {
    id: ESearch3Data.Username,
    name: "Username",
  },
  {
    id: ESearch3Data.Transport,
    name: "Mã vận đơn",
  },
];

export const searchData = [
  {
    id: ESearchData.All,
    name: "Tất cả",
  },
  {
    id: ESearchData.ID_Don,
    name: "ID đơn",
  },
  {
    id: ESearchData.Website,
    name: "Website",
  },
  {
    id: ESearchData.Username,
    name: "Username",
  },
  {
    id: ESearchData.Transport,
    name: "Mã vận đơn",
  },
  {
    id: ESearchData.ID,
    name: "Mã đơn hàng",
  },
];

export const search2Data = [
  {
    id: ESearchData.All,
    name: "Tất cả",
  },
  // {
  //   id: ESearchData.ID,
  //   name: "Mã đơn hàng",
  // },
  {
    id: ESearchData.ID_Don,
    name: "ID đơn hàng",
  },
  {
    id: ESearchData.Website,
    name: "Website",
  },
];
// ===== END =====

// order type status data
// ===== BEGIN =====
export enum EOrderTypeStatusData {
  Buy = 1,
  Transper = 2,
  Unknown = 3,
}

export const orderTypeStatusData: { id: EOrderTypeStatusData; name: string }[] =
  [
    {
      id: EOrderTypeStatusData.Buy,
      name: "Đơn hàng mua hộ",
    },
    {
      id: EOrderTypeStatusData.Transper,
      name: "Đơn hàng VC hộ",
    },
  ];
// ===== END =====

// search small package status data
// ===== BEGIN =====
export enum ESearchSmallPackageStatusData {
  OrderTransactionCode = null,
  MainOrderId = 1,
  Id = 2,
  UserName = 3,
}

export const searchSmallPackageStatusData = [
  {
    id: ESearchSmallPackageStatusData.OrderTransactionCode,
    name: "Mã vận đơn",
  },
  {
    id: ESearchSmallPackageStatusData.MainOrderId,
    name: "Mã đơn hàng",
  },
  {
    id: ESearchSmallPackageStatusData.Id,
    name: "ID",
  },
  {
    id: ESearchSmallPackageStatusData.UserName,
    name: "Username",
  },
];
// ===== END =====

export const bankData = [
  { id: null, name: "Tất cả" },
  { id: 1, name: "Trực tiếp tại văn phòng" },
  { id: 2, name: "TECHCOMBANK - phạm minh thành - 19037265745018 - móng cái" },
];

export const employeeData = [
  {
    id: null,
    name: "Tất cả",
  },
  {
    id: 1,
    name: "Ngocanh",
  },
  {
    id: 2,
    name: "Truongson",
  },
  {
    id: 3,
    name: "anchan",
  },
];

export const warehouseData = [{ id: 1, name: "Đông Hưng" }];
export const receiveAtData = [
  { id: 1, name: "Hà Nội" },
  { id: 2, name: "Hồ Chí Minh" },
];

export const transactionData = [
  {
    id: null,
    name: "Tất cả",
  },
  {
    id: 1,
    name: "Đặt cọc",
  },
  {
    id: 2,
    name: "Nhận lại tiền đặt cọc",
  },
  {
    id: 3,
    name: "Thanh toán hóa đơn",
  },
  {
    id: 4,
    name: "Admin chuyển tiền",
  },
  {
    id: 5,
    name: "Rút tiền",
  },
  {
    id: 6,
    name: "Hủy lệnh rút tiền",
  },
  {
    id: 7,
    name: "Hoàn tiền khiếu nại",
  },
  {
    id: 8,
    name: "Thanh toán hộ",
  },
];

// category payment data scope
// ===== BEGIN =====
export enum ECategoryPaymentData {
  All = 0,
  Deposit = 1,
  GetDepositBack = 2,
  Paid = 3,
  Recharge = 4,
  Withdraw = 5,
  CancelWithdraw = 6,
  Refund = 7,
  HouseholdTransferPayment = 8,
  HouseholdPayment = 9,
  Rose = 14,
}

export const categoryPaymentData = [
  {
    id: ECategoryPaymentData.All,
    name: "Tất cả",
  },
  {
    id: ECategoryPaymentData.Deposit,
    color: "#f57c00",
    name: "Đặt cọc",
  },
  {
    id: ECategoryPaymentData.Paid,
    color: "#c71585",
    name: "Thanh toán",
  },
  {
    id: ECategoryPaymentData.Recharge,
    color: "#096dd9",
    name: "Cộng tiền",
  },
  {
    id: ECategoryPaymentData.Withdraw,
    color: "#008000",
    name: "Trừ tiền",
  },
];
// ===== END =====

// payment type data scope
// ===== BEGIN =====
export enum EPaymentTypeData {
  Deposit = 1,
  Payment = 2,
}

export const paymentTypeData = [
  {
    id: EPaymentTypeData.Deposit,
    name: "Đặt cọc",
  },
  {
    id: EPaymentTypeData.Payment,
    name: "Thanh toán",
  },
];
// ===== END =====

// formal payment data scope
// ===== BEGIN =====
export enum EFormalPaymentData {
  Live = 1,
  Online = 2,
}

export const formalPaymentData = [
  {
    id: EFormalPaymentData.Live,
    name: "Trực tiếp",
    color: "green",
  },
  {
    id: EFormalPaymentData.Online,
    name: "Ví điện tử",
    color: "blue",
  },
];
// ===== END =====

export const dataSearchProduct = [
  {
    id: "1",
    image: "/default/taobao.png",
    name: "Taobao",
  },
  {
    id: "2",
    image: "/default/tmall.png",
    name: "Tmall",
  },
  {
    id: "3",
    image: "/default/1688.png",
    name: "1688",
  },
];

export const clientData = [
  {
    id: 1,
    name: "quangvu123",
  },
  {
    id: 2,
    name: "testuser",
  },
  {
    id: 3,
    name: "admin10",
  },
  {
    id: 4,
    name: "nguyenvanc",
  },
  {
    id: 5,
    name: "newuser",
  },
];

// package status data
// ===== BEGIN =====
export enum EPackageStatusData {
  China = 1,
  VietNam = 2,
  Cancel = 3,
}

export const packageStatusData = [
  { id: EPackageStatusData.China, name: "Bao hàng tại Trung Quốc" },
  { id: EPackageStatusData.VietNam, name: "Đã nhận hàng tại Việt Nam" },
  { id: EPackageStatusData.Cancel, name: "Hủy" },
];
// ===== END =====

export const withdrawalStatusData = [
  { id: 1, name: "Thành công" },
  { id: 2, name: "Đang chờ" },
  { id: 3, name: "Hủy" },
];

export const outstockStatusData = [
  {
    id: null,
    name: "Tất cả",
  },
  {
    id: 1,
    name: "Chưa xử lý",
  },
  {
    id: 2,
    name: "Đã xử lý",
  },
];

export const typeOfUserData = [
  {
    id: null,
    name: "Tất cả",
  },
  {
    id: 1,
    name: "User có số dư tài khoản",
  },
  {
    id: 2,
    name: "User không có số dư tài khoản",
  },
];

// recharge and withdraw status data scope
// ===== BEGIN =====
export enum ERechargeStatusData {
  Pending = 1,
  Approved = 2,
  Cancel = 3,
}

// export const complainStatus = [
//   {
//     id: ERechargeStatusData.Pending,
//     color: "yellow",
//   },
//   {
//     id: ERechargeStatusData.Approved,
//     color: "#EFF5EC",
//   },
//   {
//     id: ERechargeStatusData.Cancel,
//     color: "#E54C36",
//   },
// ];

export const rechargeStatusData = [
  {
    id: ERechargeStatusData.Pending,
    name: "Đang chờ duyệt",
    color: "#2A8BD5",
  },
  {
    id: ERechargeStatusData.Approved,
    name: "Đã duyệt",
    color: "#5F9D46",
  },
  {
    id: ERechargeStatusData.Cancel,
    name: "Đã huỷ",
    color: "#000",
  },
];

export const withdrawStatusData = rechargeStatusData;
// ===== END =====

export const enableData = [
  {
    id: 1,
    name: "Hiện",
  },
  {
    id: 2,
    name: "Ẩn",
  },
];

export const benefitData = [
  {
    id: 1,
    name: "Cam kết của chúng tôi",
  },
  {
    id: 2,
    name: "Quyền lợi của khách hàng",
  },
];

export enum EPermission {
  AddNew = 1,
  Update = 2,
  Delete = 3,
  View = 4,
  Download = 5,
  Upload = 6,
  Import = 7,
  Export = 8,
  ViewAll = 9,
}

export const allPermissionsNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const permissionsConstList = [
  {
    Code: "AddNew",
    Name: "Thêm mới",
    Id: EPermission.AddNew,
  },
  {
    Code: "Update",
    Name: "Cập nhật",
    Id: EPermission.Update,
  },
  {
    Code: "Delete",
    Name: "Xóa",
    Id: EPermission.Delete,
  },
  {
    Code: "View",
    Name: "Xem",
    Id: EPermission.View,
  },
  {
    Code: "Download",
    Name: "Download",
    Id: EPermission.Download,
  },
  {
    Code: "Upload",
    Name: "Upload",
    Id: EPermission.Upload,
  },
  {
    Code: "Import",
    Name: "Import",
    Id: EPermission.Import,
  },
  {
    Code: "Export",
    Name: "Export",
    Id: EPermission.Export,
  },
  {
    Code: "ViewAll",
    Name: "Xem tất cả",
    Id: EPermission.ViewAll,
  },
];

export const getLevelId = [
  {
    LevelId: 0,
    color: "#333",
    Name: "---",
  },
  {
    LevelId: 1,
    color: "#C01048",
    Name: "VIP 0",
  },
  {
    LevelId: 2,
    color: "#3E4784",
    Name: "VIP 1",
  },
  {
    LevelId: 3,
    color: "#3538CD",
    Name: "VIP 2",
  },
  {
    LevelId: 4,
    color: "#FDB022",
    Name: "VIP 3",
  },
  {
    LevelId: 5,
    color: "#53389E",
    Name: "VIP 4",
  },
  {
    LevelId: 6,
    color: "#9E77ED",
    Name: "VIP 5",
  },
  {
    LevelId: 7,
    color: "#DC6803",
    Name: "VIP 6",
  },
  {
    LevelId: 8,
    color: "#039855",
    Name: "VIP 7",
  },
  {
    LevelId: 9,
    color: "#054F31",
    Name: "VIP 8",
  },
];

export const controllerList = {
  PayHelp: "PayHelp",
  OutStockSession: "OutStockSession",
  File: "File",
  Tracking: "Tracking",
  MainOrderRealReport: "MainOrderRealReport",
  PayOrderHistoryReport: "PayOrderHistoryReport",
  UserReport: "UserReport",
  PayHelpReport: "PayHelpReport",
  HistoryPayWalletReport: "HistoryPayWalletReport",
  OutStockSessionReport: "OutStockSessionReport",
  MainOrderReport: "MainOrderReport",
  TransportationOrderReport: "TransportationOrderReport",
  MainOrderRevenueReport: "MainOrderRevenueReport",
  WithdrawReport: "WithdrawReport",
  AdminSendUserWalletReport: "AdminSendUserWalletReport",
  ExportRequestTurn: "ExportRequestTurn",
  Notification: "Notification",
  Permission: "Permission",
  User: "User",
  OrderShopTemp: "OrderShopTemp",
  OrderTemp: "OrderTemp",
  Order: "Order",
  FeeSupport: "FeeSupport",
  MainOrderCode: "MainOrderCode",
  StaffIncome: "StaffIncome",
  MainOrder: "MainOrder",
  Catalogue: "Catalogue",
  OutStockSessionPackage: "OutStockSessionPackage",
  FeeCheckProduct: "FeeCheckProduct",
  FeePackaged: "FeePackaged",
  BigPackage: "BigPackage",
  UserGroup: "UserGroup",
  OrderComment: "OrderComment",
  Menu: "Menu",
  Refund: "Refund",
  Withdraw: "Withdraw",
  AdminSendUserWallet: "AdminSendUserWallet",
  HistoryPayWallet: "HistoryPayWallet",
  HistoryPayWalletCNY: "HistoryPayWalletCNY",
  SmallPackage: "SmallPackage",
  Complain: "Complain",
  TransportationOrder: "TransportationOrder",
  Dashboard: "Dashboard",
  CustomerBenefits: "CustomerBenefits",
  Bank: "Bank",
  Service: "Service",
  PageType: "PageType",
  Step: "Step",
  Page: "Page",
  PermitObject: "PermitObject",
  NotificationSetting: "NotificationSetting",
  PriceChange: "PriceChange",
  UserLevel: "UserLevel",
  FeeBuyPro: "FeeBuyPro",
  WarehouseFee: "WarehouseFee",
  Configurations: "Configurations",
  Auth: "Auth",
};
export type TControllerList =
  typeof controllerList[keyof typeof controllerList];

// update by Siinh
// firstPageDirect to check page user can accesabled, if not => redirect to page can access
export const firstPageDirect = [
  {
    id: 1,
    page: "/dashboard",
  },
  {
    id: 2,
    page: "/user",
    allowPath: ["/user"],
  },
  {
    id: 3,
    page: "/dashboard",
    denyPath: [
      "manager/employee/decentralization-management",
      "manager/settings",
    ],
  },
  {
    id: 4,
    page: "/manager/order/order-list",
    allowPath: [
      "/manager/order/order-list",
      "/manager/order/order-list/detail",
      `/manager/order/order-list?q=${EParamQ.otherOrder}`,
      "/manager/statistical/sales",
      "/manager/employee/bonus-order",
      "/manager/order/buy-for/create-order",
    ],
  },
  {
    id: 5,
    page: "/manager/warehouse/check-warehouse-china",
    allowPath: [
      "/manager/warehouse/check-warehouse-china",
      "/manager/warehouse/import",
      "/manager/warehouse/package-management",
      "/manager/warehouse/transaction-code-management",
      "/manager/warehouse/floating-package",
      "/manager/warehouse/package-management/detail",
    ],
  },
  {
    id: 6,
    page: "/manager/warehouse/check-warehouse-vietnam",
    allowPath: [
      "/manager/warehouse/check-warehouse-vietnam",
      "/manager/warehouse/out-stock",
      "/manager/warehouse/out-stock/detail",
      "/manager/warehouse/package-management",
      "/manager/warehouse/transaction-code-management",
      "/manager/warehouse/floating-package",
      "/manager/warehouse/package-management/detail",
      "/manager/money/out-stock-payment",
      "/manager/money/out-stock-payment/detail",
    ],
  },
  {
    id: 7,
    page: "/manager/client/client-list",
    allowPath: [
      "/manager/client/client-list",
      "/manager/order/order-list",
      "/manager/order/order-list/detail",
      `/manager/order/order-list?q=${EParamQ.otherOrder}`,
      "/manager/deposit/deposit-list",
      "/manager/deposit/deposit-list",
      "/manager/order/buy-for/create-order",
      "/manager/order/buy-for/create-deposit",
      "/manager/statistical/sales",
      "/manager/employee/bonus-order",
      "/manager/employee/bonus-deposit",
      "/manager/employee/bonus-payment",
      "/manager/deposit/deposit-list/detail",
      "/manager/order/request-payment/",
      "/manager/order/request-payment/detail/",
    ],
  },
  {
    id: 8,
    page: "/manager/employee/employee-management",
    allowPath: [
      "/manager/employee/employee-management",
      "/manager/employee/bonus-order",
      "/manager/employee/bonus-deposit",
      "/manager/employee/bonus-payment",
      // "/manager/money/out-stock-payment",
      // "/manager/money/out-stock-payment/detail",
      "/manager/money/vietnam-withdrawal",
      "/manager/money/vietnam-recharge",
      "/manager/money/personal-recharge",
      "/manager/money/recharge-history",
      "/manager/money/withdrawal-history",
      "/manager/statistical/sales",
      "/manager/statistical/purchase-profit",
      "/manager/statistical/payment-profit",
      "/manager/statistical/recharge",
      "/manager/statistical/surplus",
      "/manager/statistical/transaction",
      "/manager/order/order-list/detail",
      "/manager/client/transaction-history",
      "/manager/order/order-list",
      "/manager/order/order-list/detail",
      `/manager/order/order-list?q=${EParamQ.otherOrder}`,
      "/manager/client/client-list",
      "/manager/deposit/deposit-list/",
      "/manager/order/request-payment/",
    ],
  },
];

// use for render social list in header and footer components
export const socialList = [
  {
    title: "Facebook",
    icon: "fab fa-facebook-f",
    link: "",
  },
  {
    title: "Pinterest",
    icon: "fab fa-pinterest-p",
    link: "",
  },
  {
    title: "Twitter",
    icon: "fab fa-twitter",
    link: "",
  },
  {
    title: "Youtube",
    icon: "fab fa-youtube",
    link: "",
  },
  {
    title: "Instagram",
    icon: "fab fa-instagram",
    link: "",
  },
  {
    title: "WechatLink",
    icon: "fab fa-weixin",
    link: "",
  },
  {
    title: "Skype",
    icon: "fab fa-skype",
    link: "",
  },
  {
    title: "ZaloLink",
    imgSrc: "/icon-zalo.png",
    link: "",
  },
];

export const apiWithoutToken = [
  "/menu/config",
  "/customer-talk",
  "/service",
  "/step",
  "/menu",
  "/customer-benefits",
  "/page-type/get-by-code",
  "/page/get-by-code",
];

export const moneyStatus = [
  {
    id: 1,
    name: "Đang chờ duyệt",
    color: "red",
  },
  {
    id: 2,
    name: "Đã duyệt",
    color: "#008000",
  },
  {
    id: 3,
    name: "Đã hủy",
    color: "#000",
  },
];

export const NotificationList = [
  {
    tab: "Tất cả",
    key: 4,
    color: "sec",
  },
  {
    tab: "Tài chính",
    key: 1,
    color: "green",
  },
  {
    tab: "Đơn hàng",
    key: 2,
    color: "blue",
  },
  // {
  //   tab: "Giỏ hàng",
  //   key: 5,
  // },
  {
    tab: "Khiếu nại",
    key: 3,
    color: "red",
  },
];
