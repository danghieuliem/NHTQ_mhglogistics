import { Popover } from "antd";
import { FC, useRef } from "react";
import { ActionButton, FilterInput, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { FilterRangeDate } from "~/components/globals/filterBase";
import { EReportStatusData, reportStatusData } from "~/configs/appConfigs";

const usernameProps = {
  id: "username",
  name: "username",
  placeholder: "Nhập Username",
  label: "Usersname",
};

type TProps = {
  handleFilter: (newFilter) => void;
  handleExportExcel: () => void;
};

export const ComplainListFilter: FC<TProps> = ({
  handleFilter,
  handleExportExcel,
}) => {
  const SearchContent = useRef<string>(null);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);
  const Status = useRef<EReportStatusData>(EReportStatusData.All);

  return (
    <>
      <div className="flex items-end gap-2">
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          content={
            <div className="grid grid-cols-1 gap-2 p-2">
              <div className="col-span-1">
                <FilterInput
                  {...usernameProps}
                  handleSearch={(val: string) =>
                    (SearchContent.current = val.trim())
                  }
                />
              </div>
              <div className="col-span-1">
                <FilterRangeDate
                  format="DD/MM/YYYY"
                  placeholder="Từ ngày / đến ngày"
                  handleDate={(val: string[]) => {
                    FromDate.current = val[0];
                    ToDate.current = val[1];
                  }}
                />
              </div>
              <div className="col-span-1 flex justify-end items-end">
                <IconButton
                  onClick={() =>
                    handleFilter({
                      SearchContent: SearchContent.current,
                      FromDate: FromDate.current,
                      ToDate: ToDate.current,
                      Status: Status.current,
                      PageIndex: 1,
                    })
                  }
                  icon="mr-0"
                  title="Tìm kiếm"
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
            isButtonClassName="bg-main !text-white"
          />
        </Popover>
        <div className="w-[200px]">
          <FilterSelect
            placeholder="Chọn trạng thái"
            label="Trạng thái"
            data={reportStatusData}
            handleSearch={(val: EReportStatusData) => {
              handleFilter({
                SearchContent: SearchContent.current,
                FromDate: FromDate.current,
                ToDate: ToDate.current,
                Status: val,
                PageIndex: 1,
              })
            }}
            isClearable
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
    </>
  );
};
