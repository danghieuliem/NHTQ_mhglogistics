import BaseAPI from "../methods";

type TFilterParams = {
  UID: number;
  Status: number;
  FromDate: string;
  ToDate: string;
  OrderType: number;
};

const { globalCRUD, put, get, post } = new BaseAPI<
  TRequestPaymentOrder,
  TFilterParams
>("pay-help");

export const payHelp = {
  ...globalCRUD,

  updatePayHelp: (data: { id: number; status: number }) =>
    put(`/update-pay-help`, data),

  getExchangeRate: (price: number) =>
    get<number>(`/get-exchange-rate/${price}`, { params: { price } }),

  exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
    post("/export-excel", undefined, { params }),

  confirm: (id: number) => put("/confirm", { id }),
};
