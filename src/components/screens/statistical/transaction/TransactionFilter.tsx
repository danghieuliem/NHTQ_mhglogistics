import React, { useRef } from "react";
import { ActionButton, FilterRangeDate } from "~/components";

type TProps = {
  handleFilter: (newFilter) => void;
};

export const TransactionFilter: React.FC<TProps> = ({ handleFilter }) => {
  const fromDate = useRef<string>(null);
  const toDate = useRef<string>(null);

  return (
    <div className="tableBox w-fit flex items-end gap-4">
      <div className="">
        <FilterRangeDate
          placeholder=""
          handleDate={(val: string[]) => {
            fromDate.current = val[0];
            toDate.current = val[1];
          }}
        />
      </div>
      <ActionButton
        icon="fas fa-info-square"
        title="Lọc thống kê"
        onClick={() =>
          handleFilter({
            FromDate: fromDate.current,
            ToDate: toDate.current,
          })
        }
        isButton
        isButtonClassName="bg-green !text-white"
      />
    </div>
  );
};
