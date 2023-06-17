import router from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { mainOrder, user } from "~/api";
import {
  CreateOrderSelect,
  CreateOrderTable,
  FormCheckbox,
  FormInput,
  IconButton,
  Layout,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);
  if (!newUser) return null;

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

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: !!newUser,
    warehouseVNEnabled: !!newUser,
    shippingTypeToWarehouseEnabled: !!newUser,
  });

  const { control, reset, handleSubmit, resetField } =
    useForm<TUserCreateOrder>({
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
    {
      enabled: !!newUser,
    }
  );

  const _onPress = (data: TUserCreateOrder) => {
    const id = toast.loading("Đang xử lý ...");
    mainOrder
      .addAnother({ ...data })
      .then(() => {
        toast.update(id, {
          render: "Tạo đơn thành công!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        router.push("/manager/order/order-list?q=3");
      })
      .catch((error) => {
        toast.update(id, {
          render: "Tạo đơn thất bại!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      });
  };

  return (
    <>
      <div className="breadcrumb-2">Tạo đơn mua hộ khác</div>
      <div className="tableBox pt-4">
        <CreateOrderSelect
          {...{
            control,
            warehouseTQCatalogue: warehouseTQ,
            warehouseVNCatalogue: warehouseVN,
            shippingTypeToWarehouseCatalogue: shippingTypeToWarehouse,
            append,
            user: userList?.Items,
          }}
        />
        {fields.length > 0 && (
          <>
            <CreateOrderTable
              {...{
                control,
                data: fields,
                remove,
                append,
              }}
            />
            <div className="grid grid-cols-5 gap-4 mt-4">
              <div className="flex col-span-3">
                <FormInput
                  label="Ghi chú toàn đơn hàng"
                  control={control}
                  name="UserNote"
                  placeholder={""}
                  required={false}
                  inputContainerClassName="w-[300px] flex flex-col items-baseline mr-5"
                />
                <div className="grid grid-cols-2">
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
                    label="Giao hàng"
                  />
                </div>
              </div>
              <div className="col-span-2 flex items-end justify-end">
                <IconButton
                  icon="fas fa-check-circle"
                  title="Tạo đơn hàng"
                  onClick={handleSubmit(_onPress)}
                  showLoading
                  toolip=""
                  btnClass="!bg-orange !text-white col-span-1"
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
Index.Layout = Layout;

export default Index;
