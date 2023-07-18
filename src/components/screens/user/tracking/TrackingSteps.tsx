import clsx from "clsx";
import React, { memo } from "react";
import { _format } from "~/utils";
import styles from "./index.module.css";

type TProps = {
  data?: any;
};

export const TrackingSteps: React.FC<TProps> = memo(({ data }) => {
  console.log(data);
  const renderDate = [
    {
      id: 1,
      title: "Chưa về kho TQ",
      date: data?.Created,
      staff: data?.CreatedBy,
      icon: "/icon/chua-ve-kho-TQ.png",
      color: "#8098F9",
    },
    {
      id: 2,
      title: "Đã về kho TQ",
      date: data?.DateInTQWarehouse,
      icon: "/icon/da-ve-kho-TQ.png",
      staff: data?.StaffTQWarehouse,
      color: "#3538CD",
    },
    {
      id: 3,
      title: "Trong kho VN",
      date: data?.DateInLasteWareHouse,
      icon: "/icon/trong-kho-VN.png",
      staff: data?.StaffVNWarehouse,
      color: "#DC6803",
    },
    {
      id: 5,
      title: "Đã giao",
      date: data?.DateOutWarehouse,
      icon: "/icon/da-giao.png",
      staff: data?.StaffVNOutWarehouse,
      color: "#F63D68",
    },
  ];

  // const getWidthView = document.body.clientWidth;
  //vertical - horizontal
  // console.log(data?.Status);

  /**
   * Chưa về kho TQ: Created - CreatedBy
   * Đã về kho TQ: DateInTQWarehouse - StaffTQWarehouse
   * Trong kho VN: DateInLasteWareHouse -  StaffVNWarehouse
   * Đã giao: DateOutWarehouse - StaffVNOutWarehouse
   */

  return (
    <div className={clsx("flex flex-col", styles.trackingWrapper)}>
      {renderDate?.map((item) => (
        <div
          className={clsx(
            styles.box,
            data?.Status >= item?.id && styles.boxActive
          )}
          key={clsx(item.date, item.id)}
        >
          <div className={clsx(styles.icon)}>
            <img src={item.icon} alt="" className={styles.img} />
          </div>
          <div className={styles.content}>
            <div>
              <div
                className={styles.title}
                style={{
                  color:
                    data?.Status >= item?.id ? item.color : "text-[#afafaf]",
                }}
              >
                {item?.title}
              </div>
            </div>
            <div className={styles.line}></div>
            <div className="flex justify-start flex-col">
              <div>
                <span className="text-[12px]">Nhân viên xử lý: </span>
                <span className="text-[14px] font-bold">
                  {item?.staff || "--"}
                </span>
              </div>
              <div>
                <span className="text-[12px]">Thời gian: </span>
                <span className="text-[12px] font-bold">
                  {_format.getVNDate(item?.date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <div className={styles.lineMain}></div> */}
    </div>
  );
});
