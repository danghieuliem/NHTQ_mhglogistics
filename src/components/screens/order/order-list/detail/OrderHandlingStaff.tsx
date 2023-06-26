import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSelect } from "~/components";

type TProps = {
  data: TOrder;
  userSaleCatalogue: TUserCatalogue[];
  userOrderCatalogue: TUserCatalogue[];
  loading: boolean;
  RoleID: number;
};

export const OrderHandlingStaff: React.FC<TProps> = ({
  data,
  userOrderCatalogue,
  userSaleCatalogue,
  loading,
  RoleID,
}) => {
  const { control } = useFormContext<TOrder>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormSelect
        control={control}
        name="SalerId"
        data={userSaleCatalogue}
        select={{ label: "UserName", value: "Id" }}
        defaultValue={
          data?.SalerUserName &&
          data?.SalerId && {
            UserName: data?.SalerUserName,
            Id: data?.SalerId,
          }
        }
        placeholder="Nhân viên saler"
        label="Nhân viên saler"
        isClearable
        required={false}
        disabled={!(RoleID === 1 || RoleID === 3 || RoleID !== 4)}
      />
      <FormSelect
        control={control}
        name="DatHangId"
        data={userOrderCatalogue}
        select={{ label: "UserName", value: "Id" }}
        defaultValue={
          data?.OrdererUserName &&
          data?.DatHangId && {
            UserName: data?.OrdererUserName,
            Id: data?.DatHangId,
          }
        }
        placeholder="Nhân viên đặt hàng"
        label="Nhân viên đặt hàng"
        isClearable
        required={false}
        disabled={!(RoleID === 1 || RoleID === 3 || RoleID !== 4)}
      />
    </div>
  );
};
