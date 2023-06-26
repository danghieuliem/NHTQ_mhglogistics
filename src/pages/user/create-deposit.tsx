import { Divider, Popover } from "antd";
import router from "next/router";
import React from "react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { transportationOrder } from "~/api";
import {
  ActionButton,
  CreateDepositSelect,
  CreateDepositTable,
  IconButton,
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
    (state: RootState) => state.userCurretnInfo
  );

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: true,
    warehouseVNEnabled: true,
    shippingTypeToWarehouseEnabled: true,
  });

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
              OrderTransactionCode: null,
              Category: null,
              UserNote: null,
              FeeShip: 0,
            },
          ],
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
          isButton
          isButtonClassName="bg-green !text-white mr-2"
        />
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          content={
            <div className="grid grid-cols-4 p-4 w-[500px]">
              <div className="col-span-4 grid grid-col-2">
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
            icon="mr-0"
            title="Tiêp tục"
            isButton
            isButtonClassName="bg-sec !text-white"
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
