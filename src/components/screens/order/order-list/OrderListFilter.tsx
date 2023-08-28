import { Drawer, Tag } from "antd";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import { ActionButton, FilterCheckbox, FilterInput, FilterSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import {
  FilterInputNumber,
  FilterRangeDate,
} from "~/components/globals/filterBase";
import {
  ECreatedOrderStatusData,
  createdOrderStatusData,
  searchData,
} from "~/configs/appConfigs";

const filterBox = `py-2 font-bold uppercase text-[12px] rounded-[4px]
flex items-center justify-center border border-[#e8e8e8] shadow-lg 
cursor-pointer hover:shadow-sm transition-all duration-500 hover:!bg-main hover:!text-white`;

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
            <div className="col-span-2 lg:mb-0 ">
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
            <div className="col-span-2 lg:mb-0 ">
              <FilterInput
                {...codeProps}
                handleSearch={(val: string) =>
                  (SearchContent.current = val.trim())
                }
              />
            </div>
            <div className="col-span-2 lg:mb-0 ">
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
            <div className="col-span-2 lg:mb-0 ">
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
            <div className="col-span-2 flex items-end justify-between">
              <FilterCheckbox
                label="Đơn không có mã vận đơn"
                onChange={() =>
                  (IsNotMainOrderCode.current = !IsNotMainOrderCode.current)
                }
              />
              <IconButton
                onClick={() => {
                  setIsShow(!isShow);
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
                  });
                }}
                icon="mr-0"
                title="Tìm kiếm"
                btnClass="bg-sec hover:!bg-main"
                showLoading
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
                  className={`col-span-${item.col} ${filterBox} ${
                    item?.id === Status.current ? "!bg-main !text-white" : ""
                  }`}
                  onClick={() => {
                    Status.current = item.id;
                    setIsShow(!isShow);
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
          </div>
        </>
      </Drawer>

      <ActionButton
        onClick={() => setIsShow(!isShow)}
        icon="fas fa-filter"
        title="Bộ lọc"
        isButton
        isButtonClassName="bg-main !text-white"
      />
      <ActionButton
        onClick={() => handleExportExcel()}
        icon="fas fa-file-export"
        title="Xuất"
        isButton
        isButtonClassName="bg-green !text-white"
      />
    </div>
  );
};
