import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { pageType } from "~/api";
import {
  HomeBreadcrumb,
  HomeCard,
  HomeLayout,
  HomeSidebar,
} from "~/components";
import ContentItem from "~/components/globals/layout/homeLayouts/Card/ContentItem";
import MetaTags from "~/components/globals/metaTag";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";
import styles from "./index.module.css";

const Index: TNextPageWithLayout = () => {
  const router = useRouter();
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);
  const [Data, setData] = useState<any>(null);

  const targetCode = router?.query?.code?.toString().trim();

  useQuery({
    queryKey: ["articals", targetCode],
    queryFn: () =>
      pageType
        .getByCode(targetCode)
        .then((res) => {
          setData(res?.Data);
        })
        .catch((error) => {
          toast.error((error as any)?.response?.data?.ResultMessage);
        }),
    enabled: !!targetCode,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Head>
        <title>
          {Data?.Title && Data?.Title !== " " ? Data?.Title : Data?.Name}
        </title>
      </Head>
      <MetaTags data={Data} dataConfig={dataGlobal} />

      <div className={styles.chuyenMuc}>
        <div className="container">
          <div className={styles.inner}>
            {!(Data?.Pages.length > 0) && (
              <HomeBreadcrumb currentRoute={Data} name={Data?.Name} />
            )}
            <div className={styles.chuyenMucContent}>
              <div className={styles.left}>
                {!!(Data?.Title && Data?.Description) ? (
                  <>
                    <div className={styles.title}>
                      <h1>{Data?.Title}</h1>
                      <span className={styles.created}>
                        <span className={styles.time}>
                          {_format.getShortVNDate(Data?.Created)}
                        </span>
                        <span className={styles.by}>{Data?.CreatedBy}</span>
                      </span>
                    </div>
                    <ContentItem
                      data={Data}
                      code={router?.query?.Code}
                      Title={""}
                      IMG={""}
                      Description={""}
                      Created={undefined}
                      PageContent={undefined}
                    />
                  </>
                ) : (
                  Data?.Pages.length > 0 && (
                    <HomeCard
                      direction={"vertical"}
                      data={Data?.Pages}
                      code={router?.query?.Code}
                      name={Data?.Name}
                    />
                  )
                )}
              </div>
              <div className={styles.right}>
                <div className="sticky top-[120px]">
                  <HomeSidebar />
                </div>
              </div>
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
