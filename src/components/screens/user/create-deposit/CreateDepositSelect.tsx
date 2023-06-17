import React, { FC } from "react";
import { FormSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { useAppSelector } from "~/store";
import { TControl } from "~/types/field";

type TProps = TControl<TUserCreateDeposit> & {
  user: any;
  warehouseTQCatalogue: TWarehouseTQCatalogue[];
  warehouseVNCatalogue: TWarehouseVNCatalogue[];
  shippingTypeToWarehouseCatalogue: TShippingTypeToWarehouse[];
};

const infoContainer = "col-span-2";
const listBox = "flex items-center justify-end mt-4 w-full";

export const CreateDepositSelect: FC<TProps> = ({
  user,
  control,
  warehouseTQCatalogue,
  shippingTypeToWarehouseCatalogue,
  warehouseVNCatalogue,
  append,
}) => {
  const { current: newUser } = useAppSelector((state) => state.user);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <div className={infoContainer}>
          {user?.UserId === newUser?.UserId ? (
            <div className="mt-2 xl:mt-0 w-full hidden lg:block">
              <FormSelect
                data={user}
                control={control}
                name="UID"
                placeholder=""
                label="Username"
                select={{ label: "UserName", value: "Id" }}
                defaultValue={{
                  UserName: newUser?.UserName,
                  Id: newUser?.UserId,
                }}
                disabled
                required={false}
              />
            </div>
          ) : (
            <div className="mt-2 xl:mt-0 w-full">
              <FormSelect
                data={user}
                label="Username"
                control={control}
                name="UID"
                placeholder="Chọn khách hàng"
                select={{ label: "UserName", value: "Id" }}
                rules={{ required: "This field is required" }}
              />
            </div>
          )}
        </div>
        <div className={infoContainer}>
          <div className="w-full">
            <div className="mt-2 xl:mt-0 w-full">
              <FormSelect
                label="Phương thức vận chuyển"
                data={shippingTypeToWarehouseCatalogue}
                control={control}
                name="ShippingTypeId"
                placeholder="Chọn phương thức vận chuyển"
                rules={{ required: "This field is required" }}
                select={{ label: "Name", value: "Id" }}
              />
            </div>
          </div>
        </div>
        <div className={infoContainer}>
          <div className="w-full">
            <div className="mt-2 xl:mt-0 w-full">
              <FormSelect
                label="Kho Trung Quốc"
                data={warehouseTQCatalogue}
                control={control}
                name="WareHouseFromId"
                placeholder="Chọn kho Trung Quốc"
                rules={{ required: "This field is required" }}
                select={{ label: "Name", value: "Id" }}
              />
            </div>
          </div>
        </div>
        <div className={infoContainer}>
          <div className="w-full">
            <div className="mt-2 xl:mt-0 w-full">
              <FormSelect
                label="Kho đích"
                data={warehouseVNCatalogue}
                control={control}
                name="WareHouseId"
                placeholder="Chọn kho đích"
                rules={{ required: "This field is required" }}
                select={{ label: "Name", value: "Id" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={listBox}>
        <IconButton
          onClick={() =>
            append({
              Amount: null,
              OrderTransactionCode: null,
              Category: null,
              IsCheckProduct: false,
              IsPacked: false,
              IsInsurance: false,
              Kg: 0,
              UserNote: null,
              FeeShip: null,
            })
          }
          title="Thêm kiện"
          icon="far fa-plus"
          btnClass=""
          showLoading
          toolip=""
          green
        />
      </div>
    </>
  );
};
