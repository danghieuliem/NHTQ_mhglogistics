import { Drawer, Popover, Space, Tag } from "antd";
import React, { useRef, useState } from "react";
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  EOrderStatusData,
  ESearchData,
  orderStatusData,
  searchData,
} from "~/configs/appConfigs";
import { _format } from "~/utils";

const inputProps = {
  id: "id",
  name: "id",
  placeholder: "Nhập nội dung tìm kiếm",
  label: "Nhập ID / mã vận đơn",
};

const filterBox = `py-2 font-bold uppercase text-[12px] border-[#e8e8e8] rounded-[4px]
flex items-center justify-center border shadow-lg 
cursor-pointer hover:shadow-sm transition-all duration-500 hover:!bg-main hover:!text-white`;

type TProps = {
  handleFilter: (newFilter) => void;
  // handleModalRequestExportPackages: (type: 'all' | 'some') => void;
  isSelectSomeItems: boolean;
  numberOfOrder: any;
  moneyOfOrders: any;
};

const NumberOfOrderComp = ({ numberOfOrder }) => {
  return (
    <div className="min-w-[300px] p-4">
      {numberOfOrder?.map((item, index) => (
        <div
          className="grid grid-cols-3 gap-2 py-1 my-1"
          key={`${item.name}-${index}`}
        >
          <div className="col-span-2 font-bold">{item.name}</div>
          <div className="col-span-1 text-main text-right font-bold">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

const MoneyOfOrdersComp = ({ moneyOfOrders }) => {
  return (
    <div className="w-fit p-4">
      {moneyOfOrders?.map((item, index) => (
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-2 py-1 my-1"
          key={`${item.label}-${index}`}
        >
          <div className="col-span-1 md:col-span-2 font-bold">{item.label}</div>
          <div className="col-span-1 text-main text-right font-bold">
            {_format.getVND(item.value)}
          </div>
        </div>
      ))}
    </div>
  );
};

const UserDepositListFilter: React.FC<TProps> = ({
  handleFilter,
  numberOfOrder,
  moneyOfOrders,
}) => {
  const [isShow, setIsShow] = useState(false);
  const TypeSearch = useRef<ESearchData>(ESearchData.All);
  const SearchContent = useRef<string>(null);
  const Status = useRef<EOrderStatusData>(-1);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="flex w-fit ml-auto mb-1 flex-wrap">
      <Popover
        trigger="click"
        placement="bottomRight"
        content={<NumberOfOrderComp numberOfOrder={numberOfOrder} />}
      >
        <ActionButton
          title="Thông tin đơn hàng"
          icon=""
          isButton
          isButtonClassName="bg-blue !text-white hover:bg-sec ml-2"
        />
      </Popover>
      <Popover
        trigger={"click"}
        placement="bottomRight"
        content={<MoneyOfOrdersComp moneyOfOrders={moneyOfOrders} />}
      >
        <ActionButton
          title="Thông tin tiền hàng"
          icon=""
          isButton
          isButtonClassName="bg-green !text-white hover:bg-sec ml-2"
        />
      </Popover>
      <ActionButton
        title="Bộ lọc"
        icon="fas fa-filter"
        isButton
        onClick={() => setIsShow(!isShow)}
        isButtonClassName="bg-main !text-white ml-2"
      />
      <Drawer
        title={
          <Tag color="text-white" className="!bg-main shadow-lg">
            Bộ lọc nâng cao
          </Tag>
        }
        placement="right"
        visible={isShow}
        closable={false}
        closeIcon={false}
        onClose={() => setIsShow(!isShow)}
        extra={
          <Space>
            <IconButton
              onClick={() => setIsShow(!isShow)}
              title=""
              icon="far fa-times mr-0"
              btnClass="bg-red"
              showLoading
              toolip=""
            />
          </Space>
        }
      >
        <div className="">
          <div className="grid grid-cols-1 gap-2">
            <div className="col-span-1 font-bold mb-2 text-[20px]">
              Lọc theo thuộc tính:{" "}
            </div>
            <div className="col-span-1 sm:mb-0 mb-4">
              <FilterSelect
                data={searchData.slice(0, 3)}
                label="Tìm kiếm theo"
                placeholder="Nội dung tìm kiếm"
                handleSearch={(val: ESearchData) => {
                  TypeSearch.current = val;
                }}
              />
            </div>
            <div className="col-span-1">
              <FilterInput
                {...{
                  ...inputProps,
                  handleSearch: (val: string) =>
                    (SearchContent.current = val.trim()),
                }}
              />
            </div>
            <div className="col-span-1">
              <FilterSelect
                data={orderStatusData}
                placeholder="Chọn trạng thái"
                label="Trạng thái"
                handleSearch={(val: EOrderStatusData) => {
                  Status.current = val;
                }}
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
            <div className="col-span-1 ml-auto mt-2">
              <IconButton
                onClick={() => {
                  setIsShow(!isShow);
                  handleFilter({
                    TypeSearch: TypeSearch.current,
                    SearchContent: SearchContent.current,
                    Status: Status.current,
                    FromDate: FromDate.current,
                    ToDate: ToDate.current,
                    PageIndex: 1,
                  });
                }}
                icon="far fa-search"
                title="Tìm kiếm"
                showLoading
                toolip=""
              />
            </div>
          </div>
          <div className="grid grid-cols-2 mt-10">
            <div className="col-span-2 font-bold mb-2 text-[20px]">
              Lọc nhanh trạng thái:{" "}
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-2">
              {numberOfOrder?.map((item) => (
                <div
                  key={item?.name}
                  className={`col-span-${item.col} ${filterBox} ${
                    item?.id === Status.current ? "!bg-main !text-white" : ""
                  }`}
                  onClick={() => {
                    Status.current = item.id;
                    setIsShow(!isShow);
                    handleFilter({
                      TypeSearch: TypeSearch.current,
                      SearchContent: SearchContent.current,
                      Status: Status.current,
                      FromDate: FromDate.current,
                      ToDate: ToDate.current,
                      PageIndex: 1,
                    });
                  }}
                >
                  <div className="mx-1">{item.name}</div>
                  <div className="mx-1">({item.value})</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export const UserDepositListFilterMemo = React.memo(UserDepositListFilter);
