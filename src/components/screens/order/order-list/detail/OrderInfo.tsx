import clsx from "clsx";
import React from "react";

type TProps = {
  data: TOrder;
  loading: boolean;
};

const titleInfo = "text-[16px] mb-4 font-bold uppercase tracking-wide";
const boxInfo = "col-span-1 p-4 bg-[#fff1e4] rounded-[6px]";
const infoItem =
  "text-label text-md font-semibold tracking-wide";

const itemRows = "flex py-1 justify-between border-t border-[#e9e9e9]";

export const OrderInfo: React.FC<TProps> = ({ data, loading }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={clsx(boxInfo)}>
        <div className={clsx(titleInfo)}>Thông tin người đặt hàng</div>
        <div className={itemRows}>
          <div className={clsx(infoItem)}>Username</div>
          <div className="w-[70%] text-right">{data?.UserName}</div>
        </div>
        <div className={itemRows}>
          <div className={clsx(infoItem)}>Địa chỉ</div>
          <div className="w-[70%] text-right">{data?.Address}</div>
        </div>
        <div className={itemRows}>
          <div className={clsx(infoItem)}>Email</div>
          <div className="w-[70%] text-right">{data?.Email}</div>
        </div>
        <div className={itemRows}>
          <div className={clsx(infoItem)}>Số điện thoại</div>
          <div className="w-[70%] text-right">{data?.Phone}</div>
        </div>
      </div>
      <div className={clsx(boxInfo)}>
        <div className={clsx(titleInfo)}>Thông tin người nhận hàng</div>
        <div className={itemRows}>
          <div className={clsx(infoItem)}>Tên</div>
          <div className="w-[70%] text-right">
            {data?.ReceiverFullName}
          </div>
        </div>
        <div className={itemRows}>
          <div className={clsx(infoItem)}>Địa chỉ</div>
          <div className="w-[70%] text-right">
            {data?.DeliveryAddress}
          </div>
        </div>
        <div className={itemRows}>
          <div className={clsx(infoItem)}>Email</div>
          <div className="w-[70%] text-right">
            {data?.ReceiverEmail}
          </div>
        </div>
        <div className={itemRows}>
          <div className={clsx(infoItem)}>Số ĐT</div>
          <div className="w-[70%] text-right">
            {data?.ReceiverPhone}
          </div>
        </div>
      </div>
    </div>
  );
};
