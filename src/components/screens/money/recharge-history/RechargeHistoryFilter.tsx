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
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-2 items-end">
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          content={
            <div className="grid grid-cols-1 gap-2 p-2">
              <FilterInput
                {...usernameProps}
                handleSearch={(val: string) =>
                  (SearchContent.current = val.trim())
                }
              />
              <FilterRangeDate
                placeholder="Từ ngày/đến ngày"
                handleDate={(val: string[]) => {
                  FromDate.current = val[0];
                  ToDate.current = val[1];
                }}
                format="DD/MM/YYYY"
              />
              <div className="col-span-1 text-right">
                <IconButton
                  onClick={() =>
                    handleFilter({
                      SearchContent: SearchContent.current,
                      FromDate: FromDate.current,
                      ToDate: ToDate.current,
                      PageIndex: 1,
                    })
                  }
                  icon="mr-0"
                  btnIconClass=""
                  title="Tìm kiếm"
                  showLoading
                  toolip=""
                />
              </div>
            </div>
          }
        >
          <ActionButton
            icon="fas fa-filter"
            title="Bộ lọc"
            isButton
            isButtonClassName="bg-main !text-white mr-2"
          />
        </Popover>
        <div className="w-[200px]">
          <FilterSelect
            data={[
              { id: 1, name: "Chờ duyệt" },
              { id: 2, name: "Đã duyệt" },
              { id: 3, name: "Hủy" },
            ]}
            isClearable
            placeholder="Chọn trạng thái"
            label="Trạng thái"
            handleSearch={(val) => {
              handleFilter({
                Status: val,
                PageIndex: 1,
              });
            }}
          />
        </div>
      </div>
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
