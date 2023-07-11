import { Checkbox, Tooltip } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { orderShopTemp, orderTemp } from "~/api";
import { IconButton } from "~/components/globals/button/IconButton";
import { showToast, toast } from "~/components/toast";
import { setSelectedShopIds, useAppDispatch } from "~/store";
import { _format } from "~/utils";
import { OrderTempItem } from "./OrderTempItem";
import { CheckboxCustom } from "./block";
import { Button } from "~/components";

type TProps = {
  cart: TUserCartOrderShopTemp;
  toggleShopId: (shopId: number) => void;
  checked: boolean;
  note: string;
  handleNote: (key: number, value: string) => void;
  refetchCart: () => void;
};

const TopContainer = ({
  checked,
  toggleShopId,
  cart,
  onHandleShop,
  loading,
  disabled,
}) => {
  return (
    <div className="bg-main p-[8px]">
      <div className="top flex justify-between items-center">
        <Tooltip title="Chọn đặt đơn hàng này">
          <Checkbox
            onChange={() => toggleShopId(cart?.Id)}
            checked={checked}
            className="mr-2"
          ></Checkbox>
          <span className="text-white ml-2 ">
            <span className="mr-2">Tên shop:</span>{" "}
            <span className="text-lg">{cart?.ShopName || cart?.ShopId}</span>
          </span>
        </Tooltip>
        <IconButton
          onClick={() => onHandleShop(cart?.Id)}
          icon={loading ? "fas fa-sync fa-spin" : "fas fa-trash-alt"}
          title=""
          showLoading
          toolip="Xóa cửa hàng"
          btnClass="!text-white hover:!bg-red text-[18px]"
          btnIconClass="!mr-0"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export const CartOrderItem: React.FC<TProps> = ({
  cart,
  note,
  handleNote,
  toggleShopId,
  checked,
  refetchCart,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { getValues, setValue } = useForm<{
    IsPacked: boolean;
    IsFastDelivery: boolean;
    IsInsurance: boolean;
    IsCheckProduct: boolean;
  }>({
    mode: "onBlur",
    defaultValues: {
      IsPacked: cart?.IsPacked,
      IsFastDelivery: cart?.IsFastDelivery,
      IsInsurance: cart?.IsInsurance,
      IsCheckProduct: cart?.IsCheckProduct,
    },
  });

  const mutationDeleteShop = useMutation(orderShopTemp.delete, {
    onSuccess: (_, id) => {
      toast.success("Xoá cửa hàng thành công");
      refetchCart();
      setLoading(true);
    },
    onError: (error) => {
      setLoading(true);
      toast.error;
    },
  });

  const mutationUpdateProduct = useMutation(orderTemp.updateField, {
    onSuccess: (data, params) => {
      toast.success("Cập nhật sản phẩm thành công");
      refetchCart();
    },
    onError: toast.error,
  });

  const mutationDeleteProduct = useMutation(orderTemp.delete, {
    onSuccess: (_, id) => {
      toast.success("Xoá sản phẩm thành công");
      refetchCart();
    },
    onError: toast.error,
  });

  const onPayment = (isPush = false) => {
    localStorage.removeItem(`${cart.Id}`);
    setLoadingPayment(true);
    orderShopTemp
      .updateField({
        ...cart,
        IsPacked: getValues("IsPacked"),
        IsFastDelivery: getValues("IsFastDelivery"),
        IsInsurance: getValues("IsInsurance"),
        IsCheckProduct: getValues("IsCheckProduct"),
      })
      .then(() => {
        if (isPush) {
          dispatch(setSelectedShopIds([cart?.Id]));
          router.push("/user/cart/payment");
        }
      })
      .finally(() => {
        setLoadingPayment(false);
      });
  };

  const onChangeCheckbox = async (
    e: CheckboxChangeEvent,
    type: "IsPacked" | "IsFastDelivery" | "IsInsurance" | "IsCheckProduct"
  ) => {
    setValue(type, e.target.checked);
    onPayment();
  };

  const onHandleProduct = async (
    type: "update" | "delete",
    data: { Id: number; Quantity: number; Brand?: string }
  ) => {
    try {
      if (type === "update") {
        await mutationUpdateProduct.mutateAsync(data);
      } else {
        await mutationDeleteProduct.mutateAsync(data.Id);
      }
    } catch (error) {
      showToast({
        title: (error as any)?.response?.data?.ResultCode,
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
    }
  };

  const onHandleShop = async (id: number) => {
    setLoading(true);
    mutationDeleteShop.mutateAsync(id);
  };
  return (
    <>
      <div className="col-span-12">
        <TopContainer
          checked={checked}
          toggleShopId={toggleShopId}
          cart={cart}
          onHandleShop={onHandleShop}
          loading={loading}
          disabled={loadingPayment}
        />
      </div>
      <div className="col-span-12 md:col-span-9 lg:col-span-9 bg-[#FFF1E4]">
        <OrderTempItem
          data={cart?.OrderTemps}
          onHandleProduct={onHandleProduct}
        />
        {/* {cart?.OrderTemps?.map((orderTempData, index) => (
          <div key={orderTempData?.Id}>
            <OrderTempItem
              {...{
                orderTempData,
                index,
                isLoading:
                  mutationDeleteProduct.isLoading ||
                  mutationUpdateProduct.isLoading,
                deleteProduct: () =>
                  onHandleProduct("delete", {
                    Id: orderTempData?.Id,
                    Quantity: 0,
                  }),
                updateProduct: (Quantity, Brand) =>
                  onHandleProduct("update", {
                    Id: orderTempData?.Id,
                    Quantity,
                    Brand,
                  }),
              }}
            />
          </div>
        ))} */}
      </div>
      <div className="col-span-12 md:col-span-3 lg:col-span-3 bg-[#EBF4FE] p-1 lg:p-4">
        <div className="grid grid-cols-4 md:grid-cols-1 gap-4 lg:gap-6">
          <div className="col-span-4 sm:col-span-2 md:col-span-1">
            <div className=" cartNewWrapper-orders-items-label">
              Dịch vụ tuỳ chọn
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <CheckboxCustom
                  defaultChecked={cart?.IsFastDelivery}
                  onChange={(e) => onChangeCheckbox(e, "IsFastDelivery")}
                  label="Giao tận nhà"
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <CheckboxCustom
                  defaultChecked={cart?.IsCheckProduct}
                  onChange={(e) => onChangeCheckbox(e, "IsCheckProduct")}
                  label="Kiểm hàng"
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <CheckboxCustom
                  defaultChecked={cart?.IsPacked}
                  onChange={(e) => onChangeCheckbox(e, "IsPacked")}
                  label="Đóng gỗ"
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <CheckboxCustom
                  defaultChecked={cart?.IsInsurance}
                  onChange={(e) => onChangeCheckbox(e, "IsInsurance")}
                  label="Bảo hiểm"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="cartNewWrapper-orders-items-label">
              Tổng tiền đơn hàng
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="hidden lg:block">Tiền hàng:</span>
              <span className="col-span-2 lg:col-span-1 font-bold text-red">
                {_format.getVND(cart?.PriceVND, " đ")}
              </span>
            </div>
          </div>
          <div className="col-span-2 flex items-end justify-end md:justify-center md:block sm:col-span-1 text-center">
            <Button
              onClick={() => onPayment(true)}
              // icon="mr-0"
              title="Tiếp tục đặt hàng"
              btnClass="ml-2 !bg-blue !text-[12px] md:!text-[14px] !text-white sm:w-fit lg:w-[180px]"
              loading={loadingPayment}
            />
          </div>
        </div>
      </div>
    </>
  );
};
