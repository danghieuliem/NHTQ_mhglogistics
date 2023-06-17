import BaseAPI from "../methods";

type TFilterParams = {
  FromDate: string;
  ToDate: string;
  Status: number;
  IsPayLoan: boolean;
  IsLoan: boolean;
  UID: number;
};

const { globalCRUD, put, gGetPermissionDetail, post } = new BaseAPI<
  TUserHistoryRechargeVND,
  TFilterParams
>("admin-send-user-wallet");

export const adminSendUserWallet = {
  ...globalCRUD,
  gGetPermissionDetail,
  updateStatusCancel: (params: { Id: number; Status: 2 | 3 }) =>
    put(`/update-status`, undefined, { params }),

  exportExcel: (params) => post("/export-excel", undefined, { params }),
};
