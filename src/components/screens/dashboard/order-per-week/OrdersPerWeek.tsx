import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { dashboard } from "~/api";
import { PurchasePercent } from "~/components";
import { showToast } from "~/components/toast";
import { _format } from "~/utils";
import { OrdersPerWeekChart } from "./OrderPerWeekChart";

const box = "flex items-center justify-between sm:flex-wrap lg:flex-nowrap";

const templateBox = [
  {
    id: 1,
    label: "Mua hàng hộ",
    icon: "fas fa-shopping-basket",
    key: "MainOrderCount",
    bgColor: "#2A8BD5",
    path: "/manager/order/order-list",
    value: null,
  },
  {
    id: 2,
    label: "Mua hàng hộ khác",
    icon: "fas fa-shopping-basket",
    key: "MainOrderAnotherCount",
    bgColor: "#27A689",
    path: "/manager/order/order-list?q=3",
    value: null,
  },
  {
    id: 3,
    label: "Ký gửi",
    icon: "fas fa-shipping-fast",
    key: "TransportationOrderCount",
    bgColor: "#F1A934",
    path: "/manager/deposit/deposit-list",
    value: null,
  },
  {
    id: 4,
    label: "Thanh toán hộ",
    icon: "far fa-credit-card",
    key: "PayHelpCount",
    bgColor: "#E54C36",
    path: "/manager/order/request-payment",
    value: null,
  },
];

const BoxItem = ({ value, path, label, icon, color }) => {
  const boxItem =
  "mb-4 lg:mb-2 xl:mb-0 md:p-[10px] rounded-[4px] xl:px-4 w-[25%] lg:w-[24%] bg-[#fff] lg:my-0 shadow-xl hover:shadow-none transition-all !w-full hover:translate-y-[5px]";
  const titleContain = "";
  const iconTitle = `p-[8px] rounded-[4px] w-fit h-fit text-[#fff]`;
  const styleIcon = `text-xl ${icon}`;
  const addOrder = `mr-2 text-[26px] flex items-end`;
  return (
    <Link href={`${path}`}>
      <a
        className={boxItem}
        style={{
          backgroundImage: `linear-gradient(225deg, #ffffff 0%, ${color}60 50%, #ffffff 100%)`,
        }}
      >
        <div className={titleContain}>
          <div className="flex justify-between mb-3 items-center">
            {value === null ? (
              <i className="fas fa-ellipsis-h"></i>
            ) : (
              <div className={addOrder} style={{ color }}>
                {value ? "+" : ""}
                {_format.getVND(value, " ")}
              </div>
            )}
            <div
              className={iconTitle}
              style={{
                backgroundColor: color,
                boxShadow: `0 10px 15px -3px ${color}, 0 4px 6px -4px ${color}`,
              }}
            >
              <i className={styleIcon}></i>
            </div>
          </div>
          <p className={`font-bold uppercase text-[12px] text-[#7a7a7a]`}>
            {label}
          </p>
        </div>
      </a>
    </Link>
  );
};

export const OrdersPerWeek = React.memo(() => {
  const [boxData, setBoxData] = useState(templateBox);
  const { data, isLoading } = useQuery(
    "order-in-week",
    () => dashboard.getTotalInWeek(),
    {
      onSuccess: (res) => {
        const data = res.Data[0];
        const newBoxData = templateBox.map((item) => {
          item.value = data?.[item?.key];
          return item;
        });

        setBoxData(newBoxData);
        return res.Data[0];
      },
      onError: (error) => {
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const { data: dataChart, isLoading: isLoadingDataChart } = useQuery(
    "get-item-in-week",
    () => dashboard.getItemInWeek(),
    {
      onSuccess: (res) => res.Data,
      onError: (error) =>
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        }),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="grid grid-cols-2">
      <div className={`${box} mb-[20px] col-span-2 grid-cols-2 gap-5`}>
        {boxData.map((item, index) => (
          <BoxItem
            key={item.path}
            value={item.value}
            path={item.path}
            label={item.label}
            icon={item.icon}
            color={item.bgColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-12 col-span-2 gap-4">
        <div className="col-span-8">
          <div className="tableBox h-fit">
            <p className="xl:text-sm text-xs solid font-bold w-fit text-[#3E3C6A] pb-6 ">
              Số lượng đơn trong tuần
            </p>
            <OrdersPerWeekChart dataChart={dataChart?.Data ?? []} />
          </div>
        </div>
        <div className="col-span-4">
          <PurchasePercent />
        </div>
      </div>
    </div>
  );
})
