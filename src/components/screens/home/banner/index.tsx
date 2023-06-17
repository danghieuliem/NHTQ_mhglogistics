import Link from "next/link";
import styles from "./index.module.css";


export const HomeBanner = ({ data }) => {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: data?.BannerIMG
          ? `url(${data?.BannerIMG})`
          : "/default/banner_bg.png",
      }}
    >
      <div className={`container ${styles.container}`}>
        <div className={styles.containerHome}>
          <div className={styles.content}>
            <div className={styles.text}>
              <h1 className="text-[#fff] md:!text-[40px] font-bold sm:!text-[30px]">
                {data?.BannerText ?? (
                  <>
                    Hệ thống nhập hàng <br /> Trung Quốc{" "}
                    <span style={{ color: "#F5851E" }}>uy tín</span>
                  </>
                )}
              </h1>
            </div>
            <div className={styles.extension}>
              <p className="text-[#fff] text-[20px]">
                Cài đặt công cụ đặt hàng:
              </p>
              <div className={styles.exWrapper}>
                <Link href={data?.CocCocExtensionLink ?? "/"}>
                  <a target="_blank" className={styles.btnExt}>
                    <img
                      src="/default/logo-coccoc.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Cốc Cốc</span>
                  </a>
                </Link>
                <Link href={data?.ChromeExtensionLink ?? "/"}>
                  <a target="_blank" className={styles.btnExt}>
                    <img
                      src="/default/logo-chrome.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <span>Chrome</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/* <TrackingHome /> */}
        </div>
      </div>
      <img src="/default/banner_truck.png" className={styles.bannerTruck} />
    </div>
  );
};
