import router from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import {
  CreateOrderSelect,
  CreateOrderTable,
  FormCheckbox,
  FormInput,
  IconButton,
  UserLayout,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useDeepEffect } from "~/hooks";
import { useCatalogue } from "~/hooks/useCatalogue";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);
  if (!newUser) return null;

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: !!newUser,
    warehouseVNEnabled: !!newUser,
    shippingTypeToWarehouseEnabled: !!newUser,
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

  const { control, reset, handleSubmit } = useForm<TUserCreateOrder>({
    mode: "onBlur",
    defaultValues: {
      Products: defaultValuesProducts,
      IsPacked: false,
      IsCheckProduct: false,
      IsInsurance: false,
      IsFastDelivery: false,
    },
  });

  const { append, fields, remove } = useFieldArray({
    name: "Products",
    control,
    keyName: "Id",
  });

  useDeepEffect(() => {
    reset({
      Products: defaultValuesProducts,
      IsPacked: false,
      IsCheckProduct: false,
      IsInsurance: false,
      IsFastDelivery: false,
    });
  }, [warehouseTQ, warehouseVN, shippingTypeToWarehouse]);

  const _onPress = async (data: TUserCreateOrder) => {
    const id = toast.loading("Đang xử lý ...");
    mainOrder
      .addAnother({ ...data, UID: newUser?.UserId })
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
      });
  };

  return (
    <>
      <div className="titlePageUser">Tạo đơn mua hộ</div>
      <div className="tableBox">
        <CreateOrderSelect
          {...{
            control,
            warehouseTQCatalogue: warehouseTQ,
            warehouseVNCatalogue: warehouseVN,
            shippingTypeToWarehouseCatalogue: shippingTypeToWarehouse,
            append,
          }}
        />
        {fields.length > 0 && (
          <>
            <CreateOrderTable
              {...{
                control,
                data: fields,
                remove,
              }}
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8 lg:mt-4">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1 grid grid-cols-2 gap-2">
                  <FormCheckbox
                    control={control}
                    name="IsPacked"
                    defaultChecked={false}
                    label="Đóng gỗ"
                  />
                  <FormCheckbox
                    control={control}
                    name="IsCheckProduct"
                    defaultChecked={false}
                    label="Kiểm hàng"
                  />
                  <FormCheckbox
                    control={control}
                    name="IsInsurance"
                    defaultChecked={false}
                    label="Bảo hiểm"
                  />
                  <FormCheckbox
                    control={control}
                    name="IsFastDelivery"
                    defaultChecked={false}
                    label="Giao hàng tại nhà"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
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
              <div className="col-span-2 lg:col-span-1 flex items-end justify-end">
                <IconButton
                  icon="fas fa-check-circle"
                  title="Tạo đơn hàng"
                  onClick={handleSubmit(_onPress)}
                  showLoading
                  toolip=""
                  btnClass="!bg-orange !text-white"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

Index.displayName = SEOHomeConfigs.buyGroceries.createOderPageTMDT;
Index.Layout = UserLayout;

export default Index;
