import { Popover } from "antd";
import React, { useRef } from "react";
import {
  ActionButton,
  FilterInput,
  FilterSelect,
  IconButton,
} from "~/components";
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
    <div className="flex items-center justify-end">
      <Popover
        trigger={"click"}
        placement="bottomLeft"
        content={
          <div className="grid grid-cols-1 gap-2 p-4 w-[300px]">
            <div className="col-span-1">
              <FilterInput
                placeholder="Username"
                id="UserName"
                name="Nhập username"
                label="UserName"
                inputClassName=""
                allowClear
                handleSearch={(val: string) =>
                  (SearchContent.current = val.trim())
                }
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
            <div className="col-span-1 text-right">
              <IconButton
                onClick={() =>
                  handleFilter({
                    SearchContent: SearchContent.current,
                    Status: Status.current,
                    PageIndex: 1,
                  })
                }
                icon="mr-0"
                title="Lọc"
                showLoading
                toolip="Lọc"
              />
            </div>
          </div>
        }
      >
        <ActionButton
          icon="fas fa-filter"
          title="Lọc"
          isButton
          isButtonClassName="bg-main !text-white mr-2"
        />
      </Popover>
      <ActionButton
        onClick={() => handleExportExcel()}
        icon="fas fa-file-export"
        title="Xuất"
        isButton
        isButtonClassName="bg-green !text-white"
      />
    </div>
  );
};
