import { Divider, Popover } from "antd";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { transportationOrder } from "~/api";
import {
  ActionButton,
  CreateDepositSelect,
  CreateDepositTable,
  UserLayout,
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

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: true,
    warehouseVNEnabled: true,
    shippingTypeToWarehouseEnabled: true,
  });

  const { control, reset, handleSubmit, setValue, watch } =
    useForm<TUserCreateDeposit>({
      mode: "onBlur",
      defaultValues: {
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
        ShippingTypeId: shippingTypeToWarehouse?.find(
          (x) => x.Id === userCurrentInfo?.ShippingType
        )?.Id,
        WareHouseFromId: warehouseTQ?.find(
          (x) => x.Id === userCurrentInfo?.WarehouseFrom
        )?.Id,
        WareHouseId: warehouseVN?.find(
          (x) => x.Id === userCurrentInfo?.WarehouseTo
        )?.Id,
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "smallPackages",
    keyName: "Id",
  });

  useDeepEffect(() => {
    reset({
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
      ShippingTypeId: shippingTypeToWarehouse?.find(
        (x) => x.Id === userCurrentInfo?.ShippingType
      )?.Id,
      WareHouseFromId: warehouseTQ?.find(
        (x) => x.Id === userCurrentInfo?.WarehouseFrom
      )?.Id,
      WareHouseId: warehouseVN?.find(
        (x) => x.Id === userCurrentInfo?.WarehouseTo
      )?.Id,
    });
  }, [warehouseTQ, warehouseVN, shippingTypeToWarehouse]);

  const mutationAdd = useMutation(
    (data: TUserCreateDeposit) => transportationOrder.create(data),
    {
      onSuccess: () => {
        toast.success("Tạo đơn hàng ký gửi thành công");
        reset({
          UID: userCurrentInfo.Id,
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
          ShippingTypeId: shippingTypeToWarehouse?.find(
            (x) => x.Id === userCurrentInfo?.ShippingType
          )?.Id,
          WareHouseFromId: warehouseTQ?.find(
            (x) => x.Id === userCurrentInfo?.WarehouseFrom
          )?.Id,
          WareHouseId: warehouseVN?.find(
            (x) => x.Id === userCurrentInfo?.WarehouseTo
          )?.Id,
        });
        queryClient.invalidateQueries({ queryKey: "menuData" });
        router.push("/user/deposit-list");
      },
      onError: (error) => {
        toast.error(error);
        setLoading(false);
      },
    }
  );

  const _onPress = (data: TUserCreateDeposit) => {
    setLoading(true);
    let flat = true;
    data.smallPackages.forEach((item) => {
      if (!item.Category || !item.Amount) {
        toast.warning("Loại sản phẩm hoặc số lượng đang để trống!");
        flat = false;
        setLoading(false);
        return;
      }
    });

    if (flat) {
      delete data.UID;
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
            <div className="grid p-4 sm:w-[500px]">
              <CreateDepositSelect
                {...{
                  control,
                  warehouseTQCatalogue: warehouseTQ,
                  warehouseVNCatalogue: warehouseVN,
                  shippingTypeToWarehouseCatalogue: shippingTypeToWarehouse,
                  append,
                }}
                user={userCurrentInfo}
              />
              <Divider className="!my-4" />
              <div className="flex items-end justify-end">
                <ActionButton
                  onClick={handleSubmit(_onPress)}
                  icon="fas fa-check-circle"
                  disabled={loading}
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
Index.breadcrumb = "Tạo đơn ký gửi";
Index.Layout = UserLayout;

export default Index;
