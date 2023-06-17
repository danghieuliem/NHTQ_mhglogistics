import BaseAPI from "../methods";

type TFilterParams = { UID?: number; Type?: number; Status: number };

const { globalCRUD, put, gGetPermissionDetail, post } = new BaseAPI<
  TRechargeRMB | TWithDraw,
  TFilterParams
>("withdraw");

export const withdraw = {
  ...globalCRUD,
  gGetPermissionDetail,
  updateStatusCancel: async (data: TRechargeRMB) => put("/update-status", data),
  exportExcel: (params) => post("/export-excel", undefined, { params }),
};
