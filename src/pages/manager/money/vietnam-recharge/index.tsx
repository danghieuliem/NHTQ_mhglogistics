import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { user } from "~/api";
import { Empty, Layout, VietNamRechargeForm } from "~/components";
import { breadcrumb } from "~/configs";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { useCatalogue } from "~/hooks";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { query } = useRouter();
  const { bank: bankData } = useCatalogue({ bankEnabled: !!query?.id });

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(["clientData", +query?.id], () => user.getByID(+query?.id), {
    select: (data) => data.Data,
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!query?.id,
  });

  if (isError) return <Empty />;

  return (
    <div className="tableBox">
      <VietNamRechargeForm {...{ bankData, userData, loading: isLoading }} />
    </div>
  );
};

Index.displayName = SEOHomeConfigs.financialManagement.rechargeVNĐ;
Index.breadcrumb = breadcrumb.money.vietnamRecharge.detail;
Index.Layout = Layout;

export default Index;
