import { Checkbox, Collapse, InputNumber, Tooltip } from "antd";
import { FormSelect } from "~/components";
import { TControl } from "~/types/field";
import { _format } from "~/utils";

type TProps = TControl<TUserPayment> & {
  orderShopTempData: TUserCartOrderShopTemp;
  warehouseTQ?: TBaseReponseParams[];
  warehouseVN?: TBaseReponseParams[];
  shippingTypeToWarehouse?: TBaseReponseParams[];
  // warehouseFromData: any;
  // warehouseToData: any;
  // shippingType: any;
  userPayment: any;
  index: number;
};

const ItemProduct = ({ orderTemp, index }) => {
  return (
    <div key={orderTemp.Id} className="orderProductItem border">
      <div className="xl:flex flex-wrap">
        <div className="xl:flex xl:w-full items-center mb-5 justify-between px-3 borderBottom">
          <Tooltip title="Link đến sản phẩm">
            <a
              href={orderTemp?.LinkOrigin}
              target="_blank"
              className="mainTitle"
            >
              {orderTemp?.TitleOrigin}
            </a>
          </Tooltip>
        </div>
        <div className="flex xl:w-5/12 items-center">
          <div className="flex">
            <div className="self-stretch flex items-center">
              <div className="w-[20px] h-[20px] text-center rounded-full text-orange border">
                {++index}
              </div>
            </div>
            <div className="w-[75px] h-[75px] border border-[#6969691a] ml-4 rounded-xl overflow-hidden">
              <a href={orderTemp?.LinkOrigin} target="_blank">
                <img
                  src={_format.parseImageURL(orderTemp?.ImageOrigin)}
                  width="100%"
                  height="100%"
                />
              </a>
            </div>
          </div>
          <div className="ml-2">
            <div className="flex flex-wrap items-end">
              <span className="text-sm mr-4 text-[#484747] font-semibold">
                * Thuộc tính:
              </span>
              <span>{orderTemp?.Property}</span>
            </div>
            <div className="flex flex-wrap items-end">
              <span className="text-sm mr-4 text-[#484747] font-semibold">
                * Ghi chú:
              </span>
              <input
                type="text"
                className="border-b !rounded-none border-[#0000003a] text-[#000] bg-[transparent] max-w-[140px] outline-0"
                value={orderTemp?.Brand ?? ""}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex xl:w-7/12">
          <div className="xl:block flex justify-between ml-2 xl:w-1/4">
            <div className="text-sm font-medium text-black text-center mb-2">
              Số lượng <br /> (cái)
            </div>
            <div className="text-sm text-center">
              <InputNumber
                width={"100%"}
                size="middle"
                min={1}
                max={100000}
                value={orderTemp?.Quantity}
                disabled
              />
            </div>
          </div>
          <div className="xl:block flex justify-between ml-2 xl:w-1/4">
            <div className="text-sm font-medium text-black text-center mb-2">
              Đơn giá <br /> (¥)
            </div>
            <div className="text-orange">
              <div className="text-sm text-center">
                <InputNumber
                  size="middle"
                  value={_format.getVND(orderTemp?.UPriceBuy, "")}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="xl:block flex justify-between ml-2 xl:w-1/4">
            <div className="text-sm font-medium text-black text-center mb-2">
              Đơn giá <br /> (VNĐ)
            </div>
            <div className="text-orange">
              <div className="text-sm text-center">
                <InputNumber
                  size="middle"
                  value={_format.getVND(orderTemp?.UPriceBuyVN, "")}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="xl:block flex justify-between ml-2 xl:w-1/4">
            <div className="text-sm font-medium text-black text-center mb-2">
              Thành tiền <br /> (VNĐ)
            </div>
            <div className="text-sm text-center">
              <InputNumber
                size="middle"
                value={_format.getVND(
                  orderTemp?.UPriceBuyVN * orderTemp?.Quantity,
                  ""
                )}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaymentOrderInfo: React.FC<TProps> = ({
  orderShopTempData,
  index,
  control,
  // warehouseFromData,
  // warehouseToData,
  // shippingType,
  userPayment,
  warehouseTQ,
  warehouseVN,
  shippingTypeToWarehouse,
}) => {
  return (
    <div className="tableBox py-3">
      <div className="mb-4">
        <Collapse
          defaultActiveKey={index}
          expandIconPosition="right"
          collapsible="disabled"
        >
          <Collapse.Panel
            header={
              <h2 className="uppercase font-bold !mb-0 text-[#fff]">
                <Tooltip title="Tên cửa hàng!">
                  {orderShopTempData?.ShopName}
                </Tooltip>
              </h2>
            }
            key={index}
          >
            <div className="">
              {!!orderShopTempData?.OrderTemps?.length &&
                orderShopTempData?.OrderTemps.map((orderTemp, index) => (
                  <ItemProduct
                    orderTemp={orderTemp}
                    index={index}
                    key={orderTemp.Id}
                  />
                ))}
            </div>
          </Collapse.Panel>
        </Collapse>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <div className="tableBox bg-[#f3f6fa] !py-0 !m-0 !h-fit">
              <div className="p-3">
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#141046] font-semibold">Tổng đơn</p>
                  <span className="text-orange text-base font-semibold">
                    {_format.getVND(orderShopTempData?.TotalPriceVND)}
                  </span>
                </div>
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#141046] font-semibold">Tổng tiền hàng</p>
                  <span className="text-blue font-semibold">
                    {_format.getVND(orderShopTempData?.PriceVND)}
                  </span>
                </div>
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#141046] font-semibold">Phí mua hàng</p>
                  <span className="text-[#f14f04] font-semibold">
                    {orderShopTempData?.FeeBuyPro > 0
                      ? _format.getVND(orderShopTempData?.FeeBuyPro)
                      : "Chờ cập nhật"}
                  </span>
                </div>
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#626262]">Phí ship TQ</p>
                  <span>Chờ cập nhật</span>
                </div>
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#626262]">Phí vận chuyển TQ-VN</p>
                  <span className="text-[#626262]">Chờ cập nhật</span>
                </div>
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#626262]">Phí kiểm đếm</p>
                  <span>
                    {orderShopTempData?.IsCheckProduct
                      ? orderShopTempData?.IsCheckProductPrice > 0
                        ? _format.getVND(orderShopTempData?.IsCheckProductPrice)
                        : "Chờ cập nhật"
                      : "Không yêu cầu"}
                  </span>
                </div>
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#626262]">Phí đóng gỗ</p>
                  <span>
                    {orderShopTempData?.IsPacked
                      ? orderShopTempData?.IsPackedPrice > 0
                        ? _format.getVND(orderShopTempData?.IsPackedPrice)
                        : "Chờ cập nhật"
                      : "Không yêu cầu"}
                  </span>
                </div>
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#626262]">Phí bảo hiểm</p>
                  <span>
                    {orderShopTempData?.IsInsurance
                      ? orderShopTempData?.InsuranceMoney > 0
                        ? _format.getVND(orderShopTempData?.InsuranceMoney)
                        : "Chờ cập nhật"
                      : "Không yêu cầu"}
                  </span>
                </div>
                <div className="text-sm flex justify-between w-full pb-3">
                  <p className="text-[#626262]">Phí giao hàng</p>
                  <span>
                    {orderShopTempData?.IsFastDelivery
                      ? orderShopTempData?.IsFastDeliveryPrice > 0
                        ? _format.getVND(orderShopTempData?.IsFastDeliveryPrice)
                        : "Chờ cập nhật"
                      : "Không yêu cầu"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="grid grid-cols-2 mb-4 pb-4 col-span-1 border-[#56545454] border-b">
              <Checkbox
                className="transfer col-span-1"
                disabled
                checked={orderShopTempData?.IsFastDelivery}
              >
                Giao tận nhà
              </Checkbox>
              <Checkbox
                className="transfer col-span-1"
                disabled
                checked={orderShopTempData?.IsCheckProduct}
              >
                Kiểm hàng
              </Checkbox>
              <Checkbox
                className="transfer col-span-1 !ml-0"
                disabled
                checked={orderShopTempData?.IsPacked}
              >
                Đóng gỗ
              </Checkbox>
              <Checkbox
                className="transfer col-span-1"
                disabled
                checked={orderShopTempData?.IsInsurance}
              >
                Bảo hiểm
              </Checkbox>
            </div>
            <div className="">
              <div className="col-span-1 mb-2">
                <FormSelect
                  data={warehouseTQ}
                  select={{ label: "Name", value: "Id" }}
                  name={`ShopPayments.${index}.WarehouseTQ`}
                  label="Chọn kho TQ"
                  defaultValue={warehouseTQ?.find(
                    (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
                  )}
                  placeholder="Chọn kho TQ"
                  control={control}
                  required={
                    !warehouseTQ?.find(
                      (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
                    )
                  }
                  rules={
                    !warehouseTQ?.find(
                      (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
                    )
                      ? { required: "Vui lòng chọn kho TQ" }
                      : { required: false }
                  }
                />
              </div>
              <div className="col-span-1 mb-2">
                <FormSelect
                  data={warehouseVN}
                  select={{ label: "Name", value: "Id" }}
                  name={`ShopPayments.${index}.WarehouseVN`}
                  label="Chuyển về kho"
                  placeholder="Chuyển về kho"
                  defaultValue={warehouseVN?.find(
                    (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
                  )}
                  control={control}
                  required={
                    !warehouseVN?.find(
                      (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
                    )
                  }
                  rules={
                    !warehouseVN?.find(
                      (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
                    )
                      ? { required: "Vui lòng chọn kho VN" }
                      : { required: false }
                  }
                />
              </div>
              <div className="col-span-1 mb-2">
                <FormSelect
                  data={shippingTypeToWarehouse}
                  select={{ label: "Name", value: "Id" }}
                  name={`ShopPayments.${index}.ShippingType`}
                  label="Phương thức vận chuyển"
                  placeholder="Phương thức vận chuyển"
                  defaultValue={shippingTypeToWarehouse?.find(
                    (x) => x.Id === Number(userPayment?.Data?.ShippingType)
                  )}
                  control={control}
                  required={
                    !shippingTypeToWarehouse?.find(
                      (x) => x.Id === Number(userPayment?.Data?.ShippingType)
                    )
                  }
                  rules={
                    !shippingTypeToWarehouse?.find(
                      (x) => x.Id === Number(userPayment?.Data?.ShippingType)
                    )
                      ? { required: "Vui lòng chọn PTVC" }
                      : { required: false }
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
