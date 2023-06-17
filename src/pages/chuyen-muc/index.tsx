import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { pageType } from "~/api";
import {
  HomeBreadcrumb,
  HomeCard,
  HomeLayout,
  HomeSidebar,
  showToast,
} from "~/components";
import ContentItem from "~/components/globals/layout/homeLayouts/Card/ContentItem";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";
import { _format } from "~/utils";
import Head from "next/head";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import MetaTags from "~/components/globals/metaTag";

const Index: TNextPageWithLayout = () => {
  const router = useRouter();
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);
  const [Data, setData] = useState<any>(null);

  const targetCode = router?.query?.code?.toString().trim();

  useQuery({
    queryKey: ["articals", targetCode],
    queryFn: () =>
      pageType.getByCode(targetCode)
        .then((res) => {
          setData(res?.Data);
        })
        .catch((error) => {
          showToast({
            title: "Bài viết không tồn tại!",
            message: error?.response?.data?.message,
            type: "error",
          });
        }),
    staleTime: 2000,
    enabled: !!targetCode,
  });

  return (
    <>
      <Head>
        <title>{Data?.Title && (Data?.Title !== " ") ? Data?.Title : Data?.Name}</title>
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
            {/* {Data?.Pages.length > 0 && !!(Data?.Title && Data?.Description) && (
              <div>
                <div className={styles.top}>
                  <h4 className="small_title">{Data?.Name}</h4>
                  <h1>
                    Các bài viết chuyên mục{" "}
                    <span className="!text-main">{Data?.Name}</span>
                  </h1>
                </div>
                <HomeCard
                  data={Data?.Pages}
                  direction="horizontal"
                  code={router?.query?.Code}
                  name={Data?.Name}
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.homePage;
Index.Layout = HomeLayout;

export default Index;
