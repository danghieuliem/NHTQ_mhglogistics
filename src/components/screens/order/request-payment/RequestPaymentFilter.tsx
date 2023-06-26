import { Popover } from "antd";
import { FC, useRef } from "react";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from "~/components/globals/filterBase";
import { paymentData } from "~/configs/appConfigs";

const usernameProps = {
  placeholder: "Nhập Username",
  label: "Username",
  name: "username",
  id: "username",
};

type TProps = {
  handleFilter: (newFilter) => void;
  handleExporTExcel: () => void;
  userSale;
};

export const RequestPaymentFilter: FC<TProps> = ({
  handleFilter,
  handleExporTExcel,
  userSale,
}) => {
  const SearchContent = useRef<string>(null);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);
  const Status = useRef<number>(null);
  const SalerId = useRef<number>(null);

  return (
    <div className="w-fit ml-auto">
      <Popover
        trigger={"click"}
        placement="bottomLeft"
        content={
          <div className="grid grid-cols-2 gap-2 p-2">
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
                placeholder="Từ ngày / đến ngày"
                format="DD/MM/YYYY"
                handleDate={(val: string[]) => {
                  FromDate.current = val[0];
                  ToDate.current = val[1];
                }}
              />
            </div>
            <div className="col-span-1">
              <FilterSelect
                data={paymentData}
                label="Trạng thái"
                isClearable
                placeholder="Chọn trạng thái"
                handleSearch={(val: number) => (Status.current = val)}
              />
            </div>
            <div className="col-span-1">
              <FilterSelect
                data={userSale}
                label="Nhân viên kinh doanh"
                isClearable
                select={{ label: "UserName", value: "Id" }}
                placeholder="Nhân viên kinh doanh"
                handleSearch={(val: number) => (SalerId.current = val)}
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <IconButton
                onClick={() =>
                  handleFilter({
                    SearchContent: SearchContent.current,
                    FromDate: FromDate.current,
                    ToDate: ToDate.current,
                    Status: Status.current,
                    SalerId: SalerId.current,
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
        <IconButton
          icon="fas fa-filter"
          btnClass="!mr-2"
          title="Bộ lọc"
          showLoading
        />
      </Popover>
      <IconButton
        onClick={() => handleExporTExcel()}
        btnClass=""
        icon={"fas fa-file-export"}
        title="Xuất"
        showLoading
        toolip="Xuất thống kê"
        green
      />
    </div>
  );
};
