import { TablePaginationConfig } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { reportUser } from "~/api";
import {
  Layout,
  NotFound,
  showToast,
  SurplusChart,
  SurplusFilter,
  SurplusTable,
} from "~/components";
import { breadcrumb, defaultPagination } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const [typeOfUser, setTypeOfUser] = useState<number>(null);
  const handleFilter = (typeOfUser: number) => {
    setTypeOfUser(typeOfUser);
    setPagination(defaultPagination);
  };
  // const [totalWallet, setTotalWallet] = useState(0);

  const [pagination, setPagination] =
    useState<TablePaginationConfig>(defaultPagination);

  const [dataChart, setDataChart] = useState<Record<string, number>>(null);

  const {
    data: userSurplusData,
    isFetching,
    isError,
  } = useQuery(
    [
      "clientSurplusData",
      {
        Current: pagination.current,
        PageSize: pagination.pageSize,
        typeOfUser,
      },
    ],
    () =>
      reportUser
        .getList({
          PageIndex: pagination.current,
          PageSize: pagination.pageSize,
          OrderBy: "Id desc",
          Type: typeOfUser,
        })
        .then((res) => res.Data),
    {
      onSuccess: (data) => {
        // setTotalWallet(data.Items.reduce((acc, cur) => acc + cur.TotalWallet, 0))
        setPagination({ ...pagination, total: data?.TotalItem });
        setDataChart({
          GreaterThan0: data?.Items[0]?.GreaterThan0,
          Equals0: data?.Items[0]?.Equals0,
          From1MTo5M: data?.Items[0]?.From1MTo5M,
          From5MTo10M: data?.Items[0]?.From5MTo10M,
          GreaterThan10M: data?.Items[0]?.GreaterThan10M,
        });
      },
      onError: () => {
        showToast({
          title: "Lỗi!",
          message: "Đường truyền kết nối server bị lỗi! Vui lòng thử lại!",
          type: "error",
        });
      },
			keepPreviousData: true,
			staleTime: 5000
    }
  );

  if (isError) return <NotFound />;
  return (
    <div className="">
      <div>
        <SurplusFilter handleFilter={handleFilter} />
        <SurplusChart
          dataChart={dataChart}
          totalWallet={userSurplusData?.Items[0]?.TotalWallet}
        />
      </div>
      <SurplusTable
        {...{
          data: userSurplusData?.Items,
          pagination,
          handlePagination: (pagination) => setPagination(pagination),
        }}
      />
    </div>
  );
};

Index.displayName = SEOConfigs.statistical.surplus;
Index.breadcrumb = breadcrumb.statistical.surplus;
Index.Layout = Layout;

export default Index;
