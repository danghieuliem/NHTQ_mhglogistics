import { Divider, Popover } from "antd";
import router from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { mainOrder, user } from "~/api";
import {
  ActionButton,
  CreateOrderSelect,
  CreateOrderTable,
  FormCheckbox,
  FormInput,
  Layout,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

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
    warehouseTQEnabled: true,
    warehouseVNEnabled: true,
    shippingTypeToWarehouseEnabled: true,
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

  const _onPress = (data: TUserCreateOrder) => {
    const id = toast.loading("Đang xử lý ...");
    mainOrder
      .addAnother({ ...data })
      .then(() => {
        toast.update(id, {
          render: "Tạo đơn thành công!",
          type: "success",
          isLoading: false,
          autoClose: 500,
        });
        router.push("/manager/order/order-list?q=3");
      })
      .catch((error) => {
        toast.update(id, {
          render: "Tạo đơn thất bại!",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      });
  };

  return (
    <>
      <div className="flex w-fit ml-auto">
        <ActionButton
          title="Thêm"
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
          icon="fas fa-plus-circle"
          isButton
          isButtonClassName="bg-green !text-white mr-2"
        />
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          content={
            <div className="grid grid-cols-4 p-4 w-[500px]">
              <div className="col-span-4 grid grid-col-2">
                <CreateOrderSelect
                  {...{
                    control,
                    warehouseTQCatalogue: warehouseTQ,
                    warehouseVNCatalogue: warehouseVN,
                    shippingTypeToWarehouseCatalogue: shippingTypeToWarehouse,
                    append,
                    userList: userList?.Items,
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
Index.breadcrumb = "Tạo đơn hàng mua hộ khác";
Index.Layout = Layout;

export default Index;
