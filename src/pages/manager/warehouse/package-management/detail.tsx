import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import { bigPackage } from "~/api";
import {
  Empty,
  Layout,
  PackageManagementForm,
  PackageManagementFormDetail,
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

  if (isError)
    return <Empty description={`Không tìm thấy bao hàng #${query.id}`} />;
  if (!data) return null;

  return (
    <div className="xl:grid grid-cols-12 gap-4">
      <div className="col-span-3 mb-4">
        <div className="tableBox px-4">
          <div className="">
            <div className="border-b mb-4 font-bold text-base text-[#424242] border-main pb-2">
              <span>CẬP NHẬT BAO HÀNG</span>
            </div>
            <PackageManagementForm data={data?.Data} loading={isLoading} />
          </div>
        </div>
      </div>
      <div className="col-span-9">
        <div className="tableBox px-4">
          <div className="">
            <div className="">
              <div className="border-b font-bold text-base text-[#424242] border-main pb-2">
                <span>DANH SÁCH MÃ VẬN ĐƠN</span>
              </div>
              <PackageManagementFormFilter
                handleFilter={handleFilter}
                loading={isLoading}
              />
            </div>
            <PackageManagementFormTable
              data={data?.Data?.SmallPackages?.filter((x) =>
                x.OrderTransactionCode.includes(OrderTransactionCode)
              )}
              loading={isLoading}
              handleModal={handleModal}
            />
          </div>
        </div>
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
