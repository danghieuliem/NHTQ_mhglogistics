import { Popover } from "antd";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  ESearchSmallPackageStatusData,
  ESmallPackageStatusData,
  searchSmallPackageStatusData,
  smallPackageStatusData,
} from "~/configs/appConfigs";

const inputProps = {
  id: "code",
  name: "code",
  placeholder: "Nhập nội dung",
  label: "Nội dung",
};

type TProps = {
  handleFilter: (newFilter) => void;
  handleExporTExcel: () => void;
};

const TransactionCodeManagementFilter: React.FC<TProps> = ({
  handleFilter,
  handleExporTExcel,
}) => {
  const router = useRouter();
  const SearchType = useRef<ESearchSmallPackageStatusData>(null);
  const SearchContent = useRef<string>(null);
  const Status = useRef<ESmallPackageStatusData>(null);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="flex justify-between items-end">
      <div className="flex items-end gap-2">
        <Popover
          trigger={"click"}
          placement="topLeft"
          content={
            <div className="grid grid-cols-1 gap-2 p-2">
              <FilterSelect
                data={
                  router.asPath.includes("user")
                    ? searchSmallPackageStatusData.slice(0, 3)
                    : searchSmallPackageStatusData
                }
                placeholder="Chọn tìm kiếm theo"
                label="Tìm kiếm theo"
                isClearable
                handleSearch={(val: ESearchSmallPackageStatusData) =>
                  (SearchType.current = val)
                }
              />
              <FilterInput
                {...inputProps}
                handleSearch={(val: string) =>
                  (SearchContent.current = val.trim())
                }
              />
              <FilterRangeDate
                handleDate={(val: string[]) => {
                  FromDate.current = val[0];
                  ToDate.current = val[1];
                }}
                placeholder="Chọn từ ngày / đến ngày"
                format="DD/MM/YYYY"
              />
              <div className="col-span-full ml-auto">
                <IconButton
                  onClick={() =>
                    handleFilter({
                      SearchType: SearchType.current,
                      SearchContent: SearchContent.current,
                      Status: Status.current,
                      FromDate: FromDate.current,
                      ToDate: ToDate.current,
                      PageIndex: 1,
                    })
                  }
                  icon="!mr-0"
                  title="Tìm kiếm"
                  btnIconClass=""
                  toolip="Lọc"
                />
              </div>
            </div>
          }
        >
          <ActionButton
            isButton
            icon="fas fa-filter"
            title="Bộ lọc"
            isButtonClassName="bg-main !text-white "
          />
        </Popover>
        <div className="w-[200px]">
          <FilterSelect
            data={smallPackageStatusData}
            placeholder="Chọn trạng thái"
            label="Trạng thái"
            isClearable
            handleSearch={(val: ESmallPackageStatusData) => {
              handleFilter({
                SearchType: SearchType.current,
                SearchContent: SearchContent.current,
                Status: val,
                FromDate: FromDate.current,
                ToDate: ToDate.current,
                PageIndex: 1,
              });
            }}
          />
        </div>
      </div>
      <ActionButton
        onClick={() => handleExporTExcel()}
        icon="fas fa-file-export !mr-2"
        isButton
        isButtonClassName="bg-green !text-white mr-2"
        title="Xuất"
      />
    </div>
  );
};

export const TransactionCodeManagementFilterMemo = React.memo(
  TransactionCodeManagementFilter
);
