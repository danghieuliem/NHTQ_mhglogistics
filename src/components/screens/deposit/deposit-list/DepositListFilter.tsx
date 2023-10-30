import { Popover } from "antd";
import React, { useRef, useState } from "react";
import {
  ActionButton,
  FilterInput,
  FilterRangeDate,
  FilterSelect,
  IconButton,
} from "~/components";
import { transportationStatus } from "~/configs";
import {
  EOrderStatusData,
  ESearch3Data,
  search3Data,
} from "~/configs/appConfigs";

const codeProps = {
  placeholder: "Nhập nội dung tìm kiếm ...",
  label: "Nội dung",
  name: "code",
  id: "code",
};

const filterBox = `py-[9px] px-1 leading-[initial] font-bold uppercase text-[12px] rounded-[4px]
flex items-center justify-center border border-[#e8e8e8] shadow-lg 
cursor-pointer hover:shadow-sm transition-all duration-500 hover:!bg-main hover:!text-white`;

type TProps = {
  handleFilter: (newFilter) => void;
  handleExporTExcel: () => void;
  numberOfOrder: any;
  userSale;
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

  const [isShow, setIsShow] = useState(false);

  return (
    <div className="flex justify-between flex-wrap items-end gap-4">
      <div className="flex items-end gap-2">
        <Popover
          trigger={"click"}
          placement="bottomLeft"
          content={
            <div className="grid xs:grid-cols-2 gap-4 p-4">
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

              <FilterInput
                {...codeProps}
                handleSearch={(val: string) =>
                  (SearchContent.current = val.trim())
                }
              />

              <FilterRangeDate
                format="DD/MM/YYYY"
                placeholder="Từ ngày / đến ngày"
                handleDate={(val: string[]) => {
                  FromDate.current = val[0];
                  ToDate.current = val[1];
                }}
              />
              <FilterSelect
                isClearable
                data={transportationStatus}
                placeholder="Chọn trạng thái"
                label="Trạng thái"
                handleSearch={(val: number) => (Status.current = val)}
              />
              <FilterSelect
                isClearable
                data={userSale}
                placeholder="Nhân viên"
                label="Chọn nhân viên kinh doanh"
                select={{ label: "UserName", value: "Id" }}
                handleSearch={(val: number) => (SalerID.current = val)}
              />
              <div className="col-span-full flex justify-end items-end">
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
                  title="Tìm kiếm"
                  icon="mr-0"
                  showLoading
                  btnClass="!bg-sec hover:!bg-main"
                />
              </div>
            </div>
          }
        >
          <ActionButton
            onClick={() => setIsShow(!isShow)}
            icon="fas fa-filter"
            title="Bộ lọc"
            isButton
            isButtonClassName="bg-main !text-white"
          />
        </Popover>
        <ActionButton
          onClick={() => handleExporTExcel()}
          icon="fas fa-file-export"
          title="Xuất"
          isButton
          isButtonClassName="bg-green !text-white"
        />
      </div>

      <div className="flex items-end flex-wrap gap-2">
        {numberOfOrder?.map((item) => (
          <div
            key={item?.name}
            className={`col-span-${item.col} ${filterBox} ${filterBox} ${
              item?.id === Status.current ? "!bg-sec !text-white" : ""
            }`}
            onClick={() => {
              Status.current = item.id;
              setIsShow(!isShow);
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
    </div>
  );
};
