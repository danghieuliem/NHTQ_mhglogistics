import React, { useRef } from "react";
import { FilterRangeDate, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  ECategoryPaymentData,
  categoryPaymentData,
} from "~/configs/appConfigs";

type TProps = {
  handleFilter: (newFilter) => void;
};

export const HistoryTransactionVNDFilter: React.FC<TProps> = ({
  handleFilter,
}) => {
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);
  const Status = useRef<ECategoryPaymentData>(0);

  return (
    <div className="flex flex-wrap sm:mb-4 xl:mb-0">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 sm:mb-0 mb-4">
          <FilterRangeDate
            format="DD/MM/YYYY"
            placeholder="Từ ngày / đến ngày"
            // placeholder=""
            handleDate={(val: string[]) => {
              FromDate.current = val[0];
              ToDate.current = val[1];
            }}
          />
        </div>
        <div className="col-span-1 sm:mb-0 mb-4">
          <FilterSelect
            placeholder="Trạng thái"
            label="Trạng thái"
            data={categoryPaymentData}
            isClearable={true}
            handleSearch={(val: ECategoryPaymentData) => (Status.current = val)}
          />
        </div>
      </div>
      <div className="ml-4 flex items-end justify-end w-full mb-4 md:w-fit md:mb-0">
        <IconButton
          onClick={() =>
            handleFilter({
              FromDate: FromDate.current,
              ToDate: ToDate.current,
              Status: Status.current,
            })
          }
          btnClass="!mr-2"
          btnIconClass="!mr-2"
          title="Lọc"
          toolip="Lọc kết quả"
          icon="fas fa-filter"
        />
      </div>
    </div>
  );
};
