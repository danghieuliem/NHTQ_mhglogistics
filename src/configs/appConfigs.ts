export const config = {
  // PRODUCTION: '' || process.env.PRODUCTION,
  // DEVELOPMENT: '' || process.env.DEVELOPMENT,
  API_URL: "" || process.env.NEXT_PUBLIC_API_SERVER,
  ENV: process.env.NODE_ENV,
  tokenName: "tokenNHTQ-demo"
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

export const orderStatusData = [
  {
    id: EOrderStatusData.All,
    name: "Tất cả trạng thái",
    color: "default",
  },
  {
    id: EOrderStatusData.NewOrder,
    name: "Đơn hàng mới",
    color: "#FF0000",
  },
  {
    id: EOrderStatusData.Approved,
    name: "Đơn đã duyệt",
    color: "#ffa500",
  },
  {
    id: EOrderStatusData.ArrivedToChinaWarehouse,
    name: "Đã về kho TQ",
    color: "#808000",
  },
  {
    id: EOrderStatusData.ArrivedToVietNamWarehouse,
    name: "Đã về kho đích",
    color: "#008000",
  },
  {
    id: EOrderStatusData.ReceivedOrder,
    name: "Đã nhận hàng",
    color: "#6E6E6E",
  },
  {
    id: EOrderStatusData.Paid,
    name: "Đã thanh toán",
    color: "#000080",
  },
  {
    id: EOrderStatusData.Canceled,
    name: "Đơn hàng huỷ",
    color: "#000",
  },
  {
    id: EOrderStatusData.Requested,
    name: "Đã yêu cầu",
    color: "#000080",
  },
];

export const orderDataNumberOfOrder = [
  {
    id: EOrderStatusData.All,
    label: "Tất cả đơn",
    key: "TotalOrders",
    col: 2,
    value: null,
    bgColor: "#fff",
    textColor: "#333",
  },
  {
    id: EOrderStatusData.NewOrder,
    label: "Đơn hàng mới",
    key: "TotalNewOrders",
    col: 1,
    value: null,
    bgColor: "#FCEDEB",
    textColor: "#E54C36",
  },
  {
    id: EOrderStatusData.Approved,
    label: "Đơn đã duyệt",
    key: "ToTalConfimed",
    col: 1,
    value: null,
    bgColor: "#EFF5EC",
    textColor: "#5F9D46",
  },
  {
    id: EOrderStatusData.ArrivedToChinaWarehouse,
    label: "Đã về kho TQ",
    key: "TotalInChina",
    col: 1,
    value: null,
    bgColor: "#F1A934",
    textColor: "#fff",
  },
  {
    id: EOrderStatusData.ArrivedToVietNamWarehouse,
    label: "Đã về kho đích",
    key: "TotalInVietnam",
    col: 1,
    value: null,
    bgColor: "#D32240",
    textColor: "#fff",
  },
  {
    id: EOrderStatusData.Canceled,
    label: "Đơn hàng huỷ",
    key: "TotalCancled",
    col: 1,
    value: null,
    bgColor: "#E54C36",
    textColor: "#fff",
  },
  {
    id: EOrderStatusData.Paid,
    label: "Đơn hàng đã thanh toán",
    key: "TotalPaid",
    col: 1,
    value: null,
    bgColor: "#E9F6F3",
    textColor: "#27A689",
  },
  {
    id: EOrderStatusData.ReceivedOrder,
    label: "Đã nhận hàng",
    key: "TotalCompleted",
    col: 1,
    value: null,
    bgColor: "#6E6E6E",
    textColor: "#fff",
  },
];

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

export const orderStatus2Data = [
  {
    id: EOrderStatusData.All,
    name: "Tất cả trạng thái",
    color: "default",
  },
  {
    id: EOrderStatusData.NewOrder,
    name: "Đơn hàng mới",
    color: "#d32f2f",
  },
  {
    id: EOrderStatusData.ArrivedToChinaWarehouse,
    name: "Đã về kho TQ",
    color: "#f57c00",
  },
  {
    id: EOrderStatusData.ArrivedToVietNamWarehouse,
    name: "Đã về kho đích",
    color: "#008000",
  },
  {
    id: EOrderStatusData.Paid,
    name: "Đã thanh toán",
    color: "#D32240",
  },
  {
    id: EOrderStatusData.ReceivedOrder,
    name: "Đã nhận hàng",
    color: "#6E6E6E",
  },
  {
    id: EOrderStatusData.Canceled,
    name: "Đơn hàng huỷ",
    color: "#000",
  },
  {
    id: EOrderStatusData.Approved,
    name: "Đơn đã duyệt",
    color: "teal",
  },
];
// ===== END =====

// created order status data scope
// ===== BEGIN =====

/**
 * Chưa đặt cọc = 0,
    Hủy = 1,
    Đã đặt cọc = 2,
    Đã mua hàng = 5,
    Đã về kho TQ = 6,
    Đã về kho VN = 7,
    Đã thanh toán = 9,
    Đã hoàn thành = 10,
    Đã khiếu nại = 11,
    Chờ báo giá = 100
 */
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

export const createdDataNumberOfOrder = [
  {
    id: ECreatedOrderStatusData.All,
    key: "AllOrders",
    col: 1,
    value: null,
    label: "Tất cả đơn",
    bgColor: "#fff",
    textColor: "#333",
  },
  {
    id: ECreatedOrderStatusData.Canceled,
    key: "Cancel",
    col: 1,
    value: null,
    bgColor: "#000",
    textColor: "#fff",
    label: "Đơn đã hủy",
  },
  {
    id: ECreatedOrderStatusData.Undeposited,
    key: "UnDeposit",
    col: 1,
    value: null,
    bgColor: "#FF0000",
    textColor: "#E54C36",
    label: "Đơn mới",
  },
  {
    id: ECreatedOrderStatusData.Deposited,
    key: "Deposit",
    col: 1,
    value: null,
    bgColor: "orange",
    textColor: "#fff",
    label: "Đơn đặt cọc",
  },
  {
    id: ECreatedOrderStatusData.BoughtForOrder,
    key: "PurchaseOrder",
    col: 1,
    value: null,
    bgColor: "#008080",
    textColor: "#5F9D46",
    label: "Đơn đã mua",
  },
  {
    id: ECreatedOrderStatusData.ArrivedToChinaWarehouse,
    key: "InChinaWarehoue",
    col: 1,
    value: null,
    bgColor: "#808000",
    textColor: "",
    label: "Đơn tại Trung Quốc",
  },
  {
    id: ECreatedOrderStatusData.ArrivedToVietNamWarehouse,
    key: "InVietnamWarehoue",
    col: 1,
    value: null,
    bgColor: "#008000",
    textColor: "#fff",
    label: "Đơn tại Việt Nam",
  },
  // {
  // 	id: ECreatedOrderStatusData.Approved,
  // 	key: "Comfirmed",
  // 	col: 1,
  // 	value: null,
  // bgColor: "",
  // 	textColor: "",
  // label: "Đơn đã xác nhận",
  // },
  {
    id: ECreatedOrderStatusData.Paid,
    key: "Paid",
    col: 1,
    value: null,
    bgColor: "#E9F6F3",
    textColor: "#000080",
    label: "Đơn đã thanh toán",
  },
  {
    id: ECreatedOrderStatusData.Finished,
    key: "Completed",
    col: 1,
    value: null,
    bgColor: "#0000FF",
    textColor: "#fff",
    label: "Đơn hoàn thành",
  },
  // {
  // 	key: "WaitConfirm",
  // 	col: 1,
  // 	value: null,
  // 	label: "Đơn chờ xác nhận"
  // },
  // {
  // 	key: "WaitPayment",
  // 	col: 1,
  // 	value: null,
  // 	label: "Đơn chờ thanh toán"
  // },
];

export const createdDataNumberOfOtherOrder = [
  {
    id: ECreatedOrderStatusData.All,
    key: "AllOrders",
    col: 2,
    value: null,
    bgColor: "#fff",
    textColor: "#333",
    label: "Tất cả đơn",
  },
  {
    id: 1,
    key: "Cancel",
    col: 1,
    value: null,
    bgColor: "#000",
    textColor: "#fff",
    label: "Đơn đã hủy",
  },
  {
    id: 0,
    key: "UnDeposit",
    col: 1,
    value: null,
    bgColor: "#FF0000",
    textColor: "#E54C36",
    label: "Đơn chưa cọc",
  },
  {
    id: 100,
    key: "Comfirmed",
    col: 1,
    value: null,
    bgColor: "#EFF5EC",
    textColor: "#5F9D46",
    label: "Đơn chờ báo giá",
  },
  {
    id: 6,
    key: "InChinaWarehoue",
    col: 1,
    value: null,
    bgColor: "#808000",
    textColor: "#fff",
    label: "Đơn tại Trung Quốc",
  },
  {
    id: 7,
    key: "InVietnamWarehoue",
    col: 1,
    value: null,
    bgColor: "#008000",
    textColor: "#fff",
    label: "Đơn tại Việt Nam",
  },
  {
    id: 9,
    key: "Paid",
    col: 1,
    value: null,
    bgColor: "#000080",
    textColor: "#27A689",
    label: "Đơn đã thanh toán",
  },
  {
    id: 10,
    key: "Completed",
    col: 1,
    value: null,
    bgColor: "#0000FF",
    textColor: "#fff",
    label: "Đơn hoàn thành",
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
  // {
  // 	id: ECreatedOrderStatusData.Approved,
  // 	name: "Đã duyệt đơn",
  // },
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

export enum ECreatedOrderStatusDataDetail {
  All = null,
  Undeposited = 0,
  Canceled = 1,
  Deposited = 2,
  WaitingForOrderApproval = 3,
  Approved = 4,
  BoughtForOrder = 5,
  ArrivedToChinaWarehouse = 6,
  ArrivedToVietNamWarehouse = 7,
  WaitingForPayment = 8,
  Paid = 9,
  Finished = 10,
}

export const createdOrderStatusDataDetail = [
  {
    id: ECreatedOrderStatusDataDetail.All,
    color: "orange",
  },
  {
    id: ECreatedOrderStatusDataDetail.Undeposited,
    color: "#FF0000",
  },
  {
    id: ECreatedOrderStatusDataDetail.Canceled,
    color: "#000",
  },
  {
    id: ECreatedOrderStatusDataDetail.Deposited,
    color: "#ffa500",
  },
  {
    id: ECreatedOrderStatusDataDetail.WaitingForOrderApproval,
    color: "#EAF3FB",
  },
  {
    id: ECreatedOrderStatusDataDetail.Approved,
    color: "#fbc02d",
  },
  {
    id: ECreatedOrderStatusDataDetail.BoughtForOrder,
    color: "#008080",
  },
  {
    id: ECreatedOrderStatusDataDetail.ArrivedToChinaWarehouse,
    color: "#808000",
  },
  {
    id: ECreatedOrderStatusDataDetail.ArrivedToVietNamWarehouse,
    color: "#008000",
  },
  {
    id: ECreatedOrderStatusDataDetail.WaitingForPayment,
    color: "#2A8BD5",
  },
  {
    id: ECreatedOrderStatusDataDetail.Paid,
    color: "#000080",
  },
  {
    id: ECreatedOrderStatusDataDetail.Finished,
    color: "#0000FF",
  },
];

// ===== END =====

export const transferStatusData = [
  {
    id: 1,
    name: "Chưa về kho TQ",
  },
  {
    id: 2,
    name: "Đã về kho TQ",
  },
  {
    id: 3,
    name: "Đã về kho đích",
  },
  {
    id: 4,
    name: "Đã giao khách hàng",
  },
  {
    id: 5,
    name: "Đã hủy",
  },
];

export const transferData = [
  {
    id: 1,
    name: "Đi thường",
  },
  {
    id: 2,
    name: "Đi nhanh",
  },
];

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

export const seoCategoryData = [
  { name: "Bảng giá vận chuyển", id: 1 },
  { name: "Hướng dẫn", id: 2 },
  { name: "Dịch vụ", id: 3 },
  { name: "Giới thiệu", id: 4 },
  { name: "Chính sách", id: 5 },
];

export const roleData = [
  {
    id: null,
    name: "Tất cả",
  },
  {
    id: 1,
    name: "Manager",
  },
  {
    id: 2,
    name: "NV Đặt hàng",
  },
  {
    id: 3,
    name: "NV Kho TQ",
  },
  {
    id: 4,
    name: "NV Kho VN",
  },
  {
    id: 5,
    name: "NV Kinh doanh",
  },
  {
    id: 6,
    name: "Kế toán",
  },
];

export const employeeRoleData = [
  {
    id: 1,
    name: "User",
  },
  {
    id: 2,
    name: "Manager",
  },
  {
    id: 3,
    name: "Nhân viên đặt hàng",
  },
  {
    id: 4,
    name: "Nhân viên kho TQ",
  },
  {
    id: 5,
    name: "Nhân viên kho đích",
  },
  {
    id: 6,
    name: "Nhân viên sale",
  },
  {
    id: 7,
    name: "Nhân viên kế toán",
  },
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
    name: "Đặt cọc",
  },
  {
    id: ECategoryPaymentData.Paid,
    name: "Thanh toán",
  },
  {
    id: ECategoryPaymentData.Recharge,
    name: "Cộng tiền",
  },
  {
    id: ECategoryPaymentData.Withdraw,
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

export const complainStatus = [
  {
    id: ERechargeStatusData.Pending,
    color: "yellow",
  },
  {
    id: ERechargeStatusData.Approved,
    color: "#EFF5EC",
  },
  {
    id: ERechargeStatusData.Cancel,
    color: "#E54C36",
  },
];

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
    Name: "---",
  },
  {
    LevelId: 1,
    Name: "VIP 0",
  },
  {
    LevelId: 2,
    Name: "VIP 1",
  },
  {
    LevelId: 3,
    Name: "VIP 2",
  },
  {
    LevelId: 4,
    Name: "VIP 3",
  },
  {
    LevelId: 5,
    Name: "VIP 4",
  },
  {
    LevelId: 6,
    Name: "VIP 5",
  },
  {
    LevelId: 7,
    Name: "VIP 6",
  },
  {
    LevelId: 8,
    Name: "VIP 7",
  },
  {
    LevelId: 9,
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
      "/manager/order/order-list?q=3",
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
      // "/manager/order/order-list",
      // "/manager/order/order-list/detail",
      // "/manager/order/order-list?q=3",
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
      "/manager/order/order-list?q=3",
      "/manager/deposit/deposit-list",
      "/manager/deposit/deposit-list",
      "/manager/order/buy-for/create-order",
      "/manager/order/buy-for/create-deposit",
      "/manager/statistical/sales",
      "/manager/employee/bonus-order",
      "/manager/employee/bonus-deposit",
      "/manager/employee/bonus-payment",
      "/manager/deposit/deposit-list/detail"
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
      "/manager/money/out-stock-payment",
      "/manager/money/out-stock-payment/detail",
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
      "/manager/order/order-list?q=3",
      "/manager/client/client-list",
      "/manager/deposit/deposit-list/",
      "/manager/order/request-payment/"
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

export const enum EPaymentStatus {
  Pending = 1,
  Paid = 2,
  Cancel = 3,
  Finished = 4,
  Confirmed = 5
}

export const paymentStatus = [
  {
    id: EPaymentStatus.Pending,
    name: "Chờ duyệt",
    col: 2,
    value: null,
    color: "darkred",
  },
  {
    id: EPaymentStatus.Paid,
    name: "Đã thanh toán",
    col: 2,
    value: null,
    color: "#096dd9",
  },
  {
    id: EPaymentStatus.Cancel,
    name: "Đã hủy",
    col: 2,
    value: null,
    color: "#000",
  },
  {
    id: EPaymentStatus.Finished,
    name: "Đã hoàn thành",
    col: 2,
    value: null,
    color: "#008000",
  },
  {
    id: EPaymentStatus.Confirmed,
    name: "Đã xác nhận",
    col: 2,
    value: null,
    color: "#f57c00",
  },
];

export const transportStatus = [
  {
    id: -1,
    name: "Tất cả",
    col: 1,
    value: null,
    color: "#000",
  },
  {
    id: 1,
    name: "Hủy",
    col: 1,
    value: null,
    color: "#000",
  },
  {
    id: 2,
    name: "Chờ duyệt",
    col: 1,
    value: null,
    color: "magenta",
  },
  {
    id: 3,
    name: "Đã duyệt",
    col: 1,
    value: null,
    color: "#008080",
  },
  {
    id: 4,
    name: "Về kho TQ",
    col: 1,
    value: null,
    color: "#f57c00",
  },
  {
    id: 5,
    name: "Về kho VN",
    col: 1,
    value: null,
    color: "#c71585",
  },
  {
    id: 6,
    name: "Đã thanh toán",
    col: 1,
    value: null,
    color: "#096dd9",
  },
  {
    id: 7,
    name: "Đã hoàn thành",
    col: 1,
    value: null,
    color: "#008000",
  },
];


export const enum EOrderStatus {
  all = -1,
  NoDeposit = 0,
  WaitingForQuote = 100,
  Cancel = 1,
  Deposited = 2,
  Purchased = 5,
  InChinaWarehoue = 6,
  InVietnamWarehoue = 7,
  Paid = 9,
  Finished = 10,
  Complained = 11
}

export const orderStatus = [
  {
    id: EOrderStatus.all,
    name: "Tất cả đơn",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.NoDeposit,
    name: "Chưa đặt cọc",
    color: "#f00",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.WaitingForQuote,
    name: "Chờ báo giá",
    color: "purple",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.Cancel,
    name: "Hủy",
    color: "#000",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.Deposited,
    name: "Đã đặt cọc",
    color: "#ffa500",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.Purchased,
    name: "Đã mua hàng",
    color: "#008080",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.InChinaWarehoue,
    name: "Đã về kho TQ",
    color: "#f57c00",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.InVietnamWarehoue,
    name: "Đã về kho VN",
    color: "#c71585",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.Paid,
    name: "Đã thanh toán",
    color: "#096dd9",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.Finished,
    name: "Đã hoàn thành",
    color: "#008000",
    col: 1,
    money: null,
    value: null,
  },
  {
    id: EOrderStatus.Complained,
    name: "Đã khiếu nại",
    color: "#601010",
    col: 1,
    money: null,
    value: null,
  },
];

export const packageStatus = [
  {
    id: 0,
    name: "Đã hủy",
    color: "#000",
  },
  {
    id: 1,
    name: "Mới đặt",
    color: "blue",
  },
  {
    id: 2,
    name: "Đã về kho TQ",
    color: "#f57c00",
  },
  {
    id: 3,
    name: "Đã về kho VN",
    color: "#c71585",
  },
  {
    id: 5,
    name: "Đã giao",
    color: "#008000",
  },
];

export const reportStatus = [
  {
    id: 0,
    name: "Đã hủy",
    color: "#000",
  },
  {
    id: 1,
    name: "Chưa duyệt",
    color: "red",
  },
  {
    id: 2,
    name: "Đang xử lý",
    color: "#008080",
  },
  {
    id: 3,
    name: "Đã xử lý",
    color: "#008000",
  },
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
