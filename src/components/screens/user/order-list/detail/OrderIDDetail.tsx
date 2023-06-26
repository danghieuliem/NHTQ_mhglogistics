import { Card } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
type TFeeSupports = {
  Id?: number;
  MainOrderId?: number;
  SupportName?: string;
  Updated?: Date;
  UpdatedBy?: string;
  SupportInfoVND?: number;
};

const templageMethods = [
  {
    id: 1,
    value: null,
    label: "Kho TQ",
    key: "FromPlaceName",
    icon: "far fa-warehouse",
  },
  {
    id: 2,
    value: null,
    label: "Kho nhận",
    key: "ReceivePlaceName",
    icon: "far fa-warehouse",
  },
  {
    id: 3,
    value: null,
    label: "Phương thức vận chuyển",
    key: "ShippingTypeName",
    icon: "far fa-shipping-fast",
  },
  {
    id: 4,
    value: null,
    label: "Kiểm đếm",
    key: "IsCheckProduct",
    icon: "far fa-box-check",
  },
  {
    id: 5,
    value: null,
    label: "Đóng gỗ",
    key: "IsPacked",
    icon: "far fa-archive",
  },
  {
    id: 6,
    value: null,
    label: "Bảo hiểm",
    key: "IsInsurance",
    icon: "far fa-id-card",
  },
  {
    id: 7,
    value: null,
    label: "Giao hàng tận nhà",
    key: "IsFastDelivery",
    icon: "far fa-hand-holding-box",
  },
];

const styleLi = `pb-2 col-span-1 grid gap-2 grid grid-cols-6 border-b border-[#56545454] last:border-none`;
const styleWrapIcon = `col-span-3 lg:col-span-3 text-sm text-[#000]`;
const styleIcon = `text-[#ffa500] text-[18px]`;
const styleValue = `col-span-3 lg:col-span-3 text-sm text-[#666565] font-semibold`;

export const OrderIDDetail: React.FC<
  TTable<TFeeSupports> & { dataAll; data2 }
> = ({ data, dataAll, data2 }) => {
  const [renderMethods, setRenderMethods] = useState(templageMethods);

  useEffect(() => {
    const newMethod = renderMethods.map((item) => {
      item.value = dataAll?.[item.key];
      return item;
    });

    setRenderMethods(newMethod);
  }, [dataAll]);

  const columns: TColumnsType<TFeeSupports> = [
    {
      dataIndex: "Id",
      render: (value, record, index) => <>{++index}</>,
      title: "STT",
      responsive: ["lg"],
    },
    {
      dataIndex: "SupportName",
      title: "Tên phụ phí",
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "SupportInfoVND",
      render: (_, record) => {
        return <>{_format.getVND(record?.SupportInfoVND)}</>;
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card title="Dịch vụ đơn hàng">
        <div className="grid grid-cols-1 gap-2">
          {renderMethods.map((item) => (
            <div className={styleLi} key={`${item?.id}-${item?.id}`}>
              <div className={clsx(styleWrapIcon, "")}>
                <i className={`${item.icon} ${styleIcon} mr-2`}></i>
                <span>{item?.label}</span>
              </div>
              {item.key.includes("Is") && (
                <i
                  className={`far text-sm ${
                    item.value
                      ? "fa-check text-[#388E3C]"
                      : "fa-times text-[#be2c2c]"
                  }`}
                ></i>
              )}
              {!item.key.includes("Is") && (
                <p className={styleValue}>{item?.value}</p>
              )}
            </div>
          ))}
        </div>
      </Card>
      <Card title="Thông tin người nhận">
        <div className="grid grid-cols-1 gap-2">
          <div className={styleLi}>
            <div className={styleWrapIcon}>
              <i className={`far fa-user mr-2 ${styleIcon}`}></i>
              <span>Tên</span>
            </div>
            <div className={styleValue}>{dataAll?.ReceiverFullName}</div>
          </div>
          <div className={styleLi}>
            <div className={styleWrapIcon}>
              <i className={`far fa-map-marker-alt mr-2 ${styleIcon}`}></i>
              <span>Địa chỉ</span>
            </div>
            <div className={styleValue}>{dataAll?.DeliveryAddress}</div>
          </div>
          <div className={styleLi}>
            <div className={styleWrapIcon}>
              <i className={`far fa-envelope mr-2 ${styleIcon}`}></i>
              <span>Email</span>
            </div>
            <div className={styleValue}>{dataAll?.ReceiverEmail}</div>
          </div>
          <div className={styleLi}>
            <div className={styleWrapIcon}>
              <i className={`far fa-phone-alt mr-2 ${styleIcon}`}></i>
              <span>Số điện thoại</span>
            </div>
            <div className={styleValue}>{dataAll?.ReceiverPhone}</div>
          </div>
        </div>
      </Card>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          title: "Danh sách phụ phí",
        }}
      />
    </div>
  );
};
