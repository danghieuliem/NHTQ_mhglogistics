import React, { useRef } from "react";
import { ActionButton } from "~/components/globals/button/ActionButton";
import { FilterRangeDate } from "~/components/globals/filterBase";

type TProps = {
  handleFilter: (newFilter) => void;
};

export const PaymentProfitFilter: React.FC<TProps> = ({ handleFilter }) => {
  const fromDate = useRef<string>(null);
  const toDate = useRef<string>(null);

  return (
    <div className="flex gap-2 items-end">
      <FilterRangeDate
        placeholder="Từ ngày/đến ngày"
        handleDate={(val: string[]) => {
          fromDate.current = val[0];
          toDate.current = val[1];
        }}
      />
      <ActionButton
        onClick={() => {
          handleFilter({
            FromDate: fromDate.current,
            ToDate: toDate.current,
          });
        }}
        title="Xem thống kê"
        icon="fas fa-info-square"
        isButton
        isButtonClassName="bg-green !text-white h-fit"
      />
    </div>
  );
};
