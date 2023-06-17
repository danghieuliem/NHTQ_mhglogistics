import { InputNumber, Tooltip } from "antd";
import React, { useState } from "react";
import { ActionButton, toast } from "~/components";
import { _format } from "~/utils";

type TProps = {
  order: TProduct;
  index: number;
  handleUpdateProduct: any;
  loading: boolean;
  RoleID: number;
  // setCheckUpdate: () => void;
  dataStatus: number;
  orderType: number;
};

export const OrderProductItem: React.FC<TProps> = ({
  order,
  index,
  handleUpdateProduct,
  loading,
  RoleID,
  dataStatus,
  orderType,
  // setCheckUpdate,
}) => {
  const [changeValue, setChangeValue] = useState(false);
  const [brand, setBrand] = useState(order?.Brand);
  const [quantity, setQuantity] = useState(order?.Quantity);
  const [priceVND, setPriceVND] = useState(order?.UPriceBuyVN);
  const [priceOrigin, setPriceOrigin] = useState(() => {
    if (orderType === 3) {
      return order?.PriceOrigin;
    } else {
      return order?.PriceOrigin < order?.PricePromotion
        ? order?.PriceOrigin
        : order?.PricePromotion;
    }
  });

  // const [total, setTotal] = useState(order?.PriceVND);
  const [total, setTotal] = useState(order?.UPriceBuyVN * order?.Quantity);

  function onChangeOrderBrand(e: React.ChangeEvent<HTMLInputElement>) {
    setChangeValue(true);
    setBrand(e.target.value);
  }

  function handleQuantity(val: number) {
    setChangeValue(true);
    setQuantity(val);
    const newTotal = priceVND * val;
    setTotal(newTotal);
  }

  function handleChangePriceCNY(val: string) {
    setChangeValue(true);
    setPriceOrigin(Number(val));
    const totalPriceVND = Number(val) * order?.CurrentCNYVN;
    const newTotal = totalPriceVND * quantity;
    setPriceVND(totalPriceVND);
    setTotal(newTotal);
  }

  return (
    <div
      key={order.Id}
      className={`orderProductItem ${changeValue && "!"}border-[red]`}
      style={{
        opacity: loading ? "0.4" : "1",
        pointerEvents: loading ? "none" : "all",
        backgroundColor: changeValue && "#f3e6e6",
      }}
    >
      <div className="flex flex-wrap">
        {changeValue && (
          <div className="flex">
            {/* <Tooltip title="Cập nhật đơn hàng này!">
							<Checkbox
								onClick={() => {
									return setCheckUpdate;
								}}
							/>
						</Tooltip> */}
            <div className="text-right ml-4 w-full text-[red] font-bold italic">
              Giá trị thay đổi! Vui lòng cập nhật sản phẩm!
            </div>
          </div>
        )}

        <div className="flex w-full items-center mb-5 justify-between px-3 borderBottom">
          <Tooltip title="Link đến sản phẩm">
            <a href={order?.LinkOrigin} target="_blank" className="mainTitle">
              {order?.TitleOrigin}
            </a>
          </Tooltip>
          {(RoleID === 1 ||
            RoleID === 3 ||
            RoleID === 4 ||
            RoleID === 8 ||
            RoleID === 6 ||
            (RoleID === 7 && dataStatus !== 2)) && (
            <div className="xl:block">
              <ActionButton
                iconContainerClassName="border-none"
                title="Cập nhật"
                icon={loading ? "fas fa-sync fa-spin" : "fas fa-sync-alt"}
                onClick={() => {
                  handleUpdateProduct(
                    {
                      ...order,
                      Brand: brand,
                      Quantity: quantity,
                      PriceOrigin: priceOrigin,
                      PriceVND: priceVND,
                    },
                    order?.Id
                  );
                  setChangeValue(false);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex md:w-7/12 xl:w-5/12 items-center">
          <div className="flex">
            <div className="self-stretch flex items-center">
              <Tooltip title="Mã sản phẩm">
                <p className="p-2 leading-[initial] font-bold text-[red]">
                  {order?.Id}
                </p>
              </Tooltip>
            </div>
            <div className="w-[75px] h-[75px] border border-[#6969691a] ml-4 rounded-xl overflow-hidden flex items-center">
              <a href={order?.LinkOrigin} target="_blank">
                <img src={order?.ImageOrigin} width="100%" height="100%" />
              </a>
            </div>
          </div>
          <div className="ml-2">
            <div className="flex flex-wrap items-end">
              <span className="text-sm mr-4 text-[#484747] font-semibold">
                * Thuộc tính:
              </span>
              <span>{order?.Property}</span>
            </div>
            <div className="flex flex-wrap items-end">
              <span className="text-sm mr-4 text-[#484747] font-semibold">
                * Ghi chú:
              </span>
              <input
                disabled={!(RoleID === 1 || RoleID === 3 || RoleID === 4)}
                type="text"
                className="border-b !rounded-none border-[#0000003a] text-[#000] bg-[transparent] max-w-[140px] outline-0"
                value={brand ?? ""}
                onChange={(e) => onChangeOrderBrand(e)}
              />
            </div>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 xl:flex md:w-5/12 xl:w-7/12">
          <div className="xl:block flex md:flex-col justify-between ml-2 xl:w-1/4">
            <div className="text-sm font-medium text-black mb-2">
              Số lượng (cái)
            </div>
            <div className="text-sm">
              <InputNumber
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 4 ||
                    RoleID === 3 ||
                    (RoleID === 7 && dataStatus !== 2) ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
                width={"100%"}
                size="middle"
                min={0}
                max={100000}
                value={quantity}
                onChange={handleQuantity}
              />
            </div>
          </div>
          <div className="xl:block flex md:flex-col justify-between ml-2 xl:w-1/4">
            <div className="text-sm font-medium text-black mb-2">
              Đơn giá (¥)
            </div>
            <div className="text-orange">
              <div className="text-sm">
                <InputNumber
                  disabled={
                    !(
                      RoleID === 1 ||
                      RoleID === 3 ||
                      RoleID === 4 ||
                      (RoleID === 7 && dataStatus !== 2) ||
                      RoleID === 8 ||
                      RoleID === 6
                    )
                  }
                  size="middle"
                  value={_format.getVND(priceOrigin, "")}
                  onChange={handleChangePriceCNY}
                />
              </div>
            </div>
          </div>
          <div className="xl:block flex md:flex-col justify-between ml-2 xl:w-1/4">
            <div className="text-sm font-medium text-black mb-2">
              Đơn giá (VNĐ)
            </div>
            <div className="text-orange">
              <div className="text-sm">
                <InputNumber
                  size="middle"
                  value={_format.getVND(priceVND, "")}
                  disabled={true}
                  // onChange={handleChangePriceCNY}
                />
              </div>
            </div>
          </div>
          <div className="xl:block flex md:flex-col justify-between ml-2 xl:w-1/4">
            <div className="text-sm font-medium text-black mb-2">
              Thành tiền (VNĐ)
            </div>
            <div className="text-sm">
              <InputNumber
                size="middle"
                value={_format.getVND(total, "")}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
