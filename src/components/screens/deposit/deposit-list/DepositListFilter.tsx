import { Collapse } from "antd";
import React, { useRef, useState } from "react";
import {
  FilterInput,
  FilterRangeDate,
  FilterSelect,
  IconButton,
} from "~/components";
import {
  EOrderStatusData,
  ESearch3Data,
  orderStatusData,
  search3Data
} from "~/configs/appConfigs";

const codeProps = {
  placeholder: "Nhập nội dung tìm kiếm ...",
  label: "Nội dung",
  name: "code",
  id: "code",
};
const filterBox = `py-2 font-bold uppercase text-[12px] 
flex items-center justify-center border shadow-lg cursor-pointer 
hover:shadow-sm transition-all duration-500 hover:!bg-main hover:!text-white rounded-[4px]`;

type TProps = {
  handleFilter: (newFilter) => void;
  handleExporTExcel: () => void;
  numberOfOrder: any;
  userSale;
};

const CollapsePanelHeader = ({
  setActiveKey,
  activeKey,
  handleExporTExcel,
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
        onClick={() => handleExporTExcel()}
        icon="fas fa-file-export"
        title="Xuất"
        showLoading
        toolip="Xuất Thống Kê"
        green
      />
    </div>
  );
};

export const DepositListFilter: React.FC<TProps> = ({
  handleFilter,
  handleExporTExcel,
  numberOfOrder,
  userSale,
}) => {
  const TypeSearch = useRef<ESearch3Data>(null);
  const SearchContent = useRef<string>(null);
  const FromDate = useRef<string>(null);
  const ToDate = useRef<string>(null);
  const Status = useRef<EOrderStatusData>(-1);
  const SalerID = useRef<number>(null);
  const [activeKey, setActiveKey] = useState("1");

  return (
    <Collapse
      className="!mb-4 collapse-order"
      accordion={true}
      expandIcon={() => (
        <CollapsePanelHeader
          setActiveKey={setActiveKey}
          activeKey={activeKey}
          handleExporTExcel={handleExporTExcel}
        />
      )}
      activeKey={activeKey}
    >
      <Collapse.Panel header={""} key="1">
        <div className="xl:grid xl:grid-cols-6 xl:gap-4 py-6 px-4">
          <div className="col-span-1 xl:mb-0 mb-4">
            <FilterSelect
              data={[
                ...search3Data.slice(0, 1),
                ...search3Data.slice(1, 2),
                ...search3Data.slice(2, 3),
              ]}
              isClearable
              label="Tìm kiếm theo"
              placeholder="Chọn tìm kiếm theo"
              handleSearch={(val: ESearch3Data) => (TypeSearch.current = val)}
            />
          </div>
          <div className="col-span-1 xl:mb-0 mb-4">
            <FilterInput
              {...codeProps}
              handleSearch={(val: string) =>
                (SearchContent.current = val.trim())
              }
            />
          </div>
          <div className="col-span-1 xl:mb-0 mb-4">
            <FilterRangeDate
              format="DD/MM/YYYY"
              placeholder="Từ ngày / đến ngày"
              handleDate={(val: string[]) => {
                FromDate.current = val[0];
                ToDate.current = val[1];
              }}
            />
          </div>
          <div className="col-span-1 xl:mb-0 mb-4">
            <FilterSelect
              isClearable
              data={[...orderStatusData.slice(0, 7)]}
              placeholder="Chọn trạng thái"
              label="Trạng thái"
              handleSearch={(val: EOrderStatusData) => (Status.current = val)}
            />
          </div>
          <div className="col-span-1 xl:mb-0 mb-4">
            <FilterSelect
              isClearable
              data={userSale}
              placeholder="Nhân viên"
              label="Chọn nhân viên kinh doanh"
              select={{ label: "UserName", value: "Id" }}
              handleSearch={(val: number) => (SalerID.current = val)}
            />
          </div>
          <div className="col-span-1 flex justify-end items-end">
            <IconButton
              onClick={() =>
                handleFilter({
                  TypeSearch: TypeSearch.current,
                  SearchContent: SearchContent.current,
                  FromDate: FromDate.current,
                  ToDate: ToDate.current,
                  Status: Status.current,
                  SalerID: SalerID.current,
                  PageIndex: 1,
                })
              }
              title="Lọc"
              icon="fas fa-filter"
              showLoading
              btnClass=""
              toolip="Lọc"
            />
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-5 gap-2 mb-4] p-4">
          {numberOfOrder?.map((item) => (
            <div
              key={item?.name}
              className={`col-span-${item.col} ${filterBox} ${filterBox} ${item?.id === Status.current ? '!bg-main !text-white' : ''}`}
              onClick={() => {
                Status.current = item.id;
                handleFilter({
                  TypeSearch: null,
                  SearchContent: null,
                  FromDate: null,
                  ToDate: null,
                  Status: Status.current,
                  PageIndex: 1,
                });
              }}
            >
              <div className="mx-1">{item.name}</div>
              <div className="mx-1">({item.value})</div>
            </div>
          ))}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};
