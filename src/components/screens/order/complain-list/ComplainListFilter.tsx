import { FC, useRef } from "react";
import { FilterInput, FilterSelect } from "~/components";
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
    <div className="grid grid-cols-4 md:gap-1 xl:gap-4 w-full">
      <div className="col-span-1 mb-0 mb-4">
        <FilterInput
          {...usernameProps}
          handleSearch={(val: string) => (SearchContent.current = val.trim())}
        />
      </div>
      <div className="col-span-1 mb-0 mb-4">
        <FilterRangeDate
          format="DD/MM/YYYY"
          placeholder="Từ ngày / đến ngày"
          handleDate={(val: string[]) => {
            FromDate.current = val[0];
            ToDate.current = val[1];
          }}
        />
      </div>
      <div className="col-span-1 mb-0 mb-4">
        <FilterSelect
          placeholder="Chọn trạng thái"
          label="Trạng thái"
          data={reportStatusData}
          handleSearch={(val: EReportStatusData) => {
            Status.current = val;
          }}
          isClearable
        />
      </div>
      <div className="col-span-1 flex justify-between items-end">
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
          icon="fas fa-filter"
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
