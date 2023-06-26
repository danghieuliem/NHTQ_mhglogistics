import React, { useRef } from "react";
import { FilterRangeDate } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";

type TProps = {
  handleFilter: (fromDate: string, toDate: string) => void;
  handleType: () => void;
  type: "sum" | "detail";
  resetPagination: () => void;
};

export const SalesFilter: React.FC<TProps> = ({
  handleFilter,
  type,
  handleType,
  resetPagination,
}) => {
  const fromDate = useRef<string>(null);
  const toDate = useRef<string>(null);

  return (
    <div className="flex items-end mb-4">
      <FilterRangeDate
        format="DD/MM/YYYY"
        placeholder="Từ ngày/đến ngày"
        handleDate={(val: string[]) => {
          fromDate.current = val[0];
          toDate.current = val[1];
        }}
      />
      <IconButton
        title="Thống kê theo ngày lọc"
        btnIconClass="!mr-2"
        icon="far fa-info-square"
        onClick={() => {
          handleFilter(fromDate.current, toDate.current);
          resetPagination();
        }}
        btnClass={"!mx-4"}
        showLoading
        toolip=""
      />
      <IconButton
        onClick={handleType}
        icon="far fa-info-square"
        btnIconClass="!mr-2"
        title={type === "detail" ? "Xem biểu đồ tổng" : "Xem biểu đồ chi tiết"}
        showLoading
        toolip=""
      />
    </div>
  );
};
