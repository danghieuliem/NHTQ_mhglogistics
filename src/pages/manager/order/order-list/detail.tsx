import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { mainOrder } from "~/api";
import {
  Empty,
  Layout,
  OrderCode,
  OrderCost,
  OrderDetail,
  OrderHandlingStaff,
  OrderHistory,
  OrderInfo,
  OrderProductList,
  OrderSurChargeList,
  OrderTransferCodeList,
  toast,
} from "~/components";
import { EOrderStatus, breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const className = "TabPanel";
const { Panel } = Collapse;

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  const { query } = useRouter();
  const router = useRouter();
  const orderId = Number(router.query.id);
  const [active, setActive] = React.useState(0);
  const queryClient = useQueryClient();

  const { userSale, userOrder } = useCatalogue({
    userSaleEnabled: true,
    userOrderEnabled: true,
  });

  const form = useForm<TOrder>({
    mode: "onBlur",
  });

  const { data, isError, isLoading, isFetching, refetch } = useQuery(
    ["order-list", orderId],
    () => mainOrder.getByID(+query?.id),
    {
      onSuccess: (data) => {
        form.reset(data?.Data);
      },
      onError: toast.error,
      retry: false,
      enabled: !!+query?.id,
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      staleTime: 2000,
    }
  );

  const mutationUpdate = useMutation(mainOrder.update, {
    onSuccess: () => {
      toast.success("Cập nhật đơn hàng thành công");
      queryClient.invalidateQueries("history-order");
      refetch();
    },
    onError: (error) => {
      toast.error((error as any)?.response?.data?.ResultMessage);
    },
  });

  const _onUpdate = async (data: TOrder) => {
    if (data?.AmountDeposit > data?.TotalPriceVND) {
      toast.error("Số tiền phải cọc không được lớn hơn tổng tiền đơn");
      return;
    }
    const { HistoryOrderChanges, PayOrderHistories, Complains, ...newData } =
      data;

    if (newData.Status === 100) {
      newData.IsCheckNotiPrice = false;
    }

    // if ([EOrderStatus.ChoBaoGia].includes(data?.Status)) {
    //   toast.warning("Đơn hàng chưa cập nhật báo giá cho khách!");
    // } else {
    //   await mutationUpdate.mutateAsync(newData);
    // }

    await mutationUpdate.mutateAsync(newData);
  };

  if (isError) {
    return <Empty />;
  }

  return (
    <FormProvider {...form}>
      <div
        className="grid grid-cols-10 gap-4"
        style={{
          opacity: isFetching ? "0.8" : "1",
          pointerEvents: isFetching ? "none" : "all",
        }}
      >
        <div className="col-span-3 xl:col-span-2">
          <div
            style={{
              position: "sticky",
              top: "10px",
            }}
          >
            <OrderDetail
              active={active}
              handleActive={(val) => setActive(val)}
              handleUpdate={_onUpdate}
              data={data?.Data}
              loading={isFetching}
              refetch={refetch}
              RoleID={userCurrentInfo?.UserGroupId}
            />
          </div>
        </div>
        <div className="col-span-7 xl:col-span-8">
          <Collapse
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}
          >
            <Panel
              header={`Mã đơn hàng (${
                data?.Data?.MainOrderCodes?.length || 0
              })`}
              key="1"
            >
              <div
                id="order-code"
                className={clsx(className, active === 0 && "")}
              >
                <OrderCode
                  data={data?.Data}
                  loading={isFetching}
                  refetch={refetch}
                  RoleID={userCurrentInfo?.UserGroupId}
                />
              </div>
            </Panel>
            <Panel
              header={`Mã vận đơn (${data?.Data?.SmallPackages.length || 0})`}
              key="2"
            >
              <div
                id="transfer-code-list"
                className={clsx(className, "!py-0", active === 1 && "")}
              >
                <OrderTransferCodeList
                  data={data?.Data}
                  loading={isFetching}
                  handleUpdate={_onUpdate}
                  RoleID={userCurrentInfo?.UserGroupId}
                />
              </div>
            </Panel>
            <Panel
              header={`Danh sách sản phẩm (${data?.Data?.Orders?.length || 0})`}
              key="3"
            >
              <div
                id="product-list"
                className={clsx(className, active === 2 && "")}
              >
                <OrderProductList
                  data={data?.Data}
                  loading={isFetching}
                  refetch={refetch}
                  RoleID={userCurrentInfo?.UserGroupId}
                />
              </div>
            </Panel>
            <Panel header="Chi phí đơn hàng" key="4">
              <div
                id="surcharge-list"
                className={clsx(className, active === 3 && "")}
              >
                <OrderSurChargeList
                  data={data?.Data}
                  loading={isFetching}
                  handleUpdate={_onUpdate}
                  RoleID={userCurrentInfo?.UserGroupId}
                />
                <OrderCost
                  loading={isFetching}
                  data={data?.Data}
                  RoleID={userCurrentInfo?.UserGroupId}
                />
              </div>
            </Panel>
            <Panel header="Nhân viên xử lý" key="5">
              <div
                id="handling-staff"
                className={clsx(className, active === 5 && "")}
              >
                <OrderHandlingStaff
                  data={data?.Data}
                  userSaleCatalogue={userSale}
                  userOrderCatalogue={userOrder}
                  loading={isFetching}
                  RoleID={userCurrentInfo?.UserGroupId}
                />
              </div>
            </Panel>
            <Panel header="Thông tin đặt hàng" key="6">
              <div
                id="order-info"
                className={clsx(className, active === 6 && "")}
              >
                <OrderInfo data={data?.Data} loading={isLoading} />
              </div>
            </Panel>
            <Panel header="Lịch sử" key="7">
              <div id="history" className={clsx(className, active === 7 && "")}>
                <OrderHistory data={data?.Data} loading={isFetching} />
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </FormProvider>
  );
};

Index.displayName = SEOConfigs.oder.detail;
Index.breadcrumb = breadcrumb.order.orderList.detail;
Index.Layout = Layout;

export default Index;
