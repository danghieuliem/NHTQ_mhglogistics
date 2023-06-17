import { FC, useRef } from "react";
import { FilterInput, FilterRangeDate, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { paymentData } from "~/configs/appConfigs";

const usernameProps = {
  id: "username",
  name: "username",
  placeholder: "Chọn Username",
  label: "Username",
};

type TProps = {
  handleFilter: (newFilter) => void;
  onExportExcel: (data: any) => void;
  setIsModalOpen: () => void;
};

export const BonusManagementFilter: FC<TProps> = ({
  handleFilter,
  onExportExcel,
  setIsModalOpen,
}) => {
  const SearchContent = useRef("");
  const Status = useRef<number>(0);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="">
      <div className="grid grid-cols-5 md:gap-4 gap-2 mb-4">
        <div className="col-span-1 md:mb-0">
          <FilterSelect
            data={paymentData.slice(0, 3)}
            placeholder="Chọn trạng thái"
            label="Trạng thái"
            isClearable
            handleSearch={(val: number) => (Status.current = val)}
          />
        </div>
        <div className="col-span-1 md:mb-0">
          <FilterInput
            {...{
              ...usernameProps,
              handleSearch: (val: string) =>
                (SearchContent.current = val.trim()),
            }}
          />
        </div>
        <div className="col-span-1">
          <FilterRangeDate
            placeholder="Từ ngày / đến ngày"
            handleDate={(val: string[]) => {
              FromDate.current = val[0];
              ToDate.current = val[1];
            }}
          />
        </div>
        <div className="col-span-2 md:mb-0 flex justify-end items-end">
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
            btnClass="!mr-4 md:text-[12px] xl:text-[16px]"
            toolip="Lọc"
          />
          <IconButton
            onClick={setIsModalOpen}
            icon="fas fa-credit-card"
            title="Thanh toán tất cả"
            showLoading
            btnClass="mr-4 iconBlue md:text-[12px] xl:text-[16px]"
            toolip="Thanh toán tất cả"
            blue
          />
          <IconButton
            onClick={(data) => onExportExcel(data)}
            title="Xuất"
            icon="fas fa-file-export"
            showLoading
            toolip="Xuất thống kê"
            green
            btnClass="md:text-[12px] xl:text-[16px]"
          />
        </div>
      </div>
    </div>
  );
};
