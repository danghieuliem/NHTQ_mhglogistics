import { Popover } from "antd";
import React, { useRef } from "react";
import { ActionButton } from "~/components/globals/button/ActionButton";
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
    <div className="flex items-center justify-end">
      <Popover
        trigger={"click"}
        placement="bottomLeft"
        content={
          <div className="grid grid-cols-1 gap-2 p-4 w-[300px]">
            <div className="col-span-1">
              <FilterInput
                {...usernameProps}
                handleSearch={(val: string) =>
                  (SearchContent.current = val.trim())
                }
              />
            </div>

            <div className="col-span-1">
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
            <div className="col-span-1">
              <FilterRangeDate
                placeholder="Từ ngày/đến ngày"
                handleDate={(val: string[]) => {
                  FromDate.current = val[0];
                  ToDate.current = val[1];
                }}
                format="DD/MM/YYYY"
              />
            </div>
            <div className="col-span-1 text-right">
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
                icon="mr-0"
                btnIconClass=""
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
