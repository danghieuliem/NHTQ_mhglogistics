import React, { useRef } from "react";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from "~/components/globals/filterBase";

const usernameProps = {
  placeholder: "Nhập username",
  label: "Username",
  id: "username",
  name: "username",
};

type TProps = {
  handleFilter: (newFilter) => void;
  handleExportExcel: () => void;
};
export const RechargeHistoryFilter: React.FC<TProps> = ({
  handleFilter,
  handleExportExcel,
}) => {
  const SearchContent = useRef<string>(null);
  const Status = useRef<number>(null);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="grid md:grid-cols-3 md:gap-2 xl:grid-cols-4 xl:gap-4 w-full">
      <div className="col-span-1 xl:mb-0 mb-4">
        <FilterInput
          {...usernameProps}
          handleSearch={(val: string) => (SearchContent.current = val.trim())}
        />
      </div>

      <div className="col-span-1 xl:mb-0 mb-4">
        <FilterSelect
          data={[
            { id: 1, name: "Chờ duyệt" },
            { id: 2, name: "Đã duyệt" },
            { id: 3, name: "Hủy" },
          ]}
          isClearable
          placeholder="Chọn trạng thái"
          label="Trạng thái đã thanh toán/chưa thanh toán"
          handleSearch={(val: number) => (Status.current = val)}
        />
      </div>
      <div className="col-span-1 xl:mb-0 mb-4">
        <FilterRangeDate
          placeholder="Từ ngày/đến ngày"
          handleDate={(val: string[]) => {
            FromDate.current = val[0];
            ToDate.current = val[1];
          }}
          format="DD/MM/YYYY"
        />
      </div>
      <div className="md:col-span-3 items-end xl:col-span-1 flex md:justify-end xl:justify-between xl:mb-0">
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
          btnIconClass=""
          btnClass="mr-4"
          title="Lọc"
          showLoading
          toolip="Lọc"
        />
        <IconButton
          onClick={() => handleExportExcel()}
          icon="fas fa-file-export"
          title="Xuất"
          showLoading
          toolip="Xuất thống kê"
          green
        />
      </div>
    </div>
  );
};
