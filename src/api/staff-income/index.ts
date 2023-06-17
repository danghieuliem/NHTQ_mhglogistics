import BaseAPI from "../methods";

type TFilterParams = {
  Status: number;
  FromDate: string;
  ToDate: string;
  UserName: string;
  RoleID: number;
  UID: number;
};

const { globalCRUD, post, put } = new BaseAPI<any, TFilterParams>(
  "staff-income"
);

export const staffIncome = {
  ...globalCRUD,

  exportExcel: (params: Partial<TPaginationParams & TFilterParams>) =>
    post("/export-excel", undefined, { params }),

  payment: (params: {
    /**
     * 1. Thanh toán theo id (1 người)
     * 2. Thanh toán tất cả (nhiều người)
     */
    Type: 1 | 2;
    Id?: number;
  }) => put("/payment", undefined, { params }),
};
