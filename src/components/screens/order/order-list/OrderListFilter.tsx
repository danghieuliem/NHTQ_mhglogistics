import { Collapse } from "antd";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { mainOrder } from "~/api";
import { FilterCheckbox, FilterInput, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  FilterInputNumber,
  FilterRangeDate
} from "~/components/globals/filterBase";
import {
  createdOrderStatusData,
  ECreatedOrderStatusData, searchData
} from "~/configs/appConfigs";
import { _format } from "~/utils";

const filterBox =`py-2 font-bold uppercase text-[12px] flex
 items-center justify-center border shadow-lg cursor-pointer hover:shadow-sm 
 transition-all hover:!translate-y-[5px] duration-500 hover:!bg-main hover:!text-white rounded-[4px]` ;

const codeProps = {
  id: "code",
  name: "code",
  label: "Nội dung tìm kiếm",
  placeholder: "Nhập nội dung tìm kiếm",
};

const fromPriceProps = {
  id: "fromPrice",
  name: "fromPrice",
  label: "Giá từ",
  placeholder: "Nhập giá từ",
};

const toPriceProps = {
  id: "toPrice",
  name: "toPrice",
  label: "Giá đến",
  placeholder: "Nhập giá đến",
};

type TProps = {
  handleFilter: (newFilter) => void;
  handleExportExcel: () => void;
  numberOfOrder: any;
  newUser;
};

const { Panel } = Collapse;

const CollapsePanelHeader = ({
  handleExportExcel,
  setActiveKey,
  activeKey,
}) => {
  return (
    <div className="flex w-full justify-between">
      <IconButton
        onClick={() => setActiveKey(activeKey === 1 ? null : 1)}
        icon="fas fa-filter"
        title="Bộ lọc nâng cao"
        showLoading
        toolip="Bộ lọc nâng cao"
        btnClass="hover:!bg-[#168f9e]"
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
  );
};

const TotalMoney = ({ newUser }) => {
  const { query } = useRouter();

  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 1);

  const firstDayShow = new Date(y, m, 1);
  const lastDayShow = new Date(y, m + 1, 0);
  const [data, setData] = useState({
    Deposit: 0,
    TotalPriceVND: 0,
    UnDeposit: 0,
  });

  const { refetch } = useQuery(
    ["money-in-month"],
    () =>
      mainOrder.priceInMonth({
        FromDate: _format.getVNDate(firstDay, "MM-DD-YYYY"),
        ToDate: _format.getVNDate(lastDay, "MM-DD-YYYY"),
        IsNotMainOrderCode: false,
        PageIndex: 1,
        PageSize: 9999,
        UID: newUser?.UserId,
        RoleID:
          newUser?.UserGroupId === 8 || newUser?.UserGroupId === 6
            ? 3
            : newUser?.UserGroupId,
        OrderType: query?.q !== "3" ? 1 : 3,
      }),
    {
      onSuccess: (res) => {
        const newData = res?.Data;
        setData(newData);
      },
      onError: (err) => {
        console.log("err", err);
      },
      retry: true,
      enabled: !!newUser,
    }
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-3 font-bold">
        Tổng tiền từ{" "}
        <span className="text-red">
          {_format.getVNDate(firstDayShow, "DD-MM-YYYY")}
        </span>{" "}
        đến{" "}
        <span className="text-red">
          {_format.getVNDate(lastDayShow, "DD-MM-YYYY")}
        </span>
      </div>
      <div className="col-span-1">
        <span>Tổng tiền: </span>
        <span className="text-red font-bold">
          {_format.getVND(data?.TotalPriceVND)}
        </span>
      </div>
      <div className="col-span-1">
        <span>Tổng tiền đã trả: </span>
        <span className="text-red font-bold">
          {_format.getVND(data?.Deposit)}
        </span>
      </div>
      <div className="col-span-1">
        <span>Tổng tiền còn lại: </span>
        <span className="text-red font-bold">
          {_format.getVND(data?.UnDeposit)}
        </span>
      </div>
    </div>
  );
};

export const OrderListFilter: FC<TProps> = ({
  handleFilter,
  handleExportExcel,
  numberOfOrder,
  newUser,
}) => {
  const { query } = useRouter();
  const TypeSearch = useRef<number>(null);
  const SearchContent = useRef<string>(null);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);
  const FromPrice = useRef<number>(null);
  const ToPrice = useRef<number>(null);
  const Status = useRef(-1);
  const IsNotMainOrderCode = useRef(false);
  const [activeKey, setActiveKey] = useState("1");

  return (
    <Collapse
      className="collapse-order"
      accordion={true}
      expandIcon={() => (
        <CollapsePanelHeader
          handleExportExcel={handleExportExcel}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
        />
      )}
      activeKey={activeKey}
    >
      <Panel header={""} key="1">
        <div className="grid grid-cols-6 gap-2 mb-4] p-4">
          <div className="col-span-1 lg:mb-0 ">
            <FilterSelect
              placeholder="Chọn ... "
              data={searchData}
              label="Tìm kiếm theo"
              isClearable
              handleSearch={(val: ECreatedOrderStatusData) =>
                (TypeSearch.current = val)
              }
            />
          </div>
          <div className="col-span-1 lg:mb-0 ">
            <FilterInput
              {...codeProps}
              handleSearch={(val: string) =>
                (SearchContent.current = val.trim())
              }
            />
          </div>
          <div className="col-span-1 lg:mb-0 ">
            <FilterRangeDate
              format="DD/MM/YYYY"
              placeholder="Từ ngày / đến ngày"
              handleDate={(val: string[]) => {
                FromDate.current = val[0];
                ToDate.current = val[1];
              }}
            />
          </div>
          <div className="col-span-1 lg:mb-0 ">
            <FilterInputNumber
              {...fromPriceProps}
              suffix=" VNĐ"
              handleSearch={(val: number) => (FromPrice.current = val)}
            />
          </div>
          <div className="col-span-1 lg:mb-0 ">
            <FilterInputNumber
              {...toPriceProps}
              suffix=" VNĐ"
              handleSearch={(val: number) => (ToPrice.current = val)}
            />
          </div>
          <div className="col-span-1 lg:mb-0 ">
            <FilterSelect
              placeholder="Chọn trạng thái"
              label="Trạng thái"
              isClearable
              handleSearch={(val: ECreatedOrderStatusData) =>
                (Status.current = val)
              }
              data={createdOrderStatusData}
            />
          </div>
          <div className="col-span-6 lg:flex items-center justify-end lg:mb-0 ">
            {/* <TotalMoney newUser={newUser} /> */}
            <div className="flex items-end">
              <FilterCheckbox
                label="Đơn không có mã vận đơn"
                onChange={() =>
                  (IsNotMainOrderCode.current = !IsNotMainOrderCode.current)
                }
              />
              <IconButton
                onClick={() =>
                  handleFilter({
                    TypeSearch: TypeSearch.current,
                    SearchContent: SearchContent.current,
                    Status: Status.current,
                    FromPrice: FromPrice.current,
                    ToPrice: ToPrice.current,
                    FromDate: FromDate.current,
                    ToDate: ToDate.current,
                    IsNotMainOrderCode: IsNotMainOrderCode.current,
                    PageIndex: 1,
                  })
                }
                icon="fas fa-filter"
                title="Lọc"
                btnClass=""
                showLoading
                toolip="Lọc"
              />
            </div>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-5 gap-2 mb-4] p-4">
          {(query?.q !== "3"
            ? numberOfOrder.filter((x) => x.id !== 100)
            : numberOfOrder
          )?.map((item) => (
            <div
              key={item?.name}
              className={`col-span-${item.col} ${filterBox} ${item?.id === Status.current ? '!bg-main !text-white' : ''}`}
              onClick={() => {
                Status.current = item.id;        
                handleFilter({
                  TypeSearch: null,
                  SearchContent: null,
                  Status: Status.current,
                  FromPrice: null,
                  ToPrice: null,
                  FromDate: null,
                  ToDate: null,
                  IsNotMainOrderCode: null,
                  PageIndex: 1,
                });
              }}
            >
              <div className={`mx-1`}>{item.name}</div>
              <div className={`mx-1`}>({item.value})</div>
            </div>
          ))}
        </div>
      </Panel>
    </Collapse>
  );
};
