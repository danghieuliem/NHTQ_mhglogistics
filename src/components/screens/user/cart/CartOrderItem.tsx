import { Checkbox, Collapse, Spin, Tooltip } from "antd";
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
import { CheckboxCustom } from "./block";
import { OrderTempItem } from "./OrderTempItem";

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
    <div className="topContainer">
      <div className="top flex justify-between items-center">
        <div className="">
          {/* {checked && <div className="mb-3 text-xs font-semibold tracking-wide">Bạn đã chọn đơn hàng này!</div>} */}
          <Tooltip title="Chọn đặt đơn hàng này">
            <Checkbox onChange={() => toggleShopId(cart?.Id)} checked={checked}>
              <span className="text-[#fff]">
                Tên shop: <span className="font-bold">{cart?.ShopName}</span>
              </span>
            </Checkbox>
          </Tooltip>
        </div>
        <IconButton
          onClick={() => onHandleShop(cart?.Id)}
          icon={loading ? "fas fa-sync fa-spin" : "fas fa-trash-alt"}
          title=""
          showLoading
          toolip="Xóa cửa hàng"
          btnClass="!text-white hover:!bg-[#cc3a00]"
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
    <div
      className="cartOrderItemContainer tableBox py-3"
      style={{
        pointerEvents: loading ? "none" : "all",
      }}
    >
      <Collapse
        defaultActiveKey={1}
        collapsible="disabled"
        className="collapse-cart-order-item"
      >
        <Collapse.Panel
          header={
            <TopContainer
              checked={checked}
              toggleShopId={toggleShopId}
              cart={cart}
              onHandleShop={onHandleShop}
              loading={loading}
              disabled={loadingPayment}
            />
          }
          key={1}
          showArrow={false}
        >
          {cart?.OrderTemps?.map((orderTempData, index) => (
            <Spin
              key={orderTempData?.Id}
              spinning={
                (mutationDeleteProduct.isLoading ||
                  mutationUpdateProduct.isLoading) &&
                mutationUpdateProduct.variables?.Id === orderTempData?.Id
              }
            >
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
            </Spin>
          ))}
        </Collapse.Panel>
      </Collapse>
      <div className="divide">
        <div className="footer grid col-span-3">
          <div className="left col-span-1">
            <div className="leftTitle ">Thông tin đơn hàng</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <CheckboxCustom
                  defaultChecked={cart?.IsFastDelivery}
                  onChange={(e) => onChangeCheckbox(e, "IsFastDelivery")}
                  label="Giao tận nhà"
                />
              </div>
              <div className="col-span-1">
                <CheckboxCustom
                  defaultChecked={cart?.IsCheckProduct}
                  onChange={(e) => onChangeCheckbox(e, "IsCheckProduct")}
                  label="Kiểm hàng"
                />
              </div>
              <div className="col-span-1">
                <CheckboxCustom
                  defaultChecked={cart?.IsPacked}
                  onChange={(e) => onChangeCheckbox(e, "IsPacked")}
                  label="Đóng gỗ"
                />
              </div>
              <div className="col-span-1">
                <CheckboxCustom
                  defaultChecked={cart?.IsInsurance}
                  onChange={(e) => onChangeCheckbox(e, "IsInsurance")}
                  label="Bảo hiểm"
                />
              </div>
            </div>
          </div>
          <div className="mid col-span-1">
            <div className="leftTitle">Tổng tiền đơn hàng</div>
            <div className="totalPrice">
              <span className="totalPriceLeft">Tiền hàng:</span>
              <span className="totalPriceRight">
                {_format.getVND(cart?.PriceVND)}
              </span>
            </div>
            <div className="totalPrice">
              <span className="totalPriceLeft">Tổng tính:</span>
              <span className="totalPriceRight">
                {_format.getVND(cart?.PriceVND)}
              </span>
            </div>
          </div>
          <div className="col-span-1 flex items-end justify-end">
            <div className="text-right">
              <IconButton
                onClick={() => onPayment(true)}
                icon={
                  loadingPayment
                    ? "fas fa-spinner fa-spin"
                    : "fas fa-bags-shopping"
                }
                title="Tiếp tục đặt hàng"
                showLoading
                btnClass="ml-2 !bg-orange !text-white"
                disabled={loadingPayment}
                toolip=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
