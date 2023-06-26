import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { _format } from "~/utils";

const box = "grid grid-cols-2 lg:grid-cols-4 gap-4";
const titleContain = "";
const iconTitle = `bg-[#fff] rounded-[4px] py-1 px-2 shadow-sm`;
const addOrder = `mr-2 text-[26px] flex text-label items-end`;

const BoxItem = ({ value, path, label, icon, color, bgColor }) => {
  return (
    <Link href={`${path}`}>
      <a
        className={clsx("p-2 lg:p-4 rounded-[6px]")}
        style={{ background: `${bgColor}` }}
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
                  <span style={{letterSpacing: "-2px"}}>{_format.getVND(value, " ")}</span>
                </span>
                <span className={clsx("text-[12px] ml-2 hidden xl:block pb-2")}>
                  Đơn hàng
                </span>
              </div>
            )}
            <div className={clsx(iconTitle, "bg-white")}>
              <i className={clsx(`text-lg ${icon}`)} style={{ color }}></i>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export const UserStatistic = ({ total }) => {
  return (
    <div className={box}>
      {total?.map((item) => (
        <React.Fragment key={item.key}>
          <BoxItem
            bgColor={item.bgColor}
            value={item.value}
            path={item.path}
            label={item.label}
            icon={item.icon}
            color={item.color}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
