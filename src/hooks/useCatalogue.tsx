import { useQuery } from "react-query";
import { catalogue } from "~/api";
import { permitObject } from "~/api/permit-object";
import { toast } from "~/components";

// thời gian sẽ api loại 1 lần // 5 là số phút + 6 * 10000 là 1 phút  =  5 phút
const staleTime = 5 * 6 * 10000;
// bắt đầu thực thi từ thời gian
const initialDataUpdatedAt = new Date().getTime();
// api error

type TProps = {
  userGroupEnabled?: boolean;
  userLevelEnabled?: boolean;
  userSaleEnabled?: boolean;
  userOrderEnabled?: boolean;
  controllerEnabled?: boolean;
  warehouseTQEnabled?: boolean;
  warehouseVNEnabled?: boolean;
  shippingTypeToWarehouseEnabled?: boolean;
  shippingTypeToVNEnabled?: boolean;
  bankEnabled?: boolean;
  clientEnabled?: boolean;
  pageTypeEnabled?: boolean;
  bigPackageEnabled?: boolean;
};

export const useCatalogue = ({
  controllerEnabled = false,
  userGroupEnabled = false,
  userLevelEnabled = false,
  userOrderEnabled = false,
  userSaleEnabled = false,
  warehouseTQEnabled = false,
  warehouseVNEnabled = false,
  shippingTypeToWarehouseEnabled = false,
  shippingTypeToVNEnabled = false,
  bankEnabled = false,
  clientEnabled = false,
  pageTypeEnabled = false,
  bigPackageEnabled = false,
}: TProps) => {
  // const onError = toast.error;
  const userGroup = useQuery(
    ["userGroupCatalogue"],
    async () => await catalogue.getUserGroup().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: userGroupEnabled,
      // retry: false,
    }
  );

  const userLevel = useQuery(
    ["userLevelCatalogue"],
    async () => await catalogue.getUserLevel().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: userLevelEnabled,
      // retry: false,
    }
  );

  const userSale = useQuery(
    ["userSaleCatalogue"],
    async () =>
      await catalogue.getUser({ UserGroupId: 7 }).then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: userSaleEnabled,
      // retry: false,
    }
  );

  const userOrder = useQuery(
    ["userOrderCatalogue"],
    async () =>
      await catalogue.getUser({ UserGroupId: 4 }).then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: userOrderEnabled,
      // retry: false,
    }
  );

  const client = useQuery(
    ["clientCatalogue"],
    async () =>
      await catalogue.getUser({ UserGroupId: 2 }).then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: clientEnabled,
      // retry: false,
    }
  );

  const controller = useQuery(
    ["controllerCatalogue"],
    async () => await permitObject.getControllerList().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: controllerEnabled,
      // retry: false,
    }
  );

  const warehouseTQ = useQuery(
    ["warehouseTQCatalogue"],
    async () =>
      await catalogue.getWarehouseTQ().then((res) => {
        // console.log("chổ này nè : ", res);
        return res.Data;
      }),
    {
      // staleTime,
      // initialDataUpdatedAt,
      // onError,
      // enabled: warehouseTQEnabled,
      // retry: false,
    }
  );

  const warehouseVN = useQuery(
    ["warehouseVNCatalogue"],
    async () => await catalogue.getWarehouseVN().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: warehouseVNEnabled,
      // retry: false,
    }
  );

  const shippingTypeToWarehouse = useQuery(
    ["shippingTypeToWarehouseCatalogue"],
    async () =>
      await catalogue.getShippingTypeToWarehouse().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: shippingTypeToWarehouseEnabled,
      // retry: false,
    }
  );

  const shippingTypeToVN = useQuery(
    ["shippingTypeToVNCatalogue"],
    async () => await catalogue.getShippingTypeVN().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: shippingTypeToVNEnabled,
      // retry: false,
    }
  );

  const bank = useQuery(
    ["bankCatalogue"],
    async () => await catalogue.getBank().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: bankEnabled,
      // retry: false,
    }
  );

  const pageType = useQuery(
    ["pageCatalogue"],
    async () => await catalogue.getPageTypeCatalogue().then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: pageTypeEnabled,
      // retry: false,
    }
  );

  const bigPackage = useQuery(
    ["bigPackageCatalogue"],
    async () =>
      await catalogue
        .getBigPackageCatalogue({ Status: 0 })
        .then((res) => res.Data),
    {
      staleTime,
      initialDataUpdatedAt,
      // onError,
      enabled: bigPackageEnabled,
      // retry: false,
    }
  );

  return {
    userGroup: userGroup.data,
    userLevel: userLevel.data,
    userSale: userSale.data,
    userOrder: userOrder.data,
    controller: controller.data,
    warehouseTQ: warehouseTQ.data,
    warehouseVN: warehouseVN.data,
    shippingTypeToWarehouse: shippingTypeToWarehouse.data,
    bank: bank.data,
    shippingTypeToVN: shippingTypeToVN.data,
    client: client.data,
    pageType: pageType.data,
    bigPackage: bigPackage.data,
  } as const;
};
