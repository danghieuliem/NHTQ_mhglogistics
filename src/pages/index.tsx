import {
  HomeLayout
} from "~/components";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {

  window.location.reload();
  // const dataGlobal: TConfig = useSelector(
  //   (state: RootState) => state.dataGlobal
  // );

  // const { data: dataService } = useQuery({
  //   queryKey: ["dataService"],
  //   queryFn: () =>
  //     service
  //       .getList({
  //         PageIndex: 1,
  //         PageSize: 20,
  //         OrderBy: "Id desc",
  //         Active: true,
  //       })
  //       .then((res) => res?.Data?.Items),
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  // const { data: dataRegisterSteps } = useQuery({
  //   queryKey: ["dataRegisterSteps"],
  //   queryFn: () =>
  //     step
  //       .getList({
  //         PageIndex: 1,
  //         PageSize: 20,
  //         OrderBy: "Id desc",
  //         Active: true,
  //       })
  //       .then((res) => res?.Data?.Items),
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  // const { data: dataBenefits } = useQuery({
  //   queryKey: ["dataBenefits"],
  //   queryFn: () =>
  //     customerBenefits
  //       .getList({
  //         PageIndex: 1,
  //         PageSize: 20,
  //         OrderBy: "Id",
  //         Active: true,
  //       })
  //       .then((res) => res?.Data?.Items),
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });

  return (
    <>
      {/* <Head>
        <title>{dataGlobal?.WebsiteName}</title>
      </Head>
      <MetaTags dataConfig={dataGlobal} />

      <div className="homeindex">
        <div className="col-span-2">
          <HomeBanner data={dataGlobal} />
          <HomeServices data={dataService} />
          <HomeTracking />
          <HomeBenefit
            data={dataBenefits?.filter((item) => item.ItemType === 2)}
          />
          <HomeRegister data={dataRegisterSteps} />
          <Customer />
          <News />
          <HomeInfoContact data={dataGlobal} />
          <PopupNoti />
        </div>
      </div> */}
    </>
  );
};

// Index.displayName = SEOConfigs.homePage;
Index.Layout = HomeLayout;

export default Index;
