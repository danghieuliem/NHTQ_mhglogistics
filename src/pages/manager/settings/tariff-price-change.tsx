import { TablePaginationConfig } from "antd";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
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
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const { user } = useAppSelector(selectUser);

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
      enabled: user?.UserGroupId === 1,
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
      <div className="flex tableBox px-5 py-2 flex items-center justify-start mb-5 w-fit">
        <div className="items-center mr-2 text-[20px] text-white IconFilter">
          <i className="far fa-poll "></i>
        </div>
        <div className="text-right ml-3">
          <p>Giá tiền mặc định</p>
          <span className="text-blue font-semibold">
            {_format.getVND(configData?.PricePayHelpDefault, " VNĐ")}
          </span>
        </div>
      </div>

      <div className="tableBox">
        <div className="tableBoxNon mb-0">
          <TariffPriceChangeTable
            {...{
              loading: isFetching,
              data: data?.Items,
              handleModal,
              pagination,
              handlePagination: (pagination) => setPagination(pagination),
            }}
          />
        </div>
        <TariffPriceChangeForm
          {...{
            onCancel: () => setModal(false),
            defaultValues: item.current,
            visible: modal,
          }}
        />
      </div>
    </>
  );
};

Index.displayName = SEOConfigs?.settings?.feePayFor;
Index.breadcrumb = breadcrumb.settings.tariffPriceChange;
Index.Layout = Layout;

export default Index;
