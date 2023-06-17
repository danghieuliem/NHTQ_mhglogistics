import { Drawer } from "antd";
import React, { useState } from "react";
import { Button } from "~/components";
import { ECreatedOrderStatusData } from "~/configs/appConfigs";
import { _format } from "~/utils";
import { CloseOutlined } from "@ant-design/icons";
import { IconButton } from "~/components/globals/button/IconButton";

type TProps = {
  visible: boolean;
  data: TOrder[];
  handleDeposit: (data: TOrder[]) => void;
  handlePayment: (data: TOrder[]) => void;
  onCancel: () => void;
};

export const UserAnotherOrderListDrawer: React.FC<TProps> = ({
  visible,
  data,
  handleDeposit,
  handlePayment,
  onCancel,
}) => {
  const depositedData = data?.filter(
    (item) => item?.Status === ECreatedOrderStatusData.ArrivedToVietNamWarehouse
  );

  const undepositedData = data?.filter(
    (item) => item?.Status === ECreatedOrderStatusData.Undeposited
  );

  return (
    <Drawer
      className="order"
      maskClosable={false}
      closable={false}
      placement="bottom"
      visible={visible}
      onClose={onCancel}
    >
      <div className="w-10/12 mx-auto md:pl-20">
        {!!depositedData?.length && (
          <div className="bg-white my-1 flex w-full items-center justify-between px-4 py-3 rounded-md">
            <div className="flex w-[40%]">
              <div className="text-sm font-bold w-full flex justify-between pr-4 border-r border-r-[#828282]">
                <span className="text-[#3c3c3c] tracking-wide">
                  Đơn hàng thanh toán:
                </span>
                <span className="text-red">{depositedData?.length}</span>{" "}
              </div>
              <div className="text-sm font-bold w-full flex justify-between ml-4">
                <span className="text-[#3c3c3c] tracking-wide">Tổng tiền:</span>
                <span className="text-red">
                  {!!depositedData &&
                    _format.getVND(
                      depositedData?.reduce(
                        (prev, cur) => prev + cur?.RemainingAmount,
                        0
                      )
                    )}
                </span>
              </div>
            </div>
            <IconButton
              title="Thanh toán tất cả"
              showLoading
              onClick={() => handlePayment(depositedData)}
              btnClass=" !mx-0 rounded-md"
              icon={""}
              toolip=""
            />
          </div>
        )}
        {!!undepositedData?.length && (
          <div className="bg-white my-1 xl:flex w-full items-center justify-between px-0 xl:px-4 py-3 rounded-md">
            <div className="xl:flex xl:w-[40%]">
              <div className="mb-2 xl:mb-0 text-left text-sm font-bold w-full flex justify-between pr-4 xl:border-r border-r-[#828282]">
                <span className="text-[#3c3c3c] tracking-wide">
                  Đơn hàng đặt cọc:
                </span>
                <span className="text-red">{undepositedData?.length}</span>{" "}
              </div>
              <div className="mb-2 xl:mb-0 text-left text-sm font-bold w-full flex justify-between xl:ml-4">
                <span className="text-[#3c3c3c] tracking-wide">Tổng tiền:</span>
                <span className="text-red">
                  {!!undepositedData &&
                    _format.getVND(
                      undepositedData?.reduce(
                        (prev, cur) => prev + cur?.AmountDeposit,
                        0
                      )
                    )}
                </span>
              </div>
            </div>
            <IconButton
              title="Đặt cọc tất cả"
              showLoading
              onClick={() => handleDeposit(undepositedData)}
              btnClass=" !mx-0 rounded-md"
              icon={""}
              toolip=""
            />
          </div>
        )}
      </div>
    </Drawer>
  );
};
