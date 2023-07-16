import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { dashboard } from "~/api";
import { PurchasePercent, TotalRechargesPerWeek } from "~/components";
import { _format } from "~/utils";
import { OrdersPerWeekChart } from "./OrderPerWeekChart";

const box = "col-span-2 grid grid-cols-4 gap-4 mb-4";

const dataBoxItem = [
  {
    key: "MainOrderCount",
    label: "Đơn hàng mua hộ",
    path: "/manager/order/order-list",
    icon: "fas fa-shopping-basket",
    color: "#1582F5",
    bgColor: "#EBF4FE",
    value: null,
  },
  {
    key: "MainOrderAnotherCount",
    label: "Đơn hàng mua hộ khác",
    path: "/manager/order/order-list?q=3",
    icon: "fas fa-cubes",
    color: "#009000",
    bgColor: "#E5FFE5",
    value: null,
  },
  {
    key: "TransportationOrderCount",
    label: "Ký gửi",
    path: "/manager/deposit/deposit-list",
    icon: "fas fa-dolly",
    color: "#FF7A00",
    bgColor: "#FFF4EA",
    value: null,
  },
  {
    key: "PayHelpCount",
    label: "Thanh toán hộ",
    path: "/manager/order/request-payment",
    icon: "fas fa-credit-card",
    color: "#FF0000",
    bgColor: "#FFF1F1",
    value: null,
  },
];

const titleContain = "";
const iconTitle = `bg-[#fff] rounded-[4px] py-1 px-2 shadow-xl`;
const addOrder = `mr-2 text-[26px] flex text-label items-end`;

const BoxItem = ({ value, path, label, icon, color, bgColor }) => {
  return (
    <Link href={`${path}`}>
      <a
        className={clsx("p-2 lg:p-4 rounded-[6px] shadow-md")}
        style={{ background: bgColor }}
      >
        <div className={titleContain}>
          <p className={`font-bold uppercase text-[12px] text-[#333]`}>
            {label}
          </p>
          <div className="flex justify-between items-center">
            {value === null ? (
              <i className="fas fa-ellipsis-h"></i>
            ) : (
              <div className={addOrder}>
                <span style={{ color: color, fontWeight: "600" }}>
                  {value ? "+" : ""}
                  <span style={{ letterSpacing: "-2px" }}>
                    {_format.getVND(value, " ")}
                  </span>
                </span>
                <span className={clsx("text-[12px] ml-2 hidden xl:block pb-2")}>
                  Đơn hàng
                </span>
              </div>
            )}
            <div className={clsx(iconTitle, "bg-white")}>
              <i className={clsx(`text-xl ${icon}`)} style={{ color }}></i>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export const OrdersPerWeek = React.memo(() => {
  const [boxData, setBoxData] = useState(dataBoxItem);
  const { data, isLoading } = useQuery(
    "order-in-week",
    () => dashboard.getTotalInWeek(),
    {
      onSuccess: (res) => {
        const data = res.Data[0];
        const newBoxData = dataBoxItem.map((item) => {
          item.value = data?.[item?.key];
          return item;
        });
        setBoxData(newBoxData);
        return res.Data[0];
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: false,
    }
  );

  const { data: dataChart, isLoading: isLoadingDataChart } = useQuery(
    "get-item-in-week",
    () => dashboard.getItemInWeek(),
    {
      onSuccess: (res) => res.Data,
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      refetchOnWindowFocus: false,
      staleTime: 5000,
    }
  );

  return (
    <div className="grid grid-cols-2">
      <div className={box}>
        {boxData.map((item, index) => (
          <BoxItem
            bgColor={item?.bgColor}
            key={item.path}
            value={item.value}
            path={item.path}
            label={item.label}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-12 col-span-2 gap-4">
        <div className="col-span-6">
          <OrdersPerWeekChart dataChart={dataChart?.Data ?? []} />
        </div>
        <div className="col-span-6">
          <TotalRechargesPerWeek />
        </div>
        <div className="col-span-12">
          <PurchasePercent />
        </div>
      </div>
    </div>
  );
});
