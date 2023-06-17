import router from "next/router";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { transportationOrder, user } from "~/api";
import {
  CreateDepositSelect,
  CreateDepositTable,
  IconButton,
  Layout,
  toast,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useDeepEffect } from "~/hooks";
import { useCatalogue } from "~/hooks/useCatalogue";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);
  if (!newUser) return null;

  const { data: userList } = useQuery(
    [],
    () =>
      user
        .getList({
          UID: newUser?.UserId,
          RoleID: newUser?.UserGroupId,
        })
        .then((res) => {
          return res?.Data;
        }),
    { enabled: !!newUser }
  );

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: !!newUser,
    warehouseVNEnabled: !!newUser,
    shippingTypeToWarehouseEnabled: !!newUser,
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
          WareHouseFromId: warehouseTQ?.[0]?.Id,
          WareHouseId: warehouseVN?.[0]?.Id,
          ShippingTypeId: shippingTypeToWarehouse?.[0]?.Id,
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
      <div className="breadcrumb-2">Tạo đơn hàng ký gửi</div>
      <div className="tableBox pt-4">
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
        {/* {fields.length > 0 && (
					<> */}
        {/* <p className="titleTable">Danh sách kiện ký gửi</p> */}
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
        <div className="text-right px-4">
          <IconButton
            showLoading
            onClick={handleSubmit(_onPress)}
            icon="fas fa-check-circle"
            title="Tạo đơn hàng"
            btnClass="mt-4 !bg-orange !text-white"
            toolip=""
            btnIconClass=""
          />
        </div>
        {/* </>
				)} */}
      </div>
    </React.Fragment>
  );
};

Index.displayName = SEOHomeConfigs.consignmentShipping.createOderDeposit;
Index.Layout = Layout;

export default Index;
