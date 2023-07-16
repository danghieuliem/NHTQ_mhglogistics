import router from "next/router";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { complain } from "~/api";
import {
  ComplainListFilter,
  ComplainListForm,
  ComplainListTable,
  Layout,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const [filter, setFilter] = useState({
    SearchContent: null,
    FromDate: null,
    ToDate: null,
    Status: null,
    PageIndex: 1,
    PageSize: 20,
    OrderBy: "Id desc",
    TotalItems: null,
  });

  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const { isFetching, data, refetch } = useQuery(
    ["reportList", { ...filter }],
    () => complain.getList(filter).then((res) => res.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      staleTime: 5000,
    }
  );

  const [modal, setModal] = useState(false);
  const item = useRef<TReport>();
  const handleModal = (itemSelected: TReport) => {
    item.current = itemSelected;
    setModal(!modal);
  };

  const handleExportExcel = async () => {
    complain
      .exportExcel({ ...filter, PageSize: 99999 })
      .then((res) => {
        router.push(res.Data);
      })
      .catch((error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      });
  };

  return (
    <div>
      <div className="w-fit ml-auto">
        <ComplainListFilter
          handleFilter={handleFilter}
          handleExportExcel={handleExportExcel}
        />
      </div>
      <ComplainListTable
        filter={filter}
        handleFilter={handleFilter}
        data={data?.Items}
        loading={isFetching}
        handleModal={handleModal}
      />
      <ComplainListForm
        onCancel={() => setModal(false)}
        visible={modal}
        defaultValues={item.current}
      />
    </div>
  );
};

Index.displayName = SEOConfigs.handleComplaint;
Index.breadcrumb = breadcrumb.order.complainList;
Index.Layout = Layout;

export default Index;
