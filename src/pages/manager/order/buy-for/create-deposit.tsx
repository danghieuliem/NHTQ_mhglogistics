import { Divider, Popover } from "antd";
import router from "next/router";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { transportationOrder, user } from "~/api";
import {
  ActionButton,
  CreateDepositSelect,
  CreateDepositTable,
  Layout,
  toast,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useDeepEffect } from "~/hooks";
import { useCatalogue } from "~/hooks/useCatalogue";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const { data: userList } = useQuery([], () =>
    user
      .getList({
        UID: userCurrentInfo?.Id,
        RoleID: userCurrentInfo?.UserGroupId,
      })
      .then((res) => {
        return res?.Data;
      })
  );

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: true,
    warehouseVNEnabled: true,
    shippingTypeToWarehouseEnabled: true,
  });

  const defaultValues = {
    smallPackages: [
      {
        Amount: 1,
        Category: null,
        IsCheckProduct: false,
        IsPacked: false,
        IsInsurance: false,
        FeeShip: 0,
      },
    ],
    ShippingType: shippingTypeToWarehouse?.find(
      (x) => x.Id === userCurrentInfo?.ShippingType
    )?.Id,
    WarehouseTQ: warehouseTQ?.find(
      (x) => x.Id === userCurrentInfo?.WarehouseFrom
    )?.Id,
    WarehouseVN: warehouseVN?.find((x) => x.Id === userCurrentInfo?.WarehouseTo)
      ?.Id,
  };

  const { control, reset, handleSubmit, setValue } =
    useForm<TUserCreateDeposit>({
      mode: "onBlur",
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "smallPackages",
    keyName: "Id",
  });

  useDeepEffect(() => {
    reset(defaultValues);
  }, [warehouseTQ, warehouseVN, shippingTypeToWarehouse]);

  const mutationAdd = useMutation(
    (data: TUserCreateDeposit) => transportationOrder.create(data),
    {
      onSuccess: () => {
        toast.success("Tạo đơn hàng ký gửi thành công");
        reset(defaultValues);
        router.push("/manager/deposit/deposit-list");
      },
      onError: toast.error,
    }
  );

  const _onPress = (data: TUserCreateDeposit) => {
    let flat = true;
    data.smallPackages.forEach((item) => {
      if (!item.Category || !item.Amount) {
        toast.warning("Loại sản phẩm hoặc số lượng đang để trống!");
        flat = false;
        return;
      }
    });

    if (flat) {
      mutationAdd.mutateAsync(data);
    }
  };

  return (
    <React.Fragment>
      <div className="flex w-fit ml-auto">
        <ActionButton
          onClick={() =>
            append({
              Amount: 1,
              OrderTransactionCode: null,
              Category: null,
              IsCheckProduct: false,
              IsPacked: false,
              IsInsurance: false,
              Kg: 0,
              UserNote: null,
              FeeShip: 0,
            })
          }
          title="Thêm"
          icon="fas fa-plus-circle"
          isButton
          isButtonClassName="bg-green !text-white mr-2"
        />
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          content={
            <div className="grid grid-cols-4 p-4 sm:w-[500px]">
              <div className="col-span-4 grid grid-col-2">
                <CreateDepositSelect
                  {...{
                    control,
                    warehouseTQCatalogue: warehouseTQ,
                    warehouseVNCatalogue: warehouseVN,
                    shippingTypeToWarehouseCatalogue: shippingTypeToWarehouse,
                    append,
                    user: userList?.Items,
                  }}
                />
              </div>
              <div className="col-span-4">
                <Divider className="!my-4" />
              </div>
              <div className="col-span-4 flex items-end justify-end">
                <ActionButton
                  onClick={handleSubmit(_onPress)}
                  icon="fas fa-check-circle"
                  title="Tạo đơn"
                  isButton
                  isButtonClassName="bg-main !text-white"
                />
              </div>
            </div>
          }
        >
          <ActionButton
            icon="fas fa-hand-point-right"
            title="Tiếp tục"
            isButton
            isButtonClassName="bg-blue !text-white"
          />
        </Popover>
      </div>

      <CreateDepositTable
        {...{
          data: fields,
          control,
          handleSubmit: handleSubmit,
          onPress: _onPress,
          remove,
          setValue,
        }}
      />
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.consignmentShipping.createOderDeposit;
Index.breadcrumb = "Tạo đơn hàng ký gửi";
Index.Layout = Layout;

export default Index;
