import router from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { order } from "~/api";
import { IconButton, showToast, toast } from "~/components";
import { _format } from "~/utils";
import { OrderProductItem } from "./OrderProductItem";

type TProps = {
  data: TOrder;
  loading: boolean;
  RoleID: number;
  refetch: () => void;
};

export const OrderProductList: React.FC<TProps> = ({
  data,
  loading,
  refetch,
  RoleID,
}) => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const totalQuantity = data?.Orders.reduce(
    (accumulator, currentValue) => Number(accumulator + currentValue.Quantity),
    0
  );

  const mutationUpdate = useMutation(order.update, {
    onSuccess: () => {
      toast.success("Cập nhật sản phẩm thành công");
      refetch();
      setLoadingUpdate(false);
    },
    onError: (error) => {
      setLoadingUpdate(false);
      showToast({
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
        title: "Lỗi",
      });
    },
  });

  const handleUpdateProduct = (dataProduct: TOrder, Id?: number) => {
    if (dataProduct?.Quantity === null || dataProduct?.Quantity === undefined) {
      toast.error("Vui lòng nhập số lượng sản phẩm ");
      return;
    }
    setLoadingUpdate(true);
    mutationUpdate.mutateAsync(dataProduct);
    localStorage.removeItem("changeProduct");
  };

  const onExportExcel = async () => {
    try {
      const res = await order.exportExcel({
        MainOrderID: data?.Id,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="orderProductItem flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold">Tổng số lượng: {totalQuantity} </span>
          <span className="font-bold">
            Tổng tiền sản phẩm: {_format.getVND(data?.PriceVND)}
          </span>
        </div>
        <div>
          {(RoleID === 1 ||
            RoleID === 3 ||
            RoleID === 4 ||
            RoleID === 8 ||
            RoleID === 6) && (
            <IconButton
              onClick={() => onExportExcel()}
              title="Xuất"
              icon="fas fa-file-export"
              showLoading
              toolip="Xuất thống kê"
              green
              btnClass="ml-4"
            />
          )}
        </div>
      </div>
      <div className="max-h-[700px] overflow-y-auto">
        <div className="h-full">
          {data?.Orders?.map((order, index) => (
            <OrderProductItem
              key={`${order.Id}`}
              order={order}
              index={index}
              handleUpdateProduct={handleUpdateProduct}
              loading={loadingUpdate}
              RoleID={RoleID}
              dataStatus={data?.Status}
              orderType={data?.OrderType}
              // setCheckUpdate={() => setCheckUpdate(true)}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
