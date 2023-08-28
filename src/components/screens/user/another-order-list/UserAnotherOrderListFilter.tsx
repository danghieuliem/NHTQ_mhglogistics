import { Popover } from "antd";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from "~/components";
import {
  ECreatedOrderStatusData,
  ESearchData,
  createdOrderStatusData,
  search2Data,
} from "~/configs/appConfigs";
import { _format } from "~/utils";

const inputProps = {
  id: "id",
  name: "id",
  placeholder: "Nhập nội dung tìm kiếm",
  label: "ID đơn hàng / tên shop / tên website",
};

const filterBox = `py-2 px-[12px] font-bold uppercase text-[12px] rounded-[4px] leading-[initial]
flex items-center justify-center border border-[#e8e8e8] shadow-lg 
cursor-pointer hover:shadow-sm transition-all duration-500 hover:!bg-main hover:!text-white`;

type TProps = {
  handleFilter: (newFilter) => void;
  numberOfOrder: any;
  moneyOfOrders: any;
};

const NumberOfOrderComp = ({ numberOfOrder, q }) => {
  return (
    <div className="min-w-[300px] p-4">
      {(q !== "3"
        ? numberOfOrder.filter((x) => x.id !== 100)
        : numberOfOrder
      )?.map((item, index) => (
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

const CountComponent = ({ numberOfOrder, moneyOfOrders }) => {
  const { query } = useRouter();
  return (
    <div className="flex gap-2">
      <Popover
        trigger="click"
        placement="bottomRight"
        content={
          <NumberOfOrderComp numberOfOrder={numberOfOrder} q={query?.id} />
        }
      >
        <ActionButton
          title="Thông tin đơn hàng"
          icon=""
          isButton
          isButtonClassName="bg-blue !text-white hover:bg-sec"
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
          isButtonClassName="bg-green !text-white hover:bg-sec"
        />
      </Popover>
    </div>
  );
};

export const CountComponentMemo = React.memo(CountComponent);

const UserAnotherOrderListFilter: React.FC<TProps> = ({
  handleFilter,
  numberOfOrder,
  moneyOfOrders,
}) => {
  const [isShow, setIsShow] = useState(false);
  const { query } = useRouter();
  const TypeSearch = useRef<ESearchData>(null);
  const SearchContent = useRef<string>(null);
  const Status = useRef<ECreatedOrderStatusData>(-1);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);

  return (
    <div className="flex justify-between flex-wrap items-end gap-4 w-full">
      <div className="flex gap-2 ml-auto">
        <CountComponentMemo
          moneyOfOrders={moneyOfOrders}
          numberOfOrder={numberOfOrder}
        />
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          content={
            <div className="grid grid-cols-1 gap-4 p-4">
              <div className="col-span-1">
                <FilterSelect
                  isClearable={true}
                  label="Tìm kiếm theo"
                  data={search2Data}
                  placeholder="Nội dung tìm kiếm"
                  handleSearch={(val: number) => (TypeSearch.current = val)}
                />
              </div>
              <div className="col-span-1">
                <FilterInput
                  {...{
                    ...inputProps,
                    handleSearch: (val: string) =>
                      (SearchContent.current = val),
                  }}
                />
              </div>
              <div className="col-span-1">
                <FilterSelect
                  isClearable={true}
                  data={createdOrderStatusData}
                  placeholder="Chọn trạng thái"
                  label="Trạng thái"
                  handleSearch={(val: ECreatedOrderStatusData) =>
                    (Status.current = val)
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
              <div className="col-span-full ml-auto">
                <ActionButton
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
                  title="Tìm kiếm"
                  icon="!mr-0"
                  isButton
                  isButtonClassName="bg-sec !text-white"
                />
              </div>
            </div>
          }
        >
          <ActionButton
            title="Bộ lọc"
            icon="fas fa-filter"
            isButton
            isButtonClassName="bg-main !text-white"
          />{" "}
        </Popover>
      </div>
      <div className="flex items-end flex-wrap gap-2 w-full">
        {(query?.q !== "3"
          ? numberOfOrder.filter((x) => x.id !== 100)
          : numberOfOrder
        )?.map((item) => {
          const len =
            (1 /
              (query?.q !== "3"
                ? numberOfOrder?.filter((x) => x.id !== 100).length
                : numberOfOrder?.length)) *
            100;
          return (
            <div
              key={item?.name}
              className={`col-span-${item.col} ${filterBox} ${
                item?.id === Status.current ? "!bg-sec !text-white" : ""
              }`}
              style={{
                minWidth: `calc(${len}% - 8px)`,
              }}
              onClick={() => {
                setIsShow(!isShow);
                Status.current = item.id;
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
          );
        })}
      </div>
    </div>
  );
};

export const UserAnotherOrderListFilterMemo = React.memo(
  UserAnotherOrderListFilter
);
