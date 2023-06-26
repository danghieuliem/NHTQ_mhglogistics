import { Popover } from "antd";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
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

export const TransactionCodeManagementFilter: React.FC<TProps> = ({
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
    <div className="flex w-fit ml-auto mb-1 flex-wrap justify-end">
      <ActionButton
        onClick={() => handleExporTExcel()}
        icon="fas fa-file-export !mr-2"
        isButton
        isButtonClassName="bg-green !text-white mr-2"
        title="Xuất thống kê"
      />
      <Popover
        trigger={"click"}
        placement="topRight"
        content={
          <div className="grid grid-cols-4 gap-2 p-2">
            <div className="col-span-4 md:col-span-2">
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
            </div>
            <div className="col-span-4 md:col-span-2">
              <FilterInput
                {...inputProps}
                handleSearch={(val: string) =>
                  (SearchContent.current = val.trim())
                }
              />
            </div>
            <div className="col-span-4 md:col-span-2">
              <FilterSelect
                data={smallPackageStatusData}
                placeholder="Chọn trạng thái"
                label="Trạng thái"
                isClearable
                handleSearch={(val: ESmallPackageStatusData) =>
                  (Status.current = val)
                }
                closeMenuOnSelect={false}
              />
            </div>
            <div className="col-span-4 md:col-span-2">
              <FilterRangeDate
                handleDate={(val: string[]) => {
                  FromDate.current = val[0];
                  ToDate.current = val[1];
                }}
                placeholder="Chọn từ ngày / đến ngày"
                format="DD/MM/YYYY"
              />
            </div>
            <div className="col-span-4 flex justify-end">
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
                icon="fas fa-filter"
                title="Lọc"
                btnIconClass=""
                toolip="Lọc"
              />
            </div>
          </div>
        }
      >
        <ActionButton
          isButton
          icon=""
          title="Bộ lọc"
          isButtonClassName="bg-main !text-white "
        />
      </Popover>
    </div>
  );
};
