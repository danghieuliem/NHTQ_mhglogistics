import { Affix } from "antd";
import clsx from "clsx";
import { Link } from "rc-scroll-anim";
import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { mainOrder } from "~/api";
import { FormSelect } from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { orderStatus } from "~/configs/appConfigs";
import { useCatalogue } from "~/hooks/useCatalogue";
import { _format } from "~/utils";

type TProps = {
  active: number;
  handleActive: (active: number) => void;
  handleUpdate: (data: TOrder) => Promise<void>;
  data: TOrder;
  loading: boolean;
  disabledPayment?: boolean;
  refetch?: any;
  RoleID: number;
};

const nameContent =
  "w-2/4 py-1 text-sm font-bold text-[#3E3C6A] tracking-normal";
const contentItem = "flex items-center";
const contentValue = "w-2/4 py-1 text-sm font-medium text-black";
const linkMenu = "cursor-pointer py-[2px] !text-main text-sm block";
const linkMenuActive = "border-l-2 border-orange !text-black font-medium";

const IsShouldAffix: React.FC<{}> = ({ children }) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" });
  return isBigScreen ? (
    <Affix offsetTop={20}>{children}</Affix>
  ) : (
    <>{children}</>
  );
};

const ComponentAffix: React.FC<TProps> = ({
  data,
  loading,
  active,
  handleActive,
  handleUpdate,
  disabledPayment,
  refetch,
  RoleID,
}) => {
  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: !!RoleID,
    warehouseVNEnabled: !!RoleID,
    shippingTypeToWarehouseEnabled: !!RoleID,
  });

  const defaultOrderStatus = RoleID === 4 && [
    // ...orderStatus?.slice(1, 2),
    // ...orderStatus.slice(4, 5),
    ...orderStatus?.slice(5, 6),
  ];

  const { handleSubmit, control } = useFormContext<TOrder>();

  /**
   * Chưa đặt cọc = 0,
      Hủy = 1,
      Đã đặt cọc = 2,
      Đã mua hàng = 5,
      Đã về kho TQ = 6,
      Đã về kho VN = 7,
      Đã thanh toán = 9,
      Đã hoàn thành = 10,
      Đã khiếu nại = 11,
      Chờ báo giá = 100
   */

  return (
    <>
      <div className="tableBox">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            {!data?.IsCheckNotiPrice && data?.OrderType === 3 && (
              <div className={clsx(contentItem)}>
                <div className={clsx(nameContent)}>Báo giá: </div>
                <div className={clsx(contentValue)}>
                  <IconButton
                    onClick={async () => {
                      await mainOrder
                        .updateNotiPrice({
                          ...data,
                          IsCheckNotiPrice: true,
                        })
                        .then(() => {
                          toast.success("Đã báo giá cho khách!");
                          refetch();
                        });
                    }}
                    title="Báo giá"
                    icon="far fa-credit-card"
                    btnClass="mr-4 mb-4 lg:mb-0"
                    btnIconClass="mr-4"
                    showLoading
                    toolip="Click để báo giá cho khách"
                    yellow
                    disabled={
                      data?.IsCheckNotiPrice ||
                      !(
                        RoleID === 1 ||
                        RoleID === 3 ||
                        RoleID === 4 ||
                        RoleID === 7 ||
                        RoleID === 8 ||
                        RoleID === 6
                      )
                    }
                  />
                </div>
              </div>
            )}
            <div className={clsx(contentItem)}>
              <div className={clsx(nameContent)}>Order ID</div>
              <div className={clsx(contentValue)}>{data?.Id}</div>
            </div>
            <div className={clsx(contentItem)}>
              <div className={clsx(nameContent)}>Loại đơn</div>
              <div className={clsx(contentValue)}>{data?.OrderTypeName}</div>
            </div>
            <div className={clsx(contentItem)}>
              <div className={clsx(nameContent)}>Tổng tiền</div>
              <div className={clsx(contentValue)}>
                {_format.getVND(data?.TotalOrderAmount)}
              </div>
            </div>
            <div className={clsx(contentItem)}>
              <div className={clsx(nameContent)}>Đã trả</div>
              <div className={clsx(contentValue)}>
                {_format.getVND(data?.Deposit)}
              </div>
            </div>
            <div className={clsx(contentItem)}>
              <div className={clsx(nameContent)}>Còn lại</div>
              <div className={clsx(contentValue, "!text-warning")}>
                {_format.getVND(data?.RemainingAmount)}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className={clsx(contentItem)}>
              <FormSelect
                control={control}
                name="Status"
                label="Trạng thái"
                placeholder=""
                data={
                  RoleID === 4
                    ? defaultOrderStatus
                    : orderStatus?.slice(1, orderStatus.length)
                }
                defaultValue={orderStatus
                  ?.slice(1, orderStatus.length)
                  .find((x) => x.id === data?.Status)}
                disabled={
                  RoleID === 7 ||
                  (RoleID === 4 && data?.Status !== 2 && data?.Status !== 0)
                }
              />
            </div>
            <div className={clsx(contentItem)}>
              <FormSelect
                control={control}
                name="FromPlace"
                label="Kho TQ"
                placeholder=""
                data={warehouseTQ}
                select={{ label: "Name", value: "Id" }}
                defaultValue={{
                  Id: data?.FromPlace,
                  Name: data?.FromPlaceName,
                }}
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 3 ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
              />
            </div>
            <div className={clsx(contentItem)}>
              <FormSelect
                control={control}
                name="ReceivePlace"
                label="Nhận hàng tại"
                placeholder=""
                data={warehouseVN}
                select={{ label: "Name", value: "Id" }}
                defaultValue={{
                  Id: data?.ReceivePlace,
                  Name: data?.ReceivePlaceName,
                }}
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 3 ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
              />
            </div>
            <div className={clsx(contentItem)}>
              <FormSelect
                control={control}
                name="ShippingType"
                label="PPVC"
                placeholder=""
                data={shippingTypeToWarehouse}
                select={{ label: "Name", value: "Id" }}
                defaultValue={{
                  Id: data?.ShippingType,
                  Name: data?.ShippingTypeName,
                }}
                disabled={
                  !(
                    RoleID === 1 ||
                    RoleID === 3 ||
                    RoleID === 8 ||
                    RoleID === 6
                  )
                }
              />
            </div>
          </div>
        </div>
        {(RoleID === 1 ||
          RoleID === 3 ||
          RoleID === 4 ||
          RoleID === 7 ||
          RoleID === 8 ||
          RoleID === 6) && (
          <div className="flex flex-wrap items-center justify-center jus mt-3 pt-3 m-auto border-t border-[#edf1f7]">
            <IconButton
              onClick={handleSubmit(handleUpdate)}
              icon="fas fa-pencil"
              title="Cập nhật"
              btnClass="!m-[4px] !bg-orange !text-white"
              showLoading
              toolip=""
              disabled={
                (data?.Status === 0 && RoleID === 4) ||
                (RoleID === 7 && data?.Status === 2)
              }
            />

            {!disabledPayment &&
              (RoleID === 1 ||
                RoleID === 3 ||
                RoleID === 7 ||
                RoleID === 8 ||
                RoleID === 6) &&
              data?.TotalOrderAmount !== data?.Deposit && (
                <a
                  style={{
                    margin: "4px",
                    pointerEvents:
                      data?.TotalOrderAmount === data?.Deposit ? "none" : "all",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      const id = toast.loading("Đang xử lý ...");
                      mainOrder
                        .payment({
                          Id: data?.Id,
                          Note: undefined,
                          PaymentMethod: 2,
                          PaymentType: data?.Status === 0 ? 1 : 2,
                          Amount:
                            data?.Status === 0
                              ? data?.AmountDeposit
                              : data?.RemainingAmount,
                        })
                        .then(() => {
                          toast.update(id, {
                            render: `${
                              data?.Status === 0
                                ? "Đặt cọc thành công!"
                                : "Thanh toán thành công!"
                            }`,
                            autoClose: 0,
                            isLoading: false,
                            type: "success",
                          });
                          refetch();
                        })
                        .catch((error) => {
                          toast.update(id, {
                            render: (error as any)?.response?.data
                              ?.ResultMessage,
                            autoClose: 0,
                            isLoading: false,
                            type: "error",
                          });
                        });
                    }}
                    icon="fas fa-credit-card"
                    // title="Thanh toán"
                    title={data?.Status === 0 ? "Đặt cọc" : "Thanh toán"}
                    showLoading
                    toolip=""
                    blue
                  />
                </a>
              )}
          </div>
        )}
      </div>
      <div className="tableBox xl:block hidden my-4 py-3">
        <ul className="mb-0">
          <li>
            <Link
              onFocus={() => handleActive(0)}
              offsetTop={120}
              to="order-code"
              className={clsx(linkMenu, active === 0 && linkMenuActive)}
            >
              <a className="pl-2">Mã đơn hàng</a>
            </Link>
          </li>
          <li>
            <Link
              onFocus={() => handleActive(1)}
              offsetTop={120}
              to="transfer-code-list"
              className={clsx(linkMenu, active === 1 && linkMenuActive)}
            >
              <a className="pl-2">Mã vận đơn</a>
            </Link>
          </li>
          <li>
            <Link
              onFocus={() => handleActive(2)}
              offsetTop={120}
              to="product-list"
              className={clsx(linkMenu, active === 2 && linkMenuActive)}
            >
              <a className="pl-2">Danh sách sản phẩm</a>
            </Link>
          </li>
          <li>
            <Link
              onFocus={() => handleActive(4)}
              offsetTop={120}
              to="surcharge-list"
              className={clsx(linkMenu, active === 4 && linkMenuActive)}
            >
              <a className="pl-2">Chi phí đơn hàng</a>
            </Link>
          </li>
          <li>
            <Link
              onFocus={() => handleActive(6)}
              offsetTop={120}
              to="order-info"
              className={clsx(linkMenu, active === 6 && linkMenuActive)}
            >
              <a className="pl-2">Thông tin người đặt - nhận hàng</a>
            </Link>
          </li>
          <li>
            <Link
              onFocus={() => handleActive(7)}
              offsetTop={120}
              to="history"
              className={clsx(linkMenu, active === 7 && linkMenuActive)}
            >
              <a className="pl-2">Lịch sử thanh toán - thay đổi</a>
            </Link>
          </li>
        </ul>
      </div>

      {/* <IconButton
        onClick={() =>
          router.push(
            `/manager/order/order-list${data?.OrderType === 3 ? "?q=3" : ""}`
          )
        }
        // onClick={() => router.back()}
        icon="fas fa-undo-alt"
        title="Về danh sách"
        btnClass="mr-2 !bg-orange !text-white md:hidden xl:block"
        showLoading
        toolip=""
      /> */}
    </>
  );
};

export const OrderDetail: FC<TProps> = (props) => {
  return (
    <IsShouldAffix>
      <ComponentAffix {...props} />
    </IsShouldAffix>
  );
};
