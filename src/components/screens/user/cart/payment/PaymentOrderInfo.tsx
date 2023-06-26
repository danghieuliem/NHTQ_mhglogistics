import { Checkbox, Divider, Tooltip } from "antd";
import { FormSelect } from "~/components";
import { TControl } from "~/types/field";
import { _format } from "~/utils";
import { OrderTempItem } from "../OrderTempItem";

type TProps = TControl<TUserPayment> & {
  orderShopTempData: TUserCartOrderShopTemp;
  warehouseTQ?: TBaseReponseParams[];
  warehouseVN?: TBaseReponseParams[];
  shippingTypeToWarehouse?: TBaseReponseParams[];
  userPayment: any;
  index: number;
};

export const PaymentOrderInfo: React.FC<TProps> = ({
  orderShopTempData,
  index,
  control,
  userPayment,
  warehouseTQ,
  warehouseVN,
  shippingTypeToWarehouse,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4">
        <div className="uppercase font-bold w-full bg-main text-white mb-[-5px] py-2 px-2 rounded-[4px]">
          <Tooltip title="Tên cửa hàng!">
            Tên shop: {orderShopTempData?.ShopName}
          </Tooltip>
        </div>
        <OrderTempItem data={orderShopTempData?.OrderTemps} canUpdate={false} />
      </div>

      {/* phí */}
      <div className="col-span-4 md:col-span-2">
        <div className="bg-[#FFF1E4] rounded-[6px]">
          <div className="p-3">
            <div className="text-sm flex justify-between w-full pb-1">
              <p className="text-black font-bold">Tổng đơn</p>
              <span className="text-orange font-bold">
                {_format.getVND(orderShopTempData?.TotalPriceVND)}
              </span>
            </div>
            <div className="text-sm flex justify-between w-full pb-1">
              <p className="text-black font-bold">Tổng tiền hàng</p>
              <span className="text-blue font-bold">
                {_format.getVND(orderShopTempData?.PriceVND)}
              </span>
            </div>
            <div className="text-sm flex justify-between w-full pb-1">
              <p className="text-black font-bold">Phí mua hàng</p>
              <span className="text-[#f14f04] font-bold">
                {orderShopTempData?.FeeBuyPro > 0
                  ? _format.getVND(orderShopTempData?.FeeBuyPro)
                  : "Chờ cập nhật"}
              </span>
            </div>
            <div className="text-sm flex justify-between w-full pb-1">
              <p className="text-[#626262]">Phí ship TQ</p>
              <span>Chờ cập nhật</span>
            </div>
            <div className="text-sm flex justify-between w-full pb-1">
              <p className="text-[#626262]">Phí vận chuyển TQ-VN</p>
              <span className="text-[#626262]">Chờ cập nhật</span>
            </div>
            <div className="text-sm flex justify-between w-full pb-1">
              <p className="text-[#626262]">Phí kiểm đếm</p>
              <span>
                {orderShopTempData?.IsCheckProduct
                  ? orderShopTempData?.IsCheckProductPrice > 0
                    ? _format.getVND(orderShopTempData?.IsCheckProductPrice)
                    : "Chờ cập nhật"
                  : "Không yêu cầu"}
              </span>
            </div>
            <div className="text-sm flex justify-between w-full pb-1">
              <p className="text-[#626262]">Phí đóng gỗ</p>
              <span>
                {orderShopTempData?.IsPacked
                  ? orderShopTempData?.IsPackedPrice > 0
                    ? _format.getVND(orderShopTempData?.IsPackedPrice)
                    : "Chờ cập nhật"
                  : "Không yêu cầu"}
              </span>
            </div>
            <div className="text-sm flex justify-between w-full pb-1">
              <p className="text-[#626262]">Phí bảo hiểm</p>
              <span>
                {orderShopTempData?.IsInsurance
                  ? orderShopTempData?.InsuranceMoney > 0
                    ? _format.getVND(orderShopTempData?.InsuranceMoney)
                    : "Chờ cập nhật"
                  : "Không yêu cầu"}
              </span>
            </div>
            <div className="text-sm flex justify-between w-full pb-1">
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
      <div className="col-span-4 md:col-span-2">
        <div className="bg-[#fff] p-3 rounded-[6px]">
          <div className="grid grid-cols-2 col-span-2 h-fit">
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
          <Divider className="!my-[15px]" />
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <FormSelect
                data={warehouseTQ}
                select={{ label: "Name", value: "Id" }}
                name={`ShopPayments.${index}.WarehouseTQ`}
                label="Kho Trung Quốc"
                defaultValue={warehouseTQ?.find(
                  (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
                )}
                placeholder="Kho TQ"
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
                    ? { required: "Vui lòng chọn Kho TQ" }
                    : { required: false }
                }
              />
            </div>
            <div className="col-span-1">
              <FormSelect
                data={warehouseVN}
                select={{ label: "Name", value: "Id" }}
                name={`ShopPayments.${index}.WarehouseVN`}
                label="Kho Việt Nam"
                placeholder="Kho VN"
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
            <div className="col-span-2">
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
  );
};
