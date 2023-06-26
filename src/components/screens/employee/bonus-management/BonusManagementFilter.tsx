import { Popover } from "antd";
import { FC, useRef } from "react";
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from "~/components";
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
      <Popover
        trigger={"click"}
        placement="bottomLeft"
        content={
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="col-span-1">
              <FilterSelect
                data={paymentData.slice(0, 3)}
                placeholder="Chọn trạng thái"
                label="Trạng thái"
                isClearable
                handleSearch={(val: number) => (Status.current = val)}
              />
            </div>
            <div className="col-span-1">
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
            <div className="col-span-1 flex items-end justify-end">
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
                toolip="Lọc"
              />
            </div>
          </div>
        }
      >
        <IconButton icon="fas fa-filter" title="Bộ lọc" />
      </Popover>

      <IconButton
        onClick={setIsModalOpen}
        icon="fas fa-credit-card"
        title="Thanh toán tất cả"
        showLoading
        toolip="Thanh toán tất cả"
        blue
        btnClass="!mx-2"
      />
      <IconButton
        onClick={(data) => onExportExcel(data)}
        title="Xuất"
        icon="fas fa-file-export"
        showLoading
        toolip="Xuất thống kê"
        green
      />
    </div>
  );
};
