import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Page } from "~/api";
import { HomeLayout, HomeSidebar } from "~/components";
import ContentItem from "~/components/globals/layout/homeLayouts/Card/ContentItem";
import MetaTags from "~/components/globals/metaTag";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import styles from "./index.module.css";

const Index: TNextPageWithLayout = () => {
  const router = useRouter();
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);
  
  const [Data, setData] = useState({
    Title: "",
    SideBar: null,
  });

  const targetCode = router?.query?.code?.toString().trim();

  useQuery({
    queryKey: ["articals", targetCode],
    queryFn: () =>
      Page.getByCode(targetCode)
        .then((res) => {
          setData(res?.Data);
        })
        .catch((error) => {
          toast.error((error as any)?.response?.data?.ResultMessage);
        }),
    // staleTime: 2000,
    enabled: !!targetCode,
  });

  return (
    <>
      <Head>
        <title>{Data?.Title}</title>
      </Head>
      <MetaTags data={Data} dataConfig={dataGlobal} />
      <div className={styles.chuyenMucDetail}>
        <div className="container">
          <div className={styles.inner}>
            <div className={styles.chuyenMucDetailContent}>
              <div
                className={`${Data?.SideBar ? "col-span-9" : "col-span-12"}`}
                // style={{
                //   gridColumn: Data?.SideBar ? "1/13 lg:1/10" : "1/13 lg:1/13",
                // }}
              >
                <ContentItem
                  data={Data}
                  code={`${router?.query?.code}`}
                  Title={""}
                  IMG={""}
                  Description={""}
                  Created={undefined}
                  PageContent={undefined}
                />
              </div>
              {Data?.SideBar && (
                <div className={`${styles.right}`}>
                  <div className="order-2 col-span-12 sticky top-[120px]">
                    <HomeSidebar />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.homePage;
Index.Layout = HomeLayout;

export default Index;
