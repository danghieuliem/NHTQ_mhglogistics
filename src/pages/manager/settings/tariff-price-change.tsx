import { TablePaginationConfig } from "antd";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { priceChange } from "~/api";
import configHomeData from "~/api/config-home";
import {
  Layout,
  TariffPriceChangeForm,
  TariffPriceChangeTable,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { defaultPagination } from "~/configs/appConfigs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const { isFetching, data } = useQuery(
    [
      "priceChangeData",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      priceChange
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
        })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setPagination({ ...pagination, total: data.TotalItem }),
      onError: toast.error,
      enabled: userCurrentInfo?.UserGroupId === 1,
      refetchOnWindowFocus: false
    }
  );

  const [modal, setModal] = useState(false);
  const item = useRef<TTariffPriceChange>();
  const handleModal = (itemSelected) => {
    item.current = itemSelected;
    setModal(!modal);
  };

  const { data: configData } = useQuery(["configData"], () =>
    configHomeData.get().then((res) => res?.Data)
  );

  return (
    <>
      <div className="tableBox w-fit">
        <div className="text-right">
          <p className="font-bold">Giá tiền mặc định: </p>
          <span className="text-main font-semibold">
            {_format.getVND(configData?.PricePayHelpDefault, " VNĐ")}
          </span>
        </div>
      </div>

      <TariffPriceChangeTable
        {...{
          loading: isFetching,
          data: data?.Items,
          handleModal,
          pagination,
          handlePagination: (pagination) => setPagination(pagination),
        }}
      />
      <TariffPriceChangeForm
        {...{
          onCancel: () => setModal(false),
          defaultValues: item.current,
          visible: modal,
        }}
      />
    </>
  );
};

Index.displayName = SEOConfigs?.settings?.feePayFor;
Index.breadcrumb = breadcrumb.settings.tariffPriceChange;
Index.Layout = Layout;

export default Index;
