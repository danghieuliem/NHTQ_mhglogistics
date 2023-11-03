import { Divider, Popover } from "antd";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { orderShopTemp, user } from "~/api";
import {
  ActionButton,
  ConfirmCompleteForm,
  PaymentOrderInfo,
  ReceiveInfoForm,
  UserLayout,
} from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useCatalogue, useDeepEffect } from "~/hooks";
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

  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: true,
    warehouseVNEnabled: true,
    shippingTypeToWarehouseEnabled: true,
  });

  const { control, handleSubmit, reset, getValues, setValue } =
    useForm<TUserPayment>({
      mode: "onBlur",
      defaultValues: {
        ShippingType: shippingTypeToWarehouse?.find(
          (x) => x.Id === Number(userPayment?.Data?.ShippingType)
        )?.Id,
        WarehouseTQ: warehouseTQ?.find(
          (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
        )?.Id,
        WarehouseVN: warehouseVN?.find(
          (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
        )?.Id,
        ShopPayments: orderShopTempsData.map((data) => ({
          ShopId: data?.Id,
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
        ReceiverAddress: "helo",
        ReceiverEmail: Email,
        ReceiverPhone: Phone,
        FullName: FullName,
        Address: Address,
        Email: Email,
        Phone: Phone,
        ShippingType: shippingTypeToWarehouse?.find(
          (x) => x.Id === Number(userPayment?.Data?.ShippingType)
        )?.Id,
        WarehouseTQ: warehouseTQ?.find(
          (x) => x.Id === Number(userPayment?.Data?.WarehouseFrom)
        )?.Id,
        WarehouseVN: warehouseVN?.find(
          (x) => x.Id === Number(userPayment?.Data?.WarehouseTo)
        )?.Id,
        ShopPayments: orderShopTempsData.map((data) => ({
          ShopId: data?.Id,
        })),
      });
    }
  }, [
    [
      shippingTypeToWarehouse,
      warehouseTQ,
      warehouseVN,
      orderShopTempsData,
      userPayment,
    ],
  ]);

  const mutationPayment = useMutation(orderShopTemp.payment);

  const onPress = async (data: TUserPayment) => {
    const id = toast.loading("Đang xử lý ...");

    if (!data?.IsAgreement) {
      toast.warning("Vui lòng xác nhận trước khi thanh toán");
      return;
    }

    const shopPayments = getValues("ShopPayments");

    for (let i in shopPayments) {
      setValue(
        `ShopPayments.${Number(i)}.WarehouseTQ`,
        Number(getValues("WarehouseTQ"))
      );
      setValue(
        `ShopPayments.${Number(i)}.WarehouseVN`,
        Number(getValues("WarehouseVN"))
      );
      setValue(
        `ShopPayments.${Number(i)}.ShippingType`,
        Number(getValues("ShippingType"))
      );
    }

    // setLoadingPayment(true);
    delete data.WarehouseTQ;
    delete data.ShippingType;
    delete data.WarehouseVN;

    mutationPayment
      .mutateAsync({ ...data, Address: getValues("Address") })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: "menuData" });
        router.push("/user/order-list");
        ids.map((id) => dispatch(deleteOrderShopTempById(id)));
        toast.update(id, {
          render: "Đặt đơn thành công, đang vào giỏ hàng,",
          type: "success",
          autoClose: 500,
          isLoading: false,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
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
            <div className="col-span-12 grid grid-cols-1 gap-4 h-fit">
              {orderShopTempsData.map((orderShopTempData, index) => (
                <Fragment key={`${index}-${orderShopTempData?.Id}`}>
                  <PaymentOrderInfo
                    orderShopTempData={orderShopTempData}
                    isAllowDeletedItem={false}
                  />
                  <Divider className="!my-[2px]" />
                </Fragment>
              ))}
            </div>

            <div className="col-span-12">
              <ConfirmCompleteForm
                totalPrice={Number(totalPrice)}
                control={control}
                loadingPayment={loadingPayment}
                onPress={handleSubmit(onPress)}
                warehouseVN={warehouseVN}
                shippingTypeToWarehouse={shippingTypeToWarehouse}
                warehouseTQ={warehouseTQ}
                userPayment={userPayment}
              />
            </div>
            {/* {window.innerWidth >= 1024 ? (
              <div className="col-span-3">
                <div className="sticky top-4">
                  <ReceiveInfoForm
                    control={control}
                    warehouseVN={warehouseVN}
                    shippingTypeToWarehouse={shippingTypeToWarehouse}
                    warehouseTQ={warehouseTQ}
                    userPayment={userPayment}
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
                      <ReceiveInfoForm
                        control={control}
                        warehouseVN={warehouseVN}
                        shippingTypeToWarehouse={shippingTypeToWarehouse}
                        warehouseTQ={warehouseTQ}
                        userPayment={userPayment}
                      />
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
            )} */}
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
