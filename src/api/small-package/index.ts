import { ESmallPackageStatusData } from "./../../configs/appConfigs";
import BaseAPI from "../methods";

type TFilterParams = {
  UID?: number;
  MainOrderId?: number;
  BigPackageId?: number;
  SearchType?: TSearchType;
  FromDate?: string;
  ToDate?: string;
  Status?: ESmallPackageStatusData;
  Menu?: TMenu;
};

const { globalCRUD, post, put, get } = new BaseAPI<
  TSmallPackage,
  TFilterParams
>("small-package");

export const smallPackage = {
  ...globalCRUD,

  create: (
    data: Partial<(TWarehouseVN | TWarehouseCN) & TAddtionalFieldWarehouse>
  ) => post<(TWarehouseVN | TWarehouseCN)[]>(undefined, data),

  update: (
    data: Partial<(TWarehouseVN | TWarehouseCN) & TAddtionalFieldWarehouse>[]
  ) => put(undefined, data),

  confirm: (data: { id: number; phone: number; note: string; image: string }) =>
    put(`/confirm`, data),

  getByTransactionCode: (params: {
    TransactionCode: string;
    IsAssign?: boolean;
  }) =>
    get<(TWarehouseVN | TWarehouseCN)[]>("/get-by-transaction-code", {
      params,
    }),

  updateIsLost: (id: number) =>
    put("/update-is-lost", undefined, { params: { id } }),

  getExportForUsername: (params: {
    UID?: number;
    OrderId?: number;
    StatusType?: number;
    OrderType?: number;
  }) =>
    get<(TWarehouseCN | TWarehouseVN)[]>("/get-export-for-username", {
      params,
    }),

  getExportForBarcode: (params: {
    UID?: number;
    Barcode?: string;
    StatusType?: number;
  }) =>
    get<(TWarehouseCN | TWarehouseVN | TSmallPackage)[]>(
      "/get-export-for-barcode",
      { params }
    ),
  exportExcel: (params) => post("/export-excel", undefined, { params }),

  getTemplateImport: async () => get("/download-template-import"),

  postImportPackage: async (data: TImport) =>
    post("/import-template-file", data),
};
