import clsx from "clsx";
import React from "react";

type TProps = {
  data: TOrder;
  loading: boolean;
};

const titleInfo = "text-[16px] font-bold uppercase tracking-wide";
const boxInfo = "col-span-1 p-4 bg-[#adc0c44d]";
const infoItem =
  "py-2 px-2 text-[#585858] text-xs xl:text-sm font-semibold tracking-wide";

const itemRows = "flex justify-between border-t border-[#e9e9e9]";

export const OrderInfo: React.FC<TProps> = ({ data, loading }) => {
  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-4">
        <div className={clsx(boxInfo)}>
          <div className={clsx(titleInfo)}>Thông tin người đặt hàng</div>
          <div className="flex py-2 justify-between">
            <div className={clsx(infoItem)}>Username</div>
            <div className="w-[70%] text-right py-1 px-2">{data?.UserName}</div>
          </div>
          <div className={itemRows}>
            <div className={clsx(infoItem)}>Địa chỉ</div>
            <div className="w-[70%] text-right py-1 px-2">{data?.Address}</div>
          </div>
          <div className={itemRows}>
            <div className={clsx(infoItem)}>Email</div>
            <div className="w-[70%] text-right py-1 px-2">{data?.Email}</div>
          </div>
          <div className={itemRows}>
            <div className={clsx(infoItem)}>Số ĐT</div>
            <div className="w-[70%] text-right py-1 px-2">{data?.Phone}</div>
          </div>
        </div>
        <div className={clsx(boxInfo)}>
          <div className={clsx(titleInfo)}>Thông tin người nhận hàng</div>
          <div className="flex justify-between py-2">
            <div className={clsx(infoItem)}>Tên</div>
            <div className="w-[70%] text-right py-1 px-2">
              {data?.ReceiverFullName}
            </div>
          </div>
          <div className={itemRows}>
            <div className={clsx(infoItem)}>Địa chỉ</div>
            <div className="w-[70%] text-right py-1 px-2">
              {data?.DeliveryAddress}
            </div>
          </div>
          <div className={itemRows}>
            <div className={clsx(infoItem)}>Email</div>
            <div className="w-[70%] text-right py-1 px-2">
              {data?.ReceiverEmail}
            </div>
          </div>
          <div className={itemRows}>
            <div className={clsx(infoItem)}>Số ĐT</div>
            <div className="w-[70%] text-right py-1 px-2">
              {data?.ReceiverPhone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
