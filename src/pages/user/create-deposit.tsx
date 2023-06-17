import router from "next/router";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { transportationOrder } from "~/api";
import {
  CreateDepositSelect,
  CreateDepositTable,
  IconButton,
  toast,
  UserLayout,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useDeepEffect } from "~/hooks";
import { useCatalogue } from "~/hooks/useCatalogue";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { user } = useAppSelector(selectUser);
  // if (!user) return null;

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
          UID: user.UserId,
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
    <div
      style={{
        pointerEvents: loading ? "none" : "all",
      }}
    >
      <div className="titlePageUser">Tạo đơn ký gửi</div>
      <div className="tableBox">
        <CreateDepositSelect
          {...{
            control,
            warehouseTQCatalogue: warehouseTQ,
            warehouseVNCatalogue: warehouseVN,
            shippingTypeToWarehouseCatalogue: shippingTypeToWarehouse,
            append,
          }}
          user={user}
        />

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
            icon={loading ? "fas fa-sync fa-spin" : "fas fa-check-circle"}
            title="Tạo đơn hàng"
            btnClass="mt-4 !bg-orange !text-white"
            toolip=""
            btnIconClass=""
          />
        </div>
      </div>
    </div>
  );
};

Index.displayName = SEOHomeConfigs.consignmentShipping.createOderDeposit;
Index.Layout = UserLayout;

export default Index;
