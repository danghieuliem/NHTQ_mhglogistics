import { Popover } from "antd";
import React, { FC, useRef } from "react";
import { FilterInput, FilterSelect, IconButton } from "~/components";

type TProps = {
  handleFilter: (newFilter) => void;
  dathangList?: any;
  saleList?: any;
  isShow?: boolean;
  roleID?: number;
};

const ClientListFilter: FC<TProps> = ({
  handleFilter,
  dathangList,
  saleList,
  isShow = true,
  roleID,
}) => {
  const SearchContent = useRef(null);
  const Phone = useRef(null);
  const UserName = useRef(null);
  const SalerID = useRef(null);
  const OrdererID = useRef(null);

  return (
    <Popover
      trigger={"click"}
      placement="leftBottom"
      content={
        <div className="p-4 grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <FilterInput
              placeholder="Nhập Username"
              id="UserName"
              name="UserName"
              label="Username"
              handleSearch={(val) => (UserName.current = val.trim())}
            />
          </div>
          <div className="col-span-1">
            <FilterInput
              placeholder="Nhập số điện"
              id="phone"
              name="phone"
              label="Số điện thoại"
              handleSearch={(val) => (Phone.current = val.trim())}
            />
          </div>
          {isShow && (
            <>
              {roleID !== 7 && (
                <div className="col-span-1">
                  <FilterSelect
                    placeholder="Nhân viên"
                    label="Nhân viên kinh doanh"
                    data={saleList}
                    select={{ label: "UserName", value: "Id" }}
                    handleSearch={(val) => (SalerID.current = val)}
                    isClearable={true}
                  />
                </div>
              )}
              <div className="col-span-1">
                <FilterSelect
                  placeholder="Nhân viên"
                  label="Nhân viên đặt hàng"
                  data={dathangList}
                  select={{ label: "UserName", value: "Id" }}
                  handleSearch={(val) => (OrdererID.current = val)}
                  isClearable={true}
                />
              </div>
            </>
          )}
          <div className="col-span-1">
            <FilterInput
              placeholder="Nhập email"
              id="mail"
              name="mail"
              label="Email"
              handleSearch={(val) => (SearchContent.current = val.trim())}
            />
          </div>
          <div className="col-span-1 flex items-end justify-end">
            <IconButton
              onClick={() => {
                handleFilter({
                  SearchContent: SearchContent.current,
                  Phone: Phone.current,
                  UserName: UserName.current,
                  SalerID: SalerID.current,
                  OrdererID: OrdererID.current,
                  PageIndex: 1,
                });
              }}
              icon="fas fa-filter"
              title="Lọc"
              btnClass=""
              showLoading
              toolip=""
            />
          </div>
        </div>
      }
    >
      <IconButton
        icon="fas fa-filter"
        title="Bộ lọc"
        btnClass="mr-2"
        showLoading
        toolip=""
      />
    </Popover>
  );
};

export const ClientListFilterMemo = React.memo(ClientListFilter)