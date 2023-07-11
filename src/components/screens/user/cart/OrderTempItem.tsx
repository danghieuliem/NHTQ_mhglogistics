import { Divider, Image, Input, Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { ActionButton, DataTable, IconButton } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

type TProps = {
  // orderTempData: TUserCartOrderTemp;
  index?: number;
  deleteProduct?: () => void;
  onHandleProduct?: (
    type: "update" | "delete",
    data: { Id: number; Quantity: number; Brand?: string }
  ) => void;
  canUpdate?: boolean;
  isLoading?: boolean;
  data: TUserCartOrderTemp[];
};
const InputQuantity = ({ onHandleProduct, record, canUpdate }) => {
  const [value, setValue] = useState(record?.Quantity);

  return (
    <>
      {canUpdate ? (
        <input
          value={value}
          placeholder=""
          className="w-[60px] h-[28px] !rounded-[6px] border !border-[#c4c4c4] !text-center"
          onChange={(val) => {
            const valueTarget = Number(val.target.value);
            if (!isNaN(valueTarget)) {
              setValue(valueTarget);
            }
          }}
          onBlur={() => {
            onHandleProduct("update", {
              Id: record?.Id,
              Quantity: value,
            });
          }}
        />
      ) : (
        <>{record?.Quantity}</>
      )}
    </>
  );
};

const MobileItem = ({ data, onHandleProduct, canUpdate }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      {data?.map((item, index) => (
        <React.Fragment
          key={`${item?.Id}-${item?.OrderShopTempId}-${item?.TitleOrigin}`}
        >
          <div
            className="grid grid-cols-3 gap-2 p-2 w-full"
            key={`${item?.Id}-${item?.OrderShopTempId}-${item?.TitleOrigin}`}
          >
            <div className="col-span-3 text-[#6A6A6A] font-bold">
              {item?.TitleOrigin}
            </div>
            <div
              className={clsx(
                "col-span-1 flex flex-col gap-1",
                !canUpdate && "w-[120px] max-w-full"
              )}
            >
              <img
                src={item?.ImageOrigin}
                alt=""
                width={"100%"}
                className="rounded-[6px]"
              />
              {canUpdate && (
                <span className="flex flex-wrap justify-between items-center">
                  <span className="font-bold text-sec">Stt: {++index}</span>
                  <ActionButton
                    title="Xoá SP"
                    isButton
                    isButtonClassName="bg-red !text-white"
                    icon="fas fa-trash-alt text-text"
                    onClick={() => {
                      onHandleProduct("delete", {
                        Id: item?.Id,
                        Quantity: 0,
                      });
                    }}
                  />
                </span>
              )}
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-1 h-fit">
              <div className="col-span-2 flex items-start justify-between">
                <span className="font-bold w-[100px] mr-2 leading-[inital]">
                  Thuộc tính:{" "}
                </span>
                <span
                  className="text-label text-xs text-right max-w-[130px]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {item?.Property}
                </span>
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="font-bold">Số lượng</span>
                <InputQuantity
                  canUpdate={canUpdate}
                  record={item}
                  onHandleProduct={onHandleProduct}
                />
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="font-bold">Đơn giá</span>
                <span>
                  {_format.getVND(item?.PriceOrigin, " ¥")} /{" "}
                  {_format.getVND(item?.UPriceBuyVN, " đ")}
                </span>
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="font-bold">Thành tiền</span>
                <span>{_format.getVND(item?.EPriceBuyVN, " đ")}</span>
              </div>
              <span className="col-span-2">
                <span className="font-bold">Ghi chú: </span>
                <span className="">
                  {canUpdate ? (
                    <Input
                      size="small"
                      className="!w-[100%]"
                      value={item?.Brand}
                    />
                  ) : (
                    <>{item?.Brand}</>
                  )}
                </span>
              </span>
            </div>
          </div>
          <Divider className="!my-1" />
        </React.Fragment>
      ))}
    </div>
  );
};

export const OrderTempItem: React.FC<TTable<TUserCartOrderTemp> & TProps> = ({
  data,
  onHandleProduct,
  canUpdate = true,
}) => {
  const columns: TColumnsType<TUserCartOrderTemp> = [
    {
      dataIndex: "Id",
      key: "Id",
      title: "Thông tin sản phẩm",
      width: 400,
      render: (_, record, index) => {
        return (
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-1 flex items-start">
              <span className="mr-1 font-bold">{++index}</span>
              <Image
                src={
                  decodeURIComponent(record?.ImageOrigin) ||
                  "/default/pro-empty.jpg"
                }
                width={80}
                preview={false}
                className="rounded-[6px]"
              />
            </div>
            <div className="col-span-3 text-black pl-1 flex flex-col gap-1">
              <Link href={record?.LinkOrigin}>
                <a target="_blank">
                  <Tooltip title="Link sản phẩm">
                    <span className="text-[#6A6A6A]">
                      {record?.TitleOrigin}
                    </span>
                  </Tooltip>
                </a>
              </Link>
              <span className="flex items-start justify-between">
                <span className="font-bold w-[100px] mr-2 leading-[inital]">
                  Thuộc tính:{" "}
                </span>
                <span
                  className="text-label text-xs text-right max-w-[160px]"
                  style={{ wordBreak: "keep-all" }}
                >
                  {record?.Property}
                </span>
              </span>
              <span className="">
                <span className="font-bold">Ghi chú: </span>
                <span className="">
                  {canUpdate ? (
                    <Input
                      size="small"
                      className="!w-[100%]"
                      value={record?.Brand}
                    />
                  ) : (
                    <>{record?.Brand}</>
                  )}
                </span>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "Quantity",
      title: "Số lượng",
      align: "center",
      render: (_, record, index) => {
        return (
          <InputQuantity
            record={record}
            onHandleProduct={onHandleProduct}
            canUpdate={canUpdate}
          />
        );
      },
      responsive: canUpdate ? ["lg"] : ["md"],
    },
    {
      dataIndex: "PriceOrigin",
      align: "center",
      title: <>Đơn giá</>,
      render: (_, record) => {
        return <>{_format.getVND(_, " ¥")}</>;
      },
      responsive: canUpdate ? ["lg"] : ["md"],
    },
    {
      dataIndex: "UPriceBuyVN",
      align: "center",
      title: <>Đơn giá</>,
      render: (_) => _format.getVND(_, " đ"),
      responsive: canUpdate ? ["lg"] : ["md"],
    },

    {
      dataIndex: "EPriceBuyVN",
      title: "Thành tiền",
      align: "center",
      render: (_) => _format.getVND(_, " đ"),
      responsive: canUpdate ? ["lg"] : ["md"],
    },
    {
      dataIndex: "action",
      title: "",
      align: "right",
      width: 30,
      render: (_, record) => {
        return (
          <IconButton
            title=""
            btnClass="!bg-[transparent] outline-none"
            btnIconClass="text-[#CECECE] text-md hover:!text-red"
            toolip="Xóa sản phẩm này!"
            icon="fas fa-trash-alt"
            onClick={() => {
              onHandleProduct("delete", {
                Id: record?.Id,
                Quantity: 0,
              });
            }}
          />
        );
      },
      responsive: canUpdate ? ["lg"] : ["xxl"],
    },
  ];

  const expandable = {
    expandedRowRender: (record) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row">
              <span className="extentable-label">Số lượng: </span>
              <span className="extentable-value">
                <InputQuantity
                  record={record}
                  canUpdate={canUpdate}
                  onHandleProduct={onHandleProduct}
                />
              </span>
            </div>

            <div className="extentable-row">
              <span className="extentable-label">Đơn giá: </span>
              <span className="extentable-value">
                {_format.getVND(record?.PriceOrigin, " ¥")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Đơn giá: </span>
              <span className="extentable-value">
                {_format.getVND(record?.UPriceBuyVN, " đ")}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label">Thành tiền: </span>
              <span className="extentable-value">
                {_format.getVND(record?.EPriceBuyVN, " đ")}
              </span>
            </div>
          </div>

          {canUpdate && (
            <div className="extentable-actions">
              <div className="extentable-button">
                <ActionButton
                  isButton
                  title="Xoá sản phẩm"
                  icon="fas fa-trash-alt"
                  onClick={() => {
                    onHandleProduct("delete", {
                      Id: record?.Id,
                      Quantity: 0,
                    });
                  }}
                />
              </div>
            </div>
          )}
        </div>
      );
    },
    defaultExpandAllRows: true,
  };

  return (
    <>
      {window.innerWidth > 768 ? (
        <DataTable
          style="cartTable"
          data={data}
          columns={columns}
          expandable={expandable}
          mediaWidth={canUpdate ? 992 : null}
        />
      ) : (
        <MobileItem
          data={data}
          onHandleProduct={onHandleProduct}
          canUpdate={canUpdate}
        />
      )}
    </>
  );
};

// export const OrderTempItem: React.FC<TProps> = ({index, orderTempData, updateProduct, deleteProduct, isLoading}) => {

// 	const [quantity, setQuantity] = React.useState(orderTempData?.Quantity);
// 	const [brand, setBrand] = React.useState(orderTempData?.Brand);
// 	const [priceCNY, setPriceCNY] = React.useState(() => {
// 		if (orderTempData?.PricePromotion !== 0) {
// 			return orderTempData?.PriceOrigin > orderTempData?.PricePromotion
// 				? _format.getVND(orderTempData?.PricePromotion, " ")
// 				: _format.getVND(orderTempData?.PriceOrigin, " ");
// 		}

// 		return _format.getVND(orderTempData?.PriceOrigin, " ");
// 	});

// 	const handleQuantity = (val: number) => {
// 		if (!val) {
// 			setQuantity(1);
// 		} else {
// 			setQuantity(val);
// 		}
// 	};

// 	function onChangeOrderBrand(e: React.ChangeEvent<HTMLInputElement>) {
// 		setBrand(e.target.value);
// 	}

// 	return (
// 		// <div
// 		// 	key={orderTempData.Id}
// 		// 	className="orderProductItem border"
// 		// 	style={{
// 		// 		opacity: isLoading ? "0.4" : "1",
// 		// 		pointerEvents: isLoading ? "none" : "all",
// 		// 	}}
// 		// >
// 		// 	<div className="flex flex-wrap  lg:justify-between">
// 		// 		<div className="flex w-full items-center mb-5 justify-between px-3 borderBottom">
// 		// 			<Tooltip title="Link đến sản phẩm">
// 		// 				<a href={orderTempData?.LinkOrigin} target="_blank" className="mainTitle">
// 		// 					{orderTempData?.TitleOrigin}
// 		// 				</a>
// 		// 			</Tooltip>
// 		// 			<div className="xl:block">
// 		// 				<ActionButton
// 		// 					iconContainerClassName="border-none"
// 		// 					title="Cập nhật"
// 		// 					icon={isLoading ? "fas fa-sync fa-spin" : "fas fa-sync-alt"}
// 		// 					onClick={() => updateProduct(quantity, brand)}
// 		// 				/>
// 		// 				<ActionButton
// 		// 					iconContainerClassName="border-none"
// 		// 					title="Xóa sản phẩm này!"
// 		// 					icon="fas fa-trash-alt"
// 		// 					onClick={deleteProduct}
// 		// 				/>
// 		// 			</div>
// 		// 		</div>
// 		// 		<div className="flex xl:w-7/12 items-center">
// 		// 			<div className="flex">
// 		// 				<div className="self-stretch flex items-center">
// 		// 					<div className="w-[20px] h-[20px] text-center rounded-[5px] border border-[#0c5963] flex items-center justify-center">
// 		// 						{++index}
// 		// 					</div>
// 		// 				</div>
// 		// 				<div className="w-[75px] h-[75px] border border-[#6969691a] ml-4 rounded-xl overflow-hidden">
// 		// 					<Link href={orderTempData?.LinkOrigin}>
// 		// 						<a target="_blank">
// 		// 							<img src={_format.parseImageURL(orderTempData?.ImageOrigin)} width="100%" height="100%" />
// 		// 						</a>
// 		// 					</Link>
// 		// 				</div>
// 		// 			</div>
// 		// 			<div className="ml-2">
// 		// 				<div className="flex flex-wrap items-end">
// 		// 					<span className="text-sm mr-4 text-[#484747] font-semibold">* Thuộc tính:</span>
// 		// 					<span>{orderTempData?.Property}</span>
// 		// 				</div>
// 		// 				<div className="flex flex-wrap items-end">
// 		// 					<span className="text-sm mr-4 text-[#484747] font-semibold">* Ghi chú:</span>
// 		// 					<input
// 		// 						type="text"
// 		// 						className="border-b !rounded-none border-[#0000003a] text-[#000] bg-[transparent] max-w-[140px] outline-0"
// 		// 						value={brand ?? ""}
// 		// 						onChange={(e) => onChangeOrderBrand(e)}
// 		// 					/>
// 		// 				</div>
// 		// 			</div>
// 		// 		</div>
// 		// 		<div className="xl:w-5/12">
// 		// 			<div className="grid grid-cols-1 xl:!grid-cols-2">
// 		// 				<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
// 		// 					<div className="text-[10px] py-[2px] uppercase font-bold">Số lượng (cái)</div>
// 		// 					<div className="text-sm text-center">
// 		// 						<InputNumber
// 		// 							size="middle"
// 		// 							min={1}
// 		// 							max={100000}
// 		// 							value={quantity}
// 		// 							onChange={handleQuantity}
// 		// 							// style={{height: "30px"}}
// 		// 						/>
// 		// 					</div>
// 		// 				</div>
// 		// 				<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
// 		// 					<div className="text-[10px] py-[2px] uppercase font-bold">Đơn giá (¥)</div>
// 		// 					<div className="text-orange">
// 		// 						<div className="text-sm text-center">
// 		// 							<InputNumber size="middle" disabled={true} value={priceCNY} />
// 		// 						</div>
// 		// 					</div>
// 		// 				</div>
// 		// 				<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
// 		// 					<div className="text-[10px] py-[2px] uppercase font-bold">Đơn giá (VNĐ)</div>
// 		// 					<div className="text-orange">
// 		// 						<div className="text-sm text-center">
// 		// 							<InputNumber
// 		// 								size="middle"
// 		// 								value={_format.getVND(orderTempData?.UPriceBuyVN, "")}
// 		// 								disabled={true}
// 		// 								// onChange={handleChangePriceCNY}
// 		// 							/>
// 		// 						</div>
// 		// 					</div>
// 		// 				</div>
// 		// 				<div className="col-span-1 lg:!col-span-1 xl:block flex justify-between ml-2 mb-2 xl:mb-0">
// 		// 					<div className="text-[10px] py-[2px] uppercase font-bold">Thành tiền (VNĐ)</div>
// 		// 					<div className="text-sm text-center">
// 		// 						<InputNumber size="middle" value={_format.getVND(orderTempData?.EPriceBuyVN, "")} disabled={true} />
// 		// 					</div>
// 		// 				</div>
// 		// 			</div>
// 		// 		</div>
// 		// 	</div>
// 		// </div>
// 		<DataTable
// 			data={[]}
// 			columns={[]}

// 		/>
// 	);
// };
