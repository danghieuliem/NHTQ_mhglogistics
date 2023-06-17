import Link from "next/link";
import router from "next/router";
import { socialList } from "~/configs";
import styles from "./index.module.css";

const handleSetMenu = (dataConfig) => {
  const socialListRender = socialList?.map((social) => {
    return {
      ...social,
      link: dataConfig[social.title],
    };
  });
  return socialListRender;
};

const blogList = [
  {
    id: 1,
    title: "Nhập hàng Trung Quốc",
    code: "",
  },
  {
    id: 2,
    title: "Đặt hàng 1688",
    code: "",
  },
  {
    id: 3,
    title: "Đặt hàng Tmall",
    code: "",
  },
  {
    id: 4,
    title: "Đặt hàng Taobao",
    code: "",
  },
];

const Footer = ({ dataConfig, dataMenu }) => {
  if (!dataConfig || !dataMenu) return null;
  // const [socialListRender, setSocialListRender] = useState(
  //   handleSetMenu(dataConfig)
  // );
  // useEffect(
  //   () => setSocialListRender(handleSetMenu(dataConfig)),
  //   [dataConfig, dataMenu]
  // );

  // const { data: articalList } = useQuery(["articalList"], () =>
  //   Page.getList({
  //     Active: true,
  //     PageIndex: 1,
  //     PageSize: 6,
  //     OrderBy: "Id desc",
  //   }).then((res) => res?.Data?.Items)
  // );

  return (
    <footer className="">
      <div className={styles.footerTop}>
        <div className="container">
          <div className={styles.logo}>
            <Link href="/">
              <a className="">
                <img
                  src={"/default/logo_footer.png"}
                  alt=""
                  height={"auto"}
                />
              </a>
            </Link>
          </div>
          <div className={styles.inner}>
            <div className=" col-span-1">
              <div className={styles.title}>
                <p className="uppercase font-bold text-lg !mb-4"> Menu </p>
              </div>
              <div className={styles.contentFoot}>
                {dataMenu?.map((item) => (
                  <div key={item.Name} className={styles.menuItem}>
                    <a
                      className={styles.colorD}
                      onClick={() =>
                        router.push({
                          pathname: "/chuyen-muc",
                          query: { code: item?.Code },
                        })
                      }
                    >
                      {item?.Name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <div className={styles.title}>
                <p className="uppercase font-bold text-lg !mb-4 mb-5">Blog</p>
              </div>
              {blogList.map((blog) => (
                <div className={styles.menuItem} key={blog?.id}>
                  <Link href={`/chuyen-muc/detail/?code=${blog.code}`}>
                    <a target={"_blank"} className={styles.colorD}>
                      {blog?.title}
                    </a>
                  </Link>
                </div>
              ))}
              {/* {articalList?.map((art) => {
                return (
                  <div className={styles.menuItem} key={art?.Code}>
                    <a
                      onClick={() =>
                        router.push({
                          pathname: "/chuyen-muc/detail",
                          query: { code: art?.Code },
                        })
                      }
                      className={styles.colorD}
                    >
                      {art?.Title}
                    </a>
                  </div>
                );
              })} */}
              {/* {dataConfig?.FacebookFanpage && (
								<div className="mt-4">
									<iframe
										src={dataConfig?.FacebookFanpage}
										width="100%"
										height="300"
										allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
									/>
								</div>
							)} */}
            </div>
            <div className="col-span-1">
              <div className={styles.title}>
                <p className="uppercase font-bold text-lg !mb-4"> Liên hệ </p>
              </div>
              <div className={styles.contentFoot}>
                <div className={styles.contactBox}>
                  Hotline:
                  <a
                    href={`tel:${dataConfig?.Hotline}`}
                    className={`${styles.contactLink}`}
                  >
                    <span className={styles.colorD}>{dataConfig?.Hotline}</span>
                  </a>
                </div>
                <div className={styles.contactBox}>
                  Email:
                  <a
                    href={`mailto:${dataConfig?.EmailContact}`}
                    className={`${styles.contactLink}`}
                  >
                    <span className={styles.colorD}>
                      {dataConfig?.EmailContact}
                    </span>
                  </a>
                </div>
                <div className={styles.contactBox}>
                  Địa chỉ:
                  <span
                    className={styles.colorD}
                    // dangerouslySetInnerHTML={{ __html: dataConfig?.Address }}
                  >
                    {dataConfig?.Address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.cRight}>MONAMEDIA LOGISTICS</p>
      </div>
    </footer>
  );
};

export default Footer;
