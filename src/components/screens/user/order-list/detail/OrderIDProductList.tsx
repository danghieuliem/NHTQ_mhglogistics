import { InputNumber, Tooltip } from "antd";
import router from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { order } from "~/api";
import { IconButton } from "~/components/globals/button/IconButton";
import { _format } from "~/utils";

export const OrderIDProductList: React.FC<any> = ({ data }) => {
  const onExportExcel = async () => {
    try {
      const res = await order.exportExcel({
        MainOrderID: data[0]?.MainOrderId,
      });
      router.push(`${res.Data}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="tableBox mt-4">
      <div className="flex justify-between items-end mb-4">
        <div className="titleTable pb-0">Danh sách sản phẩm</div>
        <IconButton
          onClick={() => onExportExcel()}
          title="Xuất"
          icon="fas fa-file-export"
          showLoading
          toolip="Xuất thống kê"
          green
          btnClass="!"
        />
      </div>
      <div className="orderProductItemWrapper">
        {data?.map((item, index) => (
          <div key={index} className="orderProductItem border">
            <div className="flex flex-wrap">
              <div className="flex w-full items-center mb-5 justify-between px-3 borderBottom">
                <Tooltip title="Link đến sản phẩm">
                  <a
                    href={item?.LinkOrigin}
                    target="_blank"
                    className="mainTitle"
                  >
                    {item?.TitleOrigin}
                  </a>
                </Tooltip>
              </div>
              <div className="orderProductTop flex w-5/12 items-center">
                <div className="flex">
                  <div className="self-stretch flex items-center">
                    <div className="w-[20px] h-[20px] text-center text-orange">
                      {item?.Id}
                    </div>
                  </div>
                  <div className="w-[75px] h-[75px] border border-[#6969691a] ml-4 rounded-xl overflow-hidden">
                    <a href={item?.LinkOrigin} target="_blank">
                      <img
                        src={
                          item?.ImageOrigin ? item?.ImageOrigin : "/default/pro-empty.jpg"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </a>
                  </div>
                </div>
                <div className="ml-2">
                  <div className="flex flex-wrap items-end">
                    <span className="text-sm mr-4 text-[#484747] font-semibold">
                      * Thuộc tính:
                    </span>
                    <span>{item?.Property}</span>
                  </div>
                  <div className="flex flex-wrap items-end">
                    <span className="text-sm mr-4 text-[#484747] font-semibold">
                      * Ghi chú:
                    </span>
                    <input
                      type="text"
                      className="border-b !rounded-none border-[#0000003a] text-[#000] bg-[transparent] max-w-[140px] outline-0"
                      value={item?.Brand ?? ""}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="orderProductBottom flex w-7/12">
                <div className="orderProductBottomPrice flex md:flex-col justify-between ml-2 w-1/4">
                  <div className="text-sm mr-4 text-[#484747] font-semibold">
                    Số lượng (cái)
                  </div>
                  <div className="text-sm text-center">
                    <InputNumber
                      size="middle"
                      value={_format.getVND(item?.Quantity, "")}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="orderProductBottomPrice flex md:flex-col justify-between ml-2 w-1/4">
                  <div className="text-sm mr-4 text-[#484747] font-semibold">
                    Đơn giá (¥)
                  </div>
                  <div className="text-orange">
                    <div className="text-sm text-center">
                      <InputNumber
                        size="middle"
                        value={_format.getVND(item?.UPriceBuy, "")}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="orderProductBottomPrice flex md:flex-col justify-between ml-2 w-1/4">
                  <div className="text-sm mr-4 text-[#484747] font-semibold">
                    Đơn giá (VNĐ)
                  </div>
                  <div className="text-orange">
                    <div className="text-sm text-center">
                      <InputNumber
                        size="middle"
                        value={_format.getVND(item?.UPriceBuyVN, "")}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="orderProductBottomPrice flex md:flex-col justify-between ml-2 w-1/4">
                  <div className="text-sm mr-4 text-[#484747] font-semibold">
                    Thành tiền (VNĐ)
                  </div>
                  <div className="text-sm text-center">
                    <InputNumber
                      size="middle"
                      value={_format.getVND(
                        item?.UPriceBuyVN * item?.Quantity,
                        ""
                      )}
                      disabled={true}
                      className="text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
