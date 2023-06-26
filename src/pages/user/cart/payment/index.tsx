import { Divider, Popover } from "antd";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import {
  orderShopTemp,
  shipping,
  user,
  warehouseFrom,
  warehouseTo,
} from "~/api";
import {
  ActionButton,
  ConfirmCompleteForm,
  PaymentOrderInfo,
  ReceiveInfoForm,
  UserLayout,
  toast,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useDeepEffect } from "~/hooks";
import {
  deleteOrderShopTempById,
  useAppDispatch,
  useAppSelector,
} from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout & React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const ids = useAppSelector((state) => state.cart.selectedShopIds);
  const queryClient = useQueryClient();
  const [loadingPayment, setLoadingPayment] = useState(false);

  const orderShopTempsData = useQueries(
    ids.map((id) => ({
      queryKey: ["orderShopTempData", id],
      queryFn: () => orderShopTemp.getByID(id).then((res) => res.Data),
    }))
  ).map((res) => res.data);

  // const {
  //   control: addressControl,
  //   getValues: getValuesAddress,
  //   watch: addressWatch,
  // } = useForm({
  //   mode: "onBlur",
  //   defaultValues: {
  //     city: null,
  //     districts: null,
  //     address: null,
  //   },
  // });

  const { data: userPayment } = useQuery(
    "userPayment",
    () => user.getByID(orderShopTempsData[0]?.UID),
    {
      refetchOnWindowFocus: false,
      enabled: !!orderShopTempsData[0]?.UID,
    }
  );

  const { data: warehouseTQ } = useQuery(
    ["warehouseFromData"],
    () => warehouseFrom.getList().then((res) => res.Data.Items),
    {
      enabled: !!ids,
      refetchOnWindowFocus: false,
    }
  );

  const { data: warehouseVN } = useQuery(
    ["warehouseToData"],
    () => warehouseTo.getList().then((res) => res.Data.Items),
    {
      enabled: !!ids,
      refetchOnWindowFocus: false,
    }
  );

  const { data: shippingTypeToWarehouse } = useQuery(
    ["shippingType"],
    () =>
      shipping
        .getList({
          PageSize: 9999,
          PageIndex: 1,
        })
        .then((res) => res.Data.Items),
    {
      enabled: !!ids,
      refetchOnWindowFocus: false,
    }
  );

  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<TUserPayment>({
      mode: "onBlur",
      defaultValues: {
        ShopPayments: orderShopTempsData.map((data) => ({
          ShopId: data?.Id,
          // ShippingType: shippingTypeToWarehouse?.find(
          //   (x) => x.Id === Number(userPayment?.Data?.ShippingType)
          // )?.Id,
          // WarehouseTQ: warehouseTQ?.find(
          //   (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
          // )?.Id,
          // WarehouseVN: warehouseVN?.find(
          //   (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
          // )?.Id,
        })),
      },
    });

  useDeepEffect(() => {
    if (
      // !!warehouseToData?.length &&
      // !!warehouseFromData?.length &&
      // !!shippingType?.length &&
      !!orderShopTempsData.length &&
      !!orderShopTempsData?.[0]
    ) {
      const { FullName, Address, Email, Phone } = orderShopTempsData?.[0];
      reset({
        ReceiverFullName: FullName,
        ReceiverAddress: Address,
        ReceiverEmail: Email,
        ReceiverPhone: Phone,
        FullName: FullName,
        Address: Address,
        Email: Email,
        Phone: Phone,
        ShopPayments: orderShopTempsData.map((data) => ({
          ShopId: data?.Id,
          // ShippingType: shippingTypeToWarehouse?.find(
          //   (x) => x.Id === Number(userPayment?.Data?.ShippingType)
          // )?.Id,
          // WarehouseTQ: warehouseTQ?.find(
          //   (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
          // )?.Id,
          // WarehouseVN: warehouseVN?.find(
          //   (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
          // )?.Id,
        })),
      });
    }
  }, [[shippingTypeToWarehouse, warehouseTQ, warehouseVN, orderShopTempsData]]);

  const mutationPayment = useMutation(orderShopTemp.payment);

  const onPress = async (data: TUserPayment) => {
    // setValue(
    //   "Address",
    //   `${getValuesAddress("address")}, ${getValuesAddress(
    //     "city"
    //   )}, ${getValuesAddress("districts")}`
    // );

    if (!data?.IsAgreement) {
      toast.warning("Vui lòng xác nhận trước khi thanh toán");
      return;
    }

    // if (
    //   getValuesAddress("address") === null ||
    //   getValuesAddress("city") === null ||
    //   getValuesAddress("districts") === null
    // ) {
    //   toast.warning("Vui lòng chọn địa chỉ nhân hàng!");
    //   return;
    // }

    const shopPayments = getValues("ShopPayments");

    for (let i in shopPayments) {
      if (getValues("ShopPayments")[i].WarehouseTQ === undefined) {
        setValue(
          `ShopPayments.${Number(i)}.WarehouseTQ`,
          Number(userPayment?.Data?.WarehouseFrom)
        );
      }
      if (getValues("ShopPayments")[i].WarehouseVN === undefined) {
        setValue(
          `ShopPayments.${Number(i)}.WarehouseVN`,
          Number(userPayment?.Data?.WarehouseTo)
        );
      }
      if (getValues("ShopPayments")[i].ShippingType === undefined) {
        setValue(
          `ShopPayments.${Number(i)}.ShippingType`,
          Number(userPayment?.Data?.ShippingType)
        );
      }
    }

    setLoadingPayment(true);

    mutationPayment
      .mutateAsync({ ...data, Address: getValues("Address") })
      .then(() => {
        toast.success("Đặt hàng thành công!");
        queryClient.invalidateQueries({ queryKey: "menuData" });
        router.push("/user/order-list");
        ids.map((id) => dispatch(deleteOrderShopTempById(id)));
        setLoadingPayment(false);
      })
      .catch((error) => {
        toast.error("Vui lòng thử lại!");
        setLoadingPayment(false);
      });
  };

  const listTotalPrice = orderShopTempsData.map((item) => item?.TotalPriceVND);
  let totalPrice = 0;
  listTotalPrice.forEach((item) => {
    totalPrice += item;
  });

  return (
    <div className="">
      {!!ids.length && !!orderShopTempsData?.[0] && (
        <React.Fragment>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-9 grid grid-cols-1 gap-4">
              {orderShopTempsData.map((orderShopTempData, index) => (
                <Fragment key={`${index}-${orderShopTempData?.Id}`}>
                  <PaymentOrderInfo
                    {...{
                      index,
                      orderShopTempData,
                      warehouseVN,
                      shippingTypeToWarehouse,
                      warehouseTQ,
                      userPayment,
                      control,
                    }}
                  />
                  <Divider />
                </Fragment>
              ))}
            </div>
            {window.innerWidth >= 1024 ? (
              <div className="col-span-3">
                {/* <WareHouseInfo /> */}
                <div className="sticky top-4">
                  {/* <StaticUserForm control={control} /> */}
                  <ReceiveInfoForm
                    control={control}
                    // addressControl={addressControl}
                    // getValuesAddress={getValuesAddress}
                    // addressWatch={addressWatch}
                  />
                  <ConfirmCompleteForm
                    totalPrice={Number(totalPrice)}
                    control={control}
                    loadingPayment={loadingPayment}
                    onPress={handleSubmit(onPress)}
                  />
                </div>
              </div>
            ) : (
              <div className="fixed top-[77px] right-[15px]">
                <Popover
                  // trigger={"click"}
                  placement="bottomLeft"
                  content={
                    <div className="p-4">
                      <ReceiveInfoForm control={control} />
                      <ConfirmCompleteForm
                        totalPrice={Number(totalPrice)}
                        control={control}
                        loadingPayment={loadingPayment}
                        onPress={handleSubmit(onPress)}
                      />
                    </div>
                  }
                >
                  <ActionButton
                    icon=""
                    title="Tiếp tục đặt hàng"
                    isButton
                    isButtonClassName="bg-green !text-white"
                  />
                </Popover>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

Index.displayName = SEOHomeConfigs.shopping.payment;
Index.breadcrumb = "Thanh toán";
Index.Layout = UserLayout;

export default Index;
