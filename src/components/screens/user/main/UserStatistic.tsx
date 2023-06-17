import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { _format } from "~/utils";

const box = "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4";
const titleContain = "";
const iconTitle = `bg-[#fff] rounded-[4px] py-1 px-2 shadow-xl`;
const addOrder = `mr-2 text-[26px] flex text-[#fff] items-end`;

const BoxItem = ({ value, path, label, icon, color }) => {
  return (
    <Link href={`${path}`}>
      <a className={clsx("p-2 lg:p-4 rounded-[8px] shadow-lg")}
        style={{background: `${color}0d`}}
      >
        <div className={titleContain}>
          <div className="flex justify-between mb-3 items-center">
            {value === null ? (
              <i className="fas fa-ellipsis-h"></i>
            ) : (
              <div className={addOrder} style={{ color: color }}>
                {value ? "+" : ""}
                {_format.getVND(value, " ")}
                <span className={clsx("text-[12px] ml-2 hidden xl:block pb-2")}>
                  Đơn hàng
                </span>
              </div>
            )}
            <div className={clsx(iconTitle)} style={{ background: color }}>
              <i className={clsx(`text-xl ${icon} text-white`)}></i>
            </div>
          </div>
          <p
            className={`font-bold uppercase text-[12px] text-[#333]`}
            style={{ color: color }}
          >
            {label}
          </p>
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
