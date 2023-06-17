import React, { useRef } from "react";
import { FilterRangeDate, IconButton } from "~/components";

type TProps = {
  handleFilter: (newFilter) => void;
};

export const PurchaseProfiltFilter: React.FC<TProps> = ({ handleFilter }) => {
  const fromDate = useRef<string>(null);
  const toDate = useRef<string>(null);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <FilterRangeDate
          placeholder="Từ ngày/đến ngày"
          handleDate={(val: string[]) => {
            fromDate.current = val[0];
            toDate.current = val[1];
          }}
        />
      </div>
      <div className="col-span-1 xl:mt-0 mt-4 flex items-end ">
        <IconButton
          title="Xem thống kê"
          icon="far fa-info-square"
          onClick={() => {
            handleFilter({
              FromDate: fromDate.current,
              ToDate: toDate.current,
            });
          }}
          btnClass="md:mx-4 !mx-0"
          showLoading
          toolip=""
        />
      </div>
    </div>
  );
};
