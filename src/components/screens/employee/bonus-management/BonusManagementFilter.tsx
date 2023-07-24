import { Popover } from "antd";
import React, { FC, useRef } from "react";
import { FilterInput, FilterRangeDate, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";

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
  roleID?: number;
};

const BonusManagementFilter: FC<TProps> = ({
  handleFilter,
  onExportExcel,
  setIsModalOpen,
  roleID,
}) => {
  const SearchContent = useRef("");
  const Status = useRef<number>(0);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);
  const RoleID = useRef<number>(null);

  return (
    <div className="">
      <Popover
        trigger={"click"}
        placement="bottomLeft"
        content={
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="col-span-1">
              <FilterSelect
                data={[
                  {
                    id: 1,
                    name: "Chưa thanh toán",
                  },
                  {
                    id: 5,
                    name: "Đã thanh toán",
                  },
                ]}
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
            {(roleID === 1 || roleID === 3) && (
              <div className="col-span-1">
                <FilterSelect
                  data={[
                    {
                      id: 4,
                      name: "Đặt hàng",
                    },
                    {
                      id: 7,
                      name: "Kinh doanh",
                    },
                  ]}
                  placeholder="Chọn phân quyền"
                  label="Phân quyền"
                  isClearable
                  handleSearch={(val: number) => (RoleID.current = val)}
                />
              </div>
            )}
            <div className="col-span-2 flex items-end justify-end">
              <IconButton
                onClick={() =>
                  handleFilter({
                    SearchContent: SearchContent.current,
                    FromDate: FromDate.current,
                    ToDate: ToDate.current,
                    Status: Status.current,
                    RoleID: RoleID.current,
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

export const BonusManagementFilterMemo = React.memo(BonusManagementFilter);
