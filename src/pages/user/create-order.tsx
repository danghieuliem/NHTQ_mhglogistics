import { Divider, Popover } from "antd";
import router from "next/router";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import {
  ActionButton,
  CreateOrderSelect,
  CreateOrderTable,
  FormCheckbox,
  FormInput,
  UserLayout
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useDeepEffect } from "~/hooks";
import { useCatalogue } from "~/hooks/useCatalogue";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);

  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: true,
    warehouseVNEnabled: true,
    shippingTypeToWarehouseEnabled: true,
  });

  const defaultValuesProducts = [
    {
      ImageProduct: null,
      LinkProduct: null,
      NameProduct: null,
      NoteProduct: null,
      PriceProduct: null,
      PropertyProduct: null,
      QuantityProduct: null,
    },
  ];

  const defaultValues = {
    Products: defaultValuesProducts,
    IsPacked: false,
    IsCheckProduct: false,
    IsInsurance: false,
    IsFastDelivery: false,
    ShippingType: shippingTypeToWarehouse?.find(x => x.Id === userCurrentInfo?.ShippingType)?.Id,
    WarehouseTQ: warehouseTQ?.find(x => x.Id === userCurrentInfo?.WarehouseFrom)?.Id,
    WarehouseVN: warehouseVN?.find(x => x.Id === userCurrentInfo?.WarehouseTo)?.Id,
  }

  const { control, reset, handleSubmit, formState: {isSubmitting}} = useForm<TUserCreateOrder>({
    mode: "onBlur",
    defaultValues: defaultValues,
  });

  const { append, fields, remove } = useFieldArray({
    name: "Products",
    control,
    keyName: "Id",
  });

  useDeepEffect(() => {
    reset(defaultValues);
  }, [warehouseTQ, warehouseVN, shippingTypeToWarehouse]);

  const _onPress = async (data: TUserCreateOrder) => {
    setLoading(true);
    const id = toast.loading("Đang xử lý ...");
    mainOrder
      .addAnother({ ...data, UID: userCurrentInfo?.Id })
      .then(() => {
        toast.update(id, {
          render: "Tạo đơn thành công!",
          isLoading: false,
          type: "success",
          autoClose: 10000,
        });
        router.push("/user/order-list?q=3");
      })
      .catch((error) => {
        toast.update(id, {
          render: "Tạo đơn thất bại!",
          isLoading: false,
          type: "error",
          autoClose: 10000,
        });
      })
      .finally(() => setLoading(false))
  };

  return (
    <>
      <div className="flex w-fit ml-auto">
        <ActionButton
          title="Thêm sản phẩm"
          onClick={() =>
            append({
              Id: new Date().getTime(),
              ImageProduct: null,
              LinkProduct: null,
              NameProduct: null,
              NoteProduct: null,
              PriceProduct: null,
              PropertyProduct: null,
              QuantityProduct: null,
            })
          }
          icon="far fa-plus"
          isButton
          isButtonClassName="bg-green !text-white mr-2"
        />
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          content={
            <div className="grid grid-cols-4 p-4 w-[500px] max-w-[90vw]">
              <div className="col-span-4 grid grid-col-2">
                <CreateOrderSelect
                  {...{
                    control,
                    warehouseTQCatalogue: warehouseTQ,
                    warehouseVNCatalogue: warehouseVN,
                    shippingTypeToWarehouseCatalogue: shippingTypeToWarehouse,
                    append,
                  }}
                />
              </div>
              <div className="col-span-4">
                <Divider className="!my-4" />
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-4">
                <div className="col-span-2 grid grid-cols-2">
                  <div className="col-span-1">
                    <FormCheckbox
                      control={control}
                      name="IsPacked"
                      defaultChecked={false}
                      label="Đóng gỗ"
                    />
                  </div>
                  <div className="col-span-1">
                    <FormCheckbox
                      control={control}
                      name="IsCheckProduct"
                      defaultChecked={false}
                      label="Kiểm hàng"
                    />
                  </div>
                  <div className="col-span-1">
                    <FormCheckbox
                      control={control}
                      name="IsInsurance"
                      defaultChecked={false}
                      label="Bảo hiểm"
                    />
                  </div>
                  <div className="col-span-1">
                    <FormCheckbox
                      control={control}
                      name="IsFastDelivery"
                      defaultChecked={false}
                      label="Giao hàng"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <FormInput
                    label="Ghi chú toàn đơn hàng"
                    control={control}
                    name="UserNote"
                    placeholder={""}
                    required={false}
                    inputContainerClassName=""
                  />
                </div>
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
                  disabled={loading}
                  isButtonClassName="bg-main !text-white"
                />
              </div>
            </div>
          }
        >
          <ActionButton
            icon="mr-0"
            title="Tiếp tục"
            isButton
            isButtonClassName="bg-sec !text-white"
          />
        </Popover>
      </div>

      {fields.length > 0 && (
        <CreateOrderTable
          {...{
            control,
            data: fields,
            remove,
            append,
          }}
        />
      )}
    </>
  );
};

Index.displayName = SEOHomeConfigs.buyGroceries.createOderPageTMDT;
Index.breadcrumb = "Tạo đơn mua hộ khác";
Index.Layout = UserLayout;

export default Index;
