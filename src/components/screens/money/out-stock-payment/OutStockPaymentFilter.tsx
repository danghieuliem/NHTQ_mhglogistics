import React, { useRef } from "react";
import { FilterInput, FilterRangeDate, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { outstockStatusData, searchData } from "~/configs/appConfigs";

const usernameProps = {
  placeholder: "Nhập username",
  label: "Username",
  id: "UserName",
  name: "UserName",
};

type TProps = {
  handleFilter: (newFilter) => void;
};

export const OutStockPaymentFilter: React.FC<TProps> = ({ handleFilter }) => {
  const SearchContent = useRef<string>(null);
  const Status = useRef<number>(null);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="grid grid-cols-5 md:gap-1 xl:gap-4 w-full pb-4">
      <div className="col-span-1 mb-0 mb-4">
        <FilterSelect
          data={searchData}
          label="Tìm kiếm theo"
          placeholder="Tìm kiếm"
          handleSearch={() => null}
          isClearable={true}
        />
      </div>
      <div className="col-span-1 mb-0 mb-4">
        <FilterInput
          {...usernameProps}
          handleSearch={(val: string) => (SearchContent.current = val.trim())}
        />
      </div>
      <div className="col-span-1 mb-0 mb-4">
        <FilterSelect
          data={outstockStatusData}
          placeholder="Chọn trạng thái"
          label="Trạng thái"
          handleSearch={(val: number) => {
            Status.current = val;
          }}
          isClearable={true}
        />
      </div>
      <div className="col-span-1 mb-0 mb-4">
        <FilterRangeDate
          format="DD/MM/YYYY"
          placeholder="Từ ngày/đến ngày"
          handleDate={(val: string[]) => {
            FromDate.current = val[0];
            ToDate.current = val[1];
          }}
        />
      </div>
      <div className="col-span-1 text-left text-left mb-0 mb-4 flex items-end">
        <IconButton
          onClick={() =>
            handleFilter({
              SearchContent: SearchContent.current,
              Status: Status.current,
              FromDate: FromDate.current,
              ToDate: ToDate.current,
              PageIndex: 1,
            })
          }
          icon="fas fa-filter"
          title="Lọc"
          showLoading
          toolip="Lọc"
        />
      </div>
    </div>
  );
};
