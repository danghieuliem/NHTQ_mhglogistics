import router, { useRouter } from "next/router";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { payHelp } from "~/api";
import {
  Empty,
  Layout,
  RequestPaymentDetailLeftForm,
  RequestPaymentDetailRightForm,
  showToast,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { handleSubmit, reset, getValues, control, setValue } =
    useForm<TRequestPaymentOrder>({
      mode: "onBlur",
    });

  const { query } = useRouter();
  const { isLoading, isError, data } = useQuery(
    ["requestPaymentData", +query?.id],
    () => payHelp.getByID(+query?.id),
    {
      onSuccess: (data) => {
        reset(data?.Data);
        return data?.Data;
      },
      retry: false,
      enabled: !!query?.id,
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false
    }
  );

  const { fields } = useFieldArray({ control, name: "PayHelpDetails" });
  const mutationUpdate = useMutation((data: TRequestPaymentOrder) =>
    payHelp.update(data)
  );

  const _onPress = (data: TRequestPaymentOrder) => {
    mutationUpdate
      .mutateAsync(data)
      .then((res) => {
        toast.success("Cập nhật thành công");
        router.push("/manager/order/request-payment");
      })
      .catch((error) => {
        showToast({
          title: "Lỗi",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      });
  };

  if (isError)
    return (
      <Empty
        description={`Không tìm thấy đơn yêu cầu thanh toán hộ #${query?.id}`}
      />
    );

  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      <div className="md:col-span-4 xl:col-span-3">
        <RequestPaymentDetailLeftForm
          loading={isLoading}
          control={control}
          getValues={getValues}
          handleSubmit={handleSubmit}
          onPress={_onPress}
          data={data}
        />
      </div>
      <div className="md:col-span-8 xl:col-span-9">
        <RequestPaymentDetailRightForm
          loading={isLoading}
          control={control}
          getValues={getValues}
          fields={fields}
          setValue={setValue}
        />
      </div>
    </div>
  );
};

Index.displayName = SEOConfigs.deposit.detailRequest;
Index.breadcrumb = breadcrumb.order.requestPayment.detail;
Index.Layout = Layout;

export default Index;
