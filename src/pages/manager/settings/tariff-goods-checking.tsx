import { TablePaginationConfig, Tabs } from "antd";
import { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { feeGoodsChecking } from "~/api";
import {
  Layout,
  TariffGoodsCheckingFormMemo,
  TariffGoodsCheckingTable,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { defaultPagination } from "~/configs/appConfigs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const { TabPane } = Tabs;

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);
  const [smallerTenCNY, setSmallerTenCNY] = useState([]);
  const [greaterTenCNY, setGreaterTenCNY] = useState([]);

  const { isFetching } = useQuery(
    [
      "fee-goods-checking",
      { Current: pagination.current, PageSize: pagination.pageSize },
    ],
    () =>
      feeGoodsChecking
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
        })
        .then((res) => res.Data),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const arr1 = data.Items.filter((item) => item?.RowNumber % 2 === 0);
        const arr2 = data.Items.filter((item) => item?.RowNumber % 2 !== 0);
        setGreaterTenCNY(arr1);
        setSmallerTenCNY(arr2);
        setPagination({ ...pagination, total: data.TotalItem });
      },
      onError: toast.error,
      enabled: userCurrentInfo?.UserGroupId === 1,
    }
  );

  const [modal, setModal] = useState(false);
  const item = useRef<TTariffUser>();
  const handleModal = (itemSelected) => {
    item.current = itemSelected;
    setModal(!modal);
  };

  const handleCloseModal = useCallback(() => setModal(false), []);

  return (
    <Tabs
      tabBarStyle={{
        width: "fit-content",
        background: "#fff",
        padding: "0 10px",
      }}
    >
      <TabPane tab={"Giá sản phẩm nhỏ hơn 10 ¥"} key="1">
        <TariffGoodsCheckingTable
          {...{
            loading: isFetching,
            data: smallerTenCNY,
            handleModal,
            pagination,
            handlePagination: (pagination) => setPagination(pagination),
          }}
        />
        <TariffGoodsCheckingFormMemo
          {...{
            onCancel: handleCloseModal,
            defaultValues: item.current,
            visible: modal,
          }}
        />
      </TabPane>

      <TabPane tab={"Giá sản phẩm lớn hơn 10 ¥"} key="2">
        <TariffGoodsCheckingTable
          {...{
            loading: isFetching,
            data: greaterTenCNY,
            handleModal,
            pagination,
            handlePagination: (pagination) => setPagination(pagination),
          }}
        />
        <TariffGoodsCheckingFormMemo
          {...{
            onCancel: handleCloseModal,
            defaultValues: item.current,
            visible: modal,
          }}
        />
      </TabPane>
    </Tabs>
  );
};
Index.displayName = SEOConfigs?.settings?.goodsChecking;
Index.breadcrumb = breadcrumb.settings.goodsChecking;
Index.Layout = Layout;

export default Index;
