import React, { useRef } from "react";
import { ActionButton, FilterRangeDate } from "~/components";

type TProps = {
  handleFilter: (newFilter) => void;
};

export const PurchaseProfiltFilter: React.FC<TProps> = ({ handleFilter }) => {
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <FilterRangeDate
          placeholder="Từ ngày/đến ngày"
          handleDate={(val: string[]) => {
            FromDate.current = val[0];
            ToDate.current = val[1];
          }}
        />
      </div>
      <div className="col-span-1 xl:mt-0 mt-4 flex items-end ">
        <ActionButton
          title="Lọc thống kê ngày"
          icon="fas fa-info-square"
          onClick={() => {
            handleFilter({
              FromDate: FromDate.current,
              ToDate: ToDate.current,
            });
          }}
          isButton
          isButtonClassName="bg-green !text-white"
        />
      </div>
    </div>
  );
};
