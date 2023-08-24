import { Drawer, Tag } from "antd";
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
  search3Data,
} from "~/configs/appConfigs";

const codeProps = {
  placeholder: "Nhập nội dung tìm kiếm ...",
  label: "Nội dung",
  name: "code",
  id: "code",
};

const filterBox = `py-2 font-bold uppercase text-[12px] rounded-[4px]
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
    <div className="flex justify-between">
      <Drawer
        title={
          <Tag color="text-white" className="!bg-sec">
            Bộ lọc nâng cao
          </Tag>
        }
        placement="right"
        visible={isShow}
        closable={false}
        closeIcon={false}
        onClose={() => setIsShow(!isShow)}
        extra={
          <IconButton
            onClick={() => setIsShow(!isShow)}
            title=""
            icon="far fa-times !mr-0"
            btnClass="!bg-red"
            showLoading
            toolip=""
          />
        }
      >
        <>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 font-bold mb-2 text-[20px]">
              Lọc theo thuộc tính:{" "}
            </div>
            <div className="col-span-2">
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
            <div className="col-span-2">
              <FilterInput
                {...codeProps}
                handleSearch={(val: string) =>
                  (SearchContent.current = val.trim())
                }
              />
            </div>
            <div className="col-span-2">
              <FilterRangeDate
                format="DD/MM/YYYY"
                placeholder="Từ ngày / đến ngày"
                handleDate={(val: string[]) => {
                  FromDate.current = val[0];
                  ToDate.current = val[1];
                }}
              />
            </div>
            <div className="col-span-1">
              <FilterSelect
                isClearable
                data={[...orderStatusData.slice(0, 7)]}
                placeholder="Chọn trạng thái"
                label="Trạng thái"
                handleSearch={(val: EOrderStatusData) => (Status.current = val)}
              />
            </div>
            <div className="col-span-1">
              <FilterSelect
                isClearable
                data={userSale}
                placeholder="Nhân viên"
                label="Chọn nhân viên kinh doanh"
                select={{ label: "UserName", value: "Id" }}
                handleSearch={(val: number) => (SalerID.current = val)}
              />
            </div>
            <div className="col-span-2 flex justify-end items-end">
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
                icon="mr-0"
                showLoading
                btnClass="!bg-sec hover:!bg-main"
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
                  className={`col-span-${item.col} ${filterBox} ${filterBox} ${
                    item?.id === Status.current ? "!bg-main !text-white" : ""
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
        </>
      </Drawer>

      <IconButton
        onClick={() => setIsShow(!isShow)}
        icon="fas fa-filter"
        title="Bộ lọc"
        showLoading
        btnClass="mr-2"
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
