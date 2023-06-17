import React, { useRef } from "react";
import { FilterInput, FilterSelect, IconButton } from "~/components";
import { paymentData } from "~/configs";

type TProps = {
  handleFilter: (newFilter) => void;
  handleExportExcel: () => void;
};

export const PersonalRechargeFilter: React.FC<TProps> = ({
  handleFilter,
  handleExportExcel,
}) => {
  const SearchContent = useRef(null);
  const Status = useRef(null);

  return (
    <div className="grid grid-cols-4 mb-4 gap-4">
      <div className="col-span-1">
        <FilterInput
          placeholder="Username"
          id="UserName"
          name="Nhập username"
          label="UserName"
          inputClassName=""
          allowClear
          handleSearch={(val: string) => (SearchContent.current = val.trim())}
        />
      </div>
      <div className="col-span-1">
        <FilterSelect
          data={[
            { name: "Chờ duyệt", id: 1 },
            { name: "Đã duyệt", id: 2 },
            { name: "Hủy", id: 3 },
          ]}
          label="Trạng thái"
          isClearable
          placeholder="Chọn trạng thái"
          handleSearch={(val: number) => (Status.current = val)}
        />
      </div>
      <div className="col-span-1 col-span-1 flex items-end">
        <IconButton
          onClick={() =>
            handleFilter({
              SearchContent: SearchContent.current,
              Status: Status.current,
              PageIndex: 1,
            })
          }
          icon="fas fa-filter"
          btnClass="w-fit self-end"
          title="Lọc"
          showLoading
          toolip="Lọc"
        />
      </div>
      <div className="col-span-1 flex items-end justify-end">
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
