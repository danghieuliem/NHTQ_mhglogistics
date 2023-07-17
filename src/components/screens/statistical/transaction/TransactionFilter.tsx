import React, { useRef } from "react";
import { FilterRangeDate } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";

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
          // placeholder="Từ ngày/đến ngày"
          handleDate={(val: string[]) => {
            fromDate.current = val[0];
            toDate.current = val[1];
          }}
        />
      </div>
      <IconButton
        icon="far fa-info-square"
        btnIconClass="!mr-2"
        title="Xem thống kê"
        onClick={() =>
          handleFilter({
            FromDate: fromDate.current,
            ToDate: toDate.current,
          })
        }
        btnClass={"h-fit"}
        toolip=""
      />
    </div>
  );
};
