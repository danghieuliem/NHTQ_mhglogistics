import { Checkbox, Tooltip } from "antd";
import { TControl } from "~/types/field";
import { _format } from "~/utils";
import { OrderTempItem } from "../OrderTempItem";

type TProps = TControl<TUserPayment> & {
  orderShopTempData: TUserCartOrderShopTemp;
  isAllowDeletedItem?: boolean;
};

export const PaymentOrderInfo: React.FC<TProps> = ({
  orderShopTempData,
  isAllowDeletedItem = true,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-9">
        <div className="uppercase font-bold w-full bg-main text-white mb-[-5px] py-2 px-2 rounded-[4px]">
          <Tooltip title="Tên cửa hàng!">
            Tên shop: {orderShopTempData?.ShopName}
          </Tooltip>
        </div>
        <OrderTempItem
          data={orderShopTempData?.OrderTemps}
          canUpdate={false}
          isAllowDeletedItem={isAllowDeletedItem}
        />
      </div>

      {/* phí */}
      <div className="col-span-12 md:col-span-3 h-fit">
        <div className="bg-[#FFF1E4] rounded-[6px] p-3 mb-4">
          <div className="text-sm flex justify-between w-full pb-1">
            <p className="text-black font-bold">Tổng đơn</p>
            <span className="text-orange font-bold">
              {_format.getVND(orderShopTempData?.TotalPriceVND)}
            </span>
          </div>
          <div className="text-sm flex justify-between w-full pb-1">
            <p className="text-black ">Tổng tiền hàng</p>
            <span className="">
              {_format.getVND(orderShopTempData?.PriceVND)}
            </span>
          </div>
          <div className="text-sm flex justify-between w-full pb-1">
            <p className="text-black ">Phí mua hàng</p>
            <span className="">
              {orderShopTempData?.FeeBuyPro > 0
                ? _format.getVND(orderShopTempData?.FeeBuyPro)
                : "Chờ cập nhật"}
            </span>
          </div>
        </div>
        <div className="bg-[#FFF1E4] rounded-[6px] p-3">
          <div className="grid grid-cols-1 col-span-2 h-fit">
            <div className="col-span-1 flex justify-between">
              <span>
                <Checkbox
                  disabled
                  checked={orderShopTempData?.IsFastDelivery}
                ></Checkbox>
                <span className="ml-2">Giao tận nhà</span>
              </span>
              <span className="font-semibold">
                {orderShopTempData?.IsFastDelivery
                  ? orderShopTempData?.IsFastDeliveryPrice > 0
                    ? _format.getVND(orderShopTempData?.IsFastDeliveryPrice)
                    : "Chờ cập nhật"
                  : "Không yêu cầu"}
              </span>
            </div>
            <div className="col-span-1 flex justify-between">
              <span>
                <Checkbox
                  disabled
                  checked={orderShopTempData?.IsCheckProduct}
                ></Checkbox>
                <span className="ml-2">Kiểm hàng</span>
              </span>
              <span className="font-semibold">
                {orderShopTempData?.IsCheckProduct
                  ? orderShopTempData?.IsCheckProductPrice > 0
                    ? _format.getVND(orderShopTempData?.IsCheckProductPrice)
                    : "Chờ cập nhật"
                  : "Không yêu cầu"}
              </span>
            </div>
            <div className="col-span-1 flex justify-between">
              <span>
                <Checkbox
                  disabled
                  checked={orderShopTempData?.IsPacked}
                ></Checkbox>
                <span className="ml-2">Đóng gỗ</span>
              </span>
              <span className="font-semibold">
                {orderShopTempData?.IsPacked
                  ? orderShopTempData?.IsPackedPrice > 0
                    ? _format.getVND(orderShopTempData?.IsPackedPrice)
                    : "Chờ cập nhật"
                  : "Không yêu cầu"}
              </span>
            </div>
            <div className="col-span-1 flex justify-between">
              <span>
                <Checkbox
                  disabled
                  checked={orderShopTempData?.IsInsurance}
                ></Checkbox>
                <span className="ml-2">Bảo hiểm</span>
              </span>
              <span className="font-semibold">
                {orderShopTempData?.IsInsurance
                  ? orderShopTempData?.InsuranceMoney > 0
                    ? _format.getVND(orderShopTempData?.InsuranceMoney)
                    : "Chờ cập nhật"
                  : "Không yêu cầu"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
