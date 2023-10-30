import router from "next/router";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { order } from "~/api";
import { IconButton, toast } from "~/components";
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
  const queryClient = useQueryClient();

  const mutationUpdate = useMutation(order.update, {
    onSuccess: () => {
      toast.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries("history-order");
      refetch();
      setLoadingUpdate(false);
    },
    onError: (error) => {
      setLoadingUpdate(false);
      toast.error((error as any)?.response?.data?.ResultMessage);
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
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          <span className="font-bold grid xs:grid-cols-2">
            <span>Tổng số lượng:</span>{" "}
            <span className="text-red"> {totalQuantity}</span>{" "}
          </span>
          <span className="font-bold grid xs:grid-cols-2">
            <span>Tổng tiền sản phẩm:</span>{" "}
            <span className="text-red">{_format.getVND(data?.PriceVND)}</span>
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
