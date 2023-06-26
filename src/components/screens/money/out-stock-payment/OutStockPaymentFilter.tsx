import { Popover } from "antd";
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
    <Popover
      trigger={"click"}
      placement="bottomLeft"
      content={
        <div className="grid grid-cols-2 gap-2 p-2">
          <div className="col-span-1">
            <FilterSelect
              data={searchData}
              label="Tìm kiếm theo"
              placeholder="Tìm kiếm"
              handleSearch={() => null}
              isClearable={true}
            />
          </div>
          <div className="col-span-1 ">
            <FilterInput
              {...usernameProps}
              handleSearch={(val: string) =>
                (SearchContent.current = val.trim())
              }
            />
          </div>
          <div className="col-span-1 ">
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
          <div className="col-span-1 ">
            <FilterRangeDate
              format="DD/MM/YYYY"
              placeholder="Từ ngày/đến ngày"
              handleDate={(val: string[]) => {
                FromDate.current = val[0];
                ToDate.current = val[1];
              }}
            />
          </div>
          <div className="col-span-2 flex items-end justify-end">
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
              title="Lọc"
              showLoading
              toolip="Lọc"
            />
          </div>
        </div>
      }
    >
      <IconButton icon="fas fa-filter" title="Lọc" showLoading toolip="Lọc" />
    </Popover>
  );
};
