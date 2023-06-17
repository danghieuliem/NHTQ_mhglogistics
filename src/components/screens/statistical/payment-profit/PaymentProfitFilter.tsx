import React, { useRef } from "react";
import { IconButton } from "~/components/globals/button/IconButton";
import { FilterRangeDate } from "~/components/globals/filterBase";

type TProps = {
  handleFilter: (fromDate: string, toDate: string) => void;
};

export const PaymentProfitFilter: React.FC<TProps> = ({ handleFilter }) => {
  const fromDate = useRef<string>(null);
  const toDate = useRef<string>(null);

  return (
    <div className="grid grid-cols-3 xl:gap-4 w-full">
      <div className="col-span-1 xl:mb-0 mb-4">
        <FilterRangeDate
          placeholder="Từ ngày/đến ngày"
          handleDate={(val: string[]) => {
            fromDate.current = val[0];
            toDate.current = val[1];
          }}
        />
      </div>
      <div className="col-span-1 xl:mb-0 mb-4 flex items-end">
        <IconButton
          onClick={() => handleFilter(fromDate.current, toDate.current)}
          btnClass="lg:mx-4"
          title="Xem thống kê"
          icon="far fa-info-square"
          toolip=""
        />
      </div>
    </div>
  );
};
