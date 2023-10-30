import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { bigPackage } from "~/api";
import {
  Empty,
  Layout,
  PackageManagementForm,
  PackageManagementFormFilter,
  PackageManagementFormTable,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const [OrderTransactionCode, setOrderTransactionCode] = useState<string>("");
  const handleFilter = (code: string) => {
    setOrderTransactionCode(code);
  };

  const item = useRef<TSmallPackage>();
  const [modal, setModal] = useState(false);

  const handleModal = (itemSelected: TSmallPackage) => {
    item.current = itemSelected;
    setModal(true);
  };
  const { query } = useRouter();
  const { data, isError, isLoading, refetch } = useQuery(
    ["bigPackage", +query?.id],
    () => bigPackage.getByID(+query?.id),
    {
      onError: toast.error,
      enabled: !!query?.id,
    }
  );

  if (isError || !data) return <Empty />;

  return (
    <div className="xl:grid grid-cols-12 gap-4">
      <div className="col-span-3 mb-4">
        <div className="tableBox px-4">
          <div className="">
            <div className="border-b mb-4 font-bold text-base text-label border-label pb-2">
              <span>CẬP NHẬT BAO HÀNG</span>
            </div>
            <PackageManagementForm data={data?.Data} loading={isLoading} />
          </div>
        </div>
      </div>
      <div className="col-span-9">
        <div className="font-bold text-base text-label flex flex-col gap-4 justify-between">
          <span>DANH SÁCH MÃ VẬN ĐƠN</span>
          <PackageManagementFormFilter
            handleFilter={handleFilter}
            loading={isLoading}
            data={data?.Data}
            refetch={refetch}
          />
        </div>
        <PackageManagementFormTable
          data={data?.Data?.SmallPackages?.filter((x) =>
            x.OrderTransactionCode.includes(OrderTransactionCode)
          )}
          loading={isLoading}
          handleModal={handleModal}
          refetch={refetch}
        />
      </div>
      {/* <PackageManagementFormDetail
				visible={modal}
				onCancel={() => setModal(false)}
				defaultValues={item.current}
				refetch={refetch}
			/> */}
    </div>
  );
};

Index.displayName = SEOConfigs.parcelManagement.detailPackageManagement;
Index.breadcrumb = breadcrumb.warehouse.packageManagement.detail;
Index.Layout = Layout;

export default Index;
