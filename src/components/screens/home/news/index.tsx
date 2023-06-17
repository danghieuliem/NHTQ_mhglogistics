import Link from "next/link";
import { useEffect, useState } from "react";
import { pageType } from "~/api";
import { _format } from "~/utils";
import styles from "./index.module.css";

const NewsItem = ({ item }) => {
  return (
    <div className={styles.NewsItemBox}>
      <Link href={`/chuyen-muc/detail/?code=${item?.Code}`}>
        <a target={"_blank"}>
          <div className={styles.newsTop}>
            <div className={styles.NewsItemImg}>
              <div
                className={styles.img}
                style={{
                  background: item?.IMG ? `url(${item?.IMG})` : "url(/default/pro-empty.jpg)",
                }}
              ></div>
            </div>
            <span>
              <h6>Tin tức</h6>
            </span>
          </div>
          <div className={styles.datetime}>
            <span>{_format.getShortVNDate(item?.Created)}</span>
            <span className={styles.dateTimeDot}></span>
            <span>{item?.CreatedBy}</span>
          </div>
          <p>{item?.Summary}</p>
        </a>
      </Link>
    </div>
  );
};

export const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      pageType
        .getByCode("tin-tuc")
        .then((res) => {
          setNews(res?.Data.Pages.slice(0, 4));
        })
        .catch((err) => console.error(err));
    };

    getNews();
  }, []);

  return (
    <div className={styles.NewsContainer}>
      <div className="container">
        <div className={styles.top}>
          <h4 className="small_title">Tin tức</h4>
          <h1>Tin tức nổi bật</h1>
        </div>
        <div className={styles.bottom}>
          {news?.map((newItem) => (
            <NewsItem item={newItem} key={newItem?.Code} />
          ))}
        </div>
      </div>
    </div>
  );
};
