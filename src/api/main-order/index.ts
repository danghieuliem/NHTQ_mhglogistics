import { ESearchData } from "./../../configs/appConfigs";
import BaseAPI from "../methods";

type TFilterParams = {
  UID: number;
  RoleID: number;
  Status: number;
  /**
   * 1. Id
   * 2. Mã vận đơn
   * 3. Website
   * 4. Username
   */
  TypeSearch: ESearchData;
  /**
   * 1. Đơn mua hộ
   * 2. Đơn ký gửi
   * 3. Không xác định
   */
  OrderType: 1 | 2 | 3;
  FromDate: string;
  ToDate: string;
  FromPrice: number;
  ToPrice: number;
  IsNotMainOrderCode: boolean;
  MainOrderCode: string;
  OrderTransactionCode: string;
};

const { put, get, post, globalCRUD, gGetPermissionDetail } = new BaseAPI<
  TOrder,
  TFilterParams
>("main-order");

export const mainOrder = {
  ...globalCRUD,
  addAnother: (data: TUserCreateOrder) => post("/add-another", data),

  gGetPermissionDetail,

  payment: (params: TPaymentOrder) => put("/payment", undefined, { params }),

  getTotalStatus: () => get("/get-total-status"),

  getTotalAmount: () => get("/get-total-amount"),

  getTotalDeposit: () => get("/get-total-deposit"),

  getMainOrderInfo: (params: { orderType: number }) =>
    get("/get-mainorder-infor", { params }),

  getMainOrderAmount: (params: { orderType: number }) =>
    get("/get-mainorders-amount", { params }),

  updateOrder: (data: number[], params: { Status: 1 | 2 | 7 }) =>
    put("/update-order", data, { params }),

  updateNote: (params: { Id: number; Note: string }) =>
    put(`/update-note`, undefined, { params }),

  updateStaff: (params: { Id?: number; StaffId: number; Type: number }) =>
    put("/update-staff", undefined, { params }),

  updateNotiPrice: (data: TOrder) => put("/update-notiprice", data),

  exportExcel: (params: Partial<TPaginationParams & TFilterParams> | any) =>
    post("/export-excel", undefined, { params }),

  getNumberOfOrder: (params: {
    orderType: number;
    UID: number;
    RoleID?: number;
  }) => get("/number-of-orders", { params }),

  getCountOrder: (params: { UID: number; RoleID: number }) =>
    get("/get-count-order", { params }),

  priceInMonth: (params: any) => get("/price-in-month", { params }),

  // updateDeliveryPrice: (data: { Id: number | undefined; feeWeight: number }) =>
  //   put("/update-delivery-price", data),
  // updateWeight: (data: { Id: number; tqvnWeight: number }) =>
  //   put("/update-weight", data),
} as const;
