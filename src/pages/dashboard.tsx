import {
  Layout,
  NewDeliveryOrders,
  NewOrders,
  NewPaymentOrders,
  NewRecharges,
  OrdersPerWeek,
  TheMostBalance,
  TheMostOrders,
  TotalRechargesPerWeek,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { selectUser, useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const { user: userStore } = useAppSelector(selectUser);
  if (!userStore) return null;
  return (
    <div className="xl:grid xl:grid-cols-4 xl:gap-4 w-full mb-4">
      <div className="xl:col-span-4 mb-4 xl:mb-0">
        <OrdersPerWeek />
      </div>
      <div className="lg:col-span-4 col-span-2 mb-4 xl:mb-0">
        <TotalRechargesPerWeek />
      </div>

      {/* <div className="col-span-1 mb-4 xl:mb-0 ">`
				<PurchasePercent />
			</div> */}

      <div className="lg:col-span-2 col-span-2 mb-4 xl:mb-0">
        <NewRecharges />
      </div>
      <div className="lg:col-span-2 col-span-2 mb-4 xl:mb-0">
        <TheMostBalance />
      </div>
      <div className="lg:col-span-2 col-span-2 mb-4 xl:mb-0">
        <TheMostOrders />
      </div>
      <div className="lg:col-span-2 col-span-2 mb-4 xl:mb-0">
        <NewOrders />
      </div>
      <div className="lg:col-span-2 col-span-2 mb-4 xl:mb-0">
        <NewDeliveryOrders />
      </div>
      <div className="lg:col-span-2 col-span-2 mb-4 xl:mb-0">
        <NewPaymentOrders />
      </div>
    </div>
  );
};

Index.displayName = SEOConfigs.dasboard;
Index.breadcrumb = breadcrumb.dashboard;
Index.Layout = Layout;

export default Index;
