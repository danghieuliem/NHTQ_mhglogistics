import { Popover } from "antd";
import React, { FC, useRef } from "react";
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from "~/components";

const usernameProps = {
  id: "username",
  name: "username",
  placeholder: "Chọn Username",
  label: "Username",
};

type TProps = {
  handleFilter: (newFilter) => void;
  onExportExcel: () => void;
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
    <div className="flex gap-2 flex-col xs:flex-row">
      <Popover
        trigger={"click"}
        placement="bottomLeft"
        content={
          <div className="grid sm:grid-cols-2 gap-2 p-2">
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
            <FilterInput
              {...{
                ...usernameProps,
                handleSearch: (val: string) =>
                  (SearchContent.current = val.trim()),
              }}
            />
            <FilterRangeDate
              placeholder="Từ ngày / đến ngày"
              handleDate={(val: string[]) => {
                FromDate.current = val[0];
                ToDate.current = val[1];
              }}
            />
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
            <div className="col-span-full flex items-end justify-end">
              <ActionButton
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
                icon="!mr-0"
                title="Tìm kiếm"
                isButton
                isButtonClassName="bg-main !text-white"
              />
            </div>
          </div>
        }
      >
        <ActionButton
          icon="fas fa-filter"
          title="Bộ lọc"
          isButton
          isButtonClassName="bg-main !text-white"
        />
      </Popover>

      <ActionButton
        onClick={setIsModalOpen}
        icon="fas fa-credit-card"
        title="Thanh toán tất cả"
        isButton
        isButtonClassName="bg-blue !text-white"
      />
      <ActionButton
        onClick={onExportExcel}
        title="Xuất"
        icon="fas fa-file-export"
        isButton
        isButtonClassName="bg-green !text-white"
      />
    </div>
  );
};

export const BonusManagementFilterMemo = React.memo(BonusManagementFilter);
