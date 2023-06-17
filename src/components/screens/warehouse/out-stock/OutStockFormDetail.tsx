import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { outStockSession } from "~/api";
import { Empty, toast } from "~/components";
import { OutStockFormFilter } from "./OutStockFormFilter";
import { OutStockFormTableDetail } from "./OutStockFormTableDetail";

export const OutStockFormDetail: React.FC = () => {
  const { query } = useRouter();

  const { data, isError, isFetching, refetch } = useQuery(
    ["outStockDetail"],
    () => outStockSession.getByID(+query?.id),
    {
      onSuccess: (data) => data,
      onError: toast.error,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!+query?.id,
    }
  );
  const totalMustPay = data?.Data.TotalPay;

  const mutationDelete = useMutation(outStockSession.deleteNotePayment, {
    onSuccess: () => refetch(),
    onError: toast.error,
  });

  const mutationExport = useMutation(
    () => outStockSession.export({ Id: data?.Data?.Id }),
    {
      onSuccess: (res) => {
        toast.success("Xuất kho thành công");
      },
      onError: toast.error,
    }
  );

  const onOutstock = async () => {
    try {
      await mutationExport.mutateAsync();
    } catch (error) {}
  };

  const onHide = async () => {
    try {
      await mutationDelete.mutateAsync({ Id: data?.Data?.Id });
    } catch (error) {}
  };

  if (isError)
    return (
      <Empty description={`Không tìm thấy hoá đơn xuất kho #${query?.id}`} />
    );

  return (
    <div className="tableBox py-4">
      <OutStockFormFilter
        onReload={refetch}
        onOutstock={onOutstock}
        onHide={onHide}
        outStockSessionPackages={data?.Data?.OutStockSessionPackages}
        dataAll={data?.Data}
      />
      <OutStockFormTableDetail
        data={data?.Data?.OutStockSessionPackages}
        loading={isFetching || mutationDelete.isLoading}
        totalMustPay={totalMustPay}
        dataAll={data?.Data}
      />
    </div>
  );
};
