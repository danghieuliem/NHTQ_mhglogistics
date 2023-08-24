import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { IconButton } from "~/components";
import TagStatus from "~/components/screens/status/TagStatus";
import { orderStatus } from "~/configs";
import { _format } from "~/utils";

type TProps = {
  data: TOrder;
  updatePaid: (type: "payment" | "deposit") => void;
};

const templateFee = [
  {
    id: 1,
    label: "Tiền hàng",
    value: [
      {
        key: "PriceVND",
        value: null,
      },
      {
        key: "PriceCNY",
        value: null,
      },
    ],
    icon: "far fa-box-usd",
  },
  {
    id: 2,
    label: "Phí mua hàng",
    value: [
      {
        key: "FeeBuyPro",
        value: null,
      },
    ],
    icon: "far fa-badge-dollar",
  },
  {
    id: 3,
    label: "Phí kiểm đếm",
    value: [
      {
        key: "IsCheckProductPrice",
        value: null,
      },
    ],
    icon: "far fa-badge-dollar",
  },
  {
    id: 4,
    label: "Phí đóng gỗ",
    value: [
      {
        key: "IsPackedPrice",
        value: null,
      },
    ],
    icon: "far fa-badge-dollar",
  },
  {
    id: 5,
    label: "Phí bảo hiểm",
    value: [
      {
        key: "InsuranceMoney",
        value: null,
      },
    ],
    icon: "far fa-badge-dollar",
  },
  {
    id: 6,
    label: "Phí giao hàng tận nhà",
    value: [
      {
        key: "IsFastDeliveryPrice",
        value: null,
      },
    ],
    icon: "far fa-badge-dollar",
  },
  {
    id: 7,
    label: "Phí ship nội địa trung quốc",
    value: [
      {
        key: "FeeShipCN",
        value: null,
      },
      {
        key: "FeeShipCNCNY",
        value: null,
      },
    ],
    icon: "far fa-badge-dollar",
  },
  {
    id: 8,
    label: "Phí vận chuyển",
    value: [
      {
        key: "FeeWeight",
        value: null,
      },
      {
        key: "TQVNWeight",
        value: null,
      },
    ],
    icon: "far fa-badge-dollar",
  },
  {
    id: 9,
    label: "Tổng tiền phụ phí",
    value: [
      {
        key: "FeeSupports",
        value: null,
      },
    ],
    icon: "far fa-coins",
  },
  {
    id: 10,
    label: "Tổng tiền đơn hàng",
    value: [
      {
        key: "TotalOrderAmount",
        value: null,
      },
    ],
    icon: "far fa-coins",
  },
  {
    id: 11,
    label: "Số tiền phải cọc",
    value: [
      {
        key: "AmountDeposit",
        value: null,
      },
    ],
    icon: "far fa-file-invoice-dollar",
  },
  {
    id: 12,
    label: "Đã thanh toán",
    value: [
      {
        key: "Deposit",
        value: null,
      },
    ],
    icon: "far fa-money-check-alt",
  },
  {
    id: 13,
    label: "Còn lại",
    value: [
      {
        key: "RemainingAmount",
        value: null,
      },
    ],
    icon: "far fa-poll-h",
  },
];

const styleLi = `flex items-center justify-between pb-3 border-b border-[#56545454] pt-[10px] last:border-none`;
const styleWrapIcon = `text-sm text-[#000]`;
const styleIcon = `mr-2 pt-[2px] text-[#ffa500] text-[18px]`;
const styleValue = `text-sm text-[#666565] font-semibold`;

const OrderOverView: React.FC<TProps> = ({ data, updatePaid }) => {
  const [renderFee, setRenderFee] = useState(templateFee);

  useEffect(() => {
    const newFee = renderFee.map((item) => {
      item?.value.forEach((v) => {
        if (v?.key === "FeeSupports") {
          v.value = data?.[v.key].reduce(
            (acc, cur) => (acc += cur?.SupportInfoVND),
            0
          );
        } else {
          v.value = data?.[v.key];
        }
      });
      return item;
    });

    setRenderFee(newFee);
  }, [data]);



  return (
    <Card
      title="Tổng quan đơn hàng"
      extra={
        <div className="flex justify-between items-center my-[-10px]">
          <span className="ant-card-head-title font-medium text-[16px]">Tổng quan đơn hàng</span>
          <div className="flex justify-between">
            {data?.Status === 0 && (
              <IconButton
                onClick={() => updatePaid("deposit")}
                title="Đặt cọc"
                icon="fas fa-hand-holding-usd"
                showLoading
                toolip="Đặt cọc"
                btnClass="!bg-green"
              />
            )}
            {data?.Status === 7 && (
              <IconButton
                onClick={() => updatePaid("payment")}
                title="Thanh toán"
                icon="fas fa-money-check-edit-alt"
                showLoading
                toolip="Thanh toán"
                btnClass="!bg-blue"
              />
            )}
          </div>
        </div>
      }
    >
      <div className={styleLi}>
        <div className={styleWrapIcon}>
          <i className={`far fa-calendar-minus ${styleIcon}`}></i>
          <span>Trạng thái đơn hàng: </span>
        </div>
        <TagStatus
          color={orderStatus.find((x) => x.id === data?.Status)?.color}
          statusName={data?.StatusName}
        />
      </div>
      {renderFee.map((item) => (
        <div className={styleLi} key={`${item?.id}-${item?.id}`}>
          <div className={styleWrapIcon}>
            <i className={`${item?.icon} ${styleIcon}`}></i>
            <span>{item?.label}</span>
          </div>
          <div className={styleValue}>
            {item?.value.length > 1 &&
              item.value.map((x) => {
                if (
                  x.key.includes("TQ") ||
                  x.key.includes("CNY") ||
                  x.key.includes("TQ")
                ) {
                  if (x.key.includes("Price") || x.key.includes("FeeShip")) {
                    return ` - (${_format.getVND(x?.value, " ¥")})`;
                  } else {
                    // return ` - (${x?.value} kg)`;
                  }
                } else {
                  return _format.getVND(x?.value, " VNĐ");
                }
              })}
            {item?.value.length === 1 &&
              _format.getVND(item?.value[0].value, " VNĐ")}
          </div>
        </div>
      ))}
    </Card>
  );
};

export const OrderOverViewMemo = React.memo(OrderOverView);
