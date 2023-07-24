import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { smallPackage } from "~/api";
import { Empty, Loading, UserLayout } from "~/components";
import {
  TrackingDetail,
  TrackingFilter,
} from "~/components/screens/user/tracking";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = ({ connection }) => {
  const [TransactionCode, setTransactionCode] = useState<string>(null);
  const handleFilter = (TransactionCode: string) => {
		if (TransactionCode === "") {
			toast.warn("Vui lòng nhập mã vận đơn!");
			return;
		}
    setTransactionCode(TransactionCode.trim());
	}

  const { data, isLoading, isFetching } = useQuery(
    ["tracking", TransactionCode],
    () => smallPackage.getByTransactionCode({ TransactionCode }),
    {
      select: (data) => data.Data,
      enabled: !!TransactionCode?.length,
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="w-full xl:w-1/4">
        <TrackingFilter handleFilter={handleFilter} />
      </div>
      <div className="">
        <div>
					{/* {
						isFetching && <Loading />
					} */}
					{
						TransactionCode && data?.length > 0 && 
            <TrackingDetail data={data} />

					}
					{
						TransactionCode && (!data?.length) && <Empty />
					}
        </div>
      </div>
    </div>
  );
};

Index.displayName = SEOHomeConfigs.tracking;
Index.breadcrumb = "Tracking mã vận đơn";
Index.Layout = UserLayout;

export default Index;
