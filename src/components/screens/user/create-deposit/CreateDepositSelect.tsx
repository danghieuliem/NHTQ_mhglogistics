import { useRouter } from "next/router";
import { FC } from "react";
import { useSelector } from "react-redux";
import { FormSelect } from "~/components";
import { RootState } from "~/store";
import { TControl } from "~/types/field";

type TProps = TControl<TUserCreateDeposit> & {
  user: any;
  warehouseTQCatalogue: TWarehouseTQCatalogue[];
  warehouseVNCatalogue: TWarehouseVNCatalogue[];
  shippingTypeToWarehouseCatalogue: TShippingTypeToWarehouse[];
};

const infoContainer = "col-span-2";

export const CreateDepositSelect: FC<TProps> = ({
  user,
  control,
  warehouseTQCatalogue,
  shippingTypeToWarehouseCatalogue,
  warehouseVNCatalogue,
  append,
}) => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {!router.asPath.match("/user/") && (
          <div className={infoContainer}>
            <FormSelect
              data={user}
              label="Username"
              control={control}
              name="UID"
              placeholder="Khách hàng"
              select={{ label: "UserName", value: "Id" }}
              rules={{ required: "This field is required" }}
            />
          </div>
        )}
        <div className={infoContainer}>
          <FormSelect
            label="Phương thức vận chuyển"
            data={shippingTypeToWarehouseCatalogue}
            control={control}
            name="ShippingTypeId"
            placeholder="Phương thức"
            rules={{ required: "This field is required" }}
            select={{ label: "Name", value: "Id" }}
          />
        </div>
        <div className={infoContainer}>
          <FormSelect
            label="Kho Trung Quốc"
            data={warehouseTQCatalogue}
            control={control}
            name="WareHouseFromId"
            placeholder="Kho Trung Quốc"
            rules={{ required: "This field is required" }}
            select={{ label: "Name", value: "Id" }}
          />
        </div>
        <div className={infoContainer}>
          <FormSelect
            label="Kho Việt Nam"
            data={warehouseVNCatalogue}
            control={control}
            name="WareHouseId"
            placeholder="Kho Việt Nam"
            rules={{ required: "This field is required" }}
            select={{ label: "Name", value: "Id" }}
          />
        </div>
      </div>
    </>
  );
};
