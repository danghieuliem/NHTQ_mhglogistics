import BaseAPI from "../methods";
import queryString from "query-string";

type TFilterParams = {
  Status: number;
  UID: number;
  RoleID: number;
  TypeSearch: number;
  FromDate?: string;
  ToDate?: string;
};

const { globalCRUD, put, get, post } = new BaseAPI<TUserDeposit, TFilterParams>(
  "transportation-order"
);

export const transportationOrder = {
  ...globalCRUD,

  cancelOrder: (params: Partial<TUserDeposit>) =>
    put(`/cancel-${params.Id}`, undefined, { params }),

  getBillingInfo: (params: { IsAll?: boolean; ListID: number[] }) =>
    get<TUserDepositBillingInfo>(
      `/get-billing-info?${queryString.stringify({
        ListID: params.ListID,
      })}&IsAll=${params.IsAll}`
    ),

  makePayment: (ids: number[]) => put<null>(`/payemnt-order`, ids),

  addOrderFor: (data: TUserCreateDeposit) => post("/add-order-for", data),
  exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
    post("/export-excel", undefined, { params }),

  getAmountList: () => get("/get-transportations-amount"),
  getAmountInfo: (params: { UID: number; RoleID?: number }) =>
    get("/get-transportations-infor", { params }),
  updateStaff: (data: { Id: number; SalerID: number }) =>
    put("/update-staff", data),
};
