import { Card, Drawer, Popover, Space, Tag } from "antd";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  ECreatedOrderStatusData,
  ESearchData,
  createdOrderStatusData,
  search2Data,
} from "~/configs/appConfigs";
import { TTable } from "~/types/table";
import { _format } from "~/utils";

const inputProps = {
  id: "id",
  name: "id",
  placeholder: "Nhập nội dung tìm kiếm",
  label: "ID đơn hàng / tên shop / tên website",
};

const filterBox = `py-2 font-bold uppercase text-[12px] rounded-[4px]
flex items-center justify-center border border-[#e8e8e8] shadow-lg 
cursor-pointer hover:shadow-sm transition-all duration-500 hover:!bg-main hover:!text-white`;

type TProps = {
  handleFilter: (newFilter) => void;
  handleDepositAll: TTable<TOrder>["handleModal"];
  handlePaymentAll: TTable<TOrder>["handleModal"];
  numberOfOrder: any;
  moneyOfOrders: any;
};

const NumberOfOrderComp = ({ numberOfOrder }) => {
  return (
    <Card>
      <div className="min-w-[300px]">
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
    </Card>
  );
};

const MoneyOfOrdersComp = ({ moneyOfOrders }) => {
  return (
    <Card>
      <div className="w-fit">
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
    </Card>
  );
};

export const UserAnotherOrderListFilter: React.FC<TProps> = ({
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
        title={<Tag color="text-white" className="!bg-sec">Bộ lọc nâng cao</Tag>}
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
              icon="far fa-times !mr-0"
              btnClass="!bg-red"
              showLoading
              toolip=""
            />
          </Space>
        }
      >
        <>
          <div className="grid grid-cols-1 gap-2">
            <div className="col-span-1 font-bold mb-2 text-[20px]">
              Lọc theo thuộc tính:{" "}
            </div>
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
                  handleSearch: (val: string) => (SearchContent.current = val),
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
                title="Tìm kiếm"
                icon="far fa-search"
                btnClass=""
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
              {(query?.q !== "3"
                ? numberOfOrder.filter((x) => x.id !== 100)
                : numberOfOrder
              )?.map((item) => (
                <div
                  key={item?.name}
                  className={`col-span-${
                    item.col
                  } ${filterBox} ${
                    item?.id === Status.current ? "!bg-main !text-white" : ""
                  }`}
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
              ))}
            </div>
          </div>
        </>
      </Drawer>
    </div>
  );
};
