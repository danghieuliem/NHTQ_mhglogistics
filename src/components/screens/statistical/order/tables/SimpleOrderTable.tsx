import React, { FC } from "react";

type TProps = {
  rows: { name: string; value: number | string }[];
  title: string;
};

const SimpleOrderTable: FC<TProps> = ({ rows, title }) => {
  return (
    <div className="">
      <div className="text-[#535353]">
        {!!title.length && <p className="py-2 uppercase font-bold">{title}</p>}
      </div>
      <div className=" border  rounded-xl border-[#f8dfd5] min-w-full ">
        <div>
          {rows.map((item, index) => {
            return (
              <div
                className="flex px-2 justify-between"
                key={`${item.value}-${index}`}
              >
                <div className="flex p-2">
                  <i className="fas fa-poll mt-1 mr-2 text-orange"></i>
                  <p className="">{item.name}</p>
                </div>
                <p className=" p-2 text-blue">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { SimpleOrderTable };
