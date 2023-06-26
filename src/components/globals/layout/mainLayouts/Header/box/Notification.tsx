import clsx from "clsx";
import router from "next/router";
import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getAllNewNotify, notification } from "~/api";
import styles from "./index.module.css";

import { Loading } from "~/components/screens/status/Loading";
import { _format } from "~/utils";

const templateTabs = [
  {
    tab: "Tất cả",
    key: 4,
    color: "sec",
  },
  {
    tab: "Tài chính",
    key: 1,
    color: "green",
  },
  {
    tab: "Đơn hàng",
    key: 2,
    color: "blue",
  },
  // {
  //   tab: "Giỏ hàng",
  //   key: 5,
  // },
  {
    tab: "Khiếu nại",
    key: 3,
    color: "red",
  },
];

const NotiItem = ({ item }) => {
  const queryClient = useQueryClient();

  return (
    <div
      className={styles.notiItem}
      onClick={() => {
        if (!item.IsRead) {
          item.IsRead = true;
          getAllNewNotify.readNotify([item.Id]).then(() => {
            queryClient.invalidateQueries("new-notification");
            close();
            router.push(`${item.Url}`);
          });
        }
      }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{item.NotificationContent}</div>
        <div className="text-[12px] text-label font-bold">
          {_format.getVNDate(item?.Created)}
        </div>
      </div>
      <div className={clsx(item.IsRead === false && styles.notRead)}></div>
    </div>
  );
};

const Notification = ({ userPage, UID }) => {
  const [list, setList] = useState([]);
  const totalItems = useRef(0);
  const TypeFilter = useRef(4);


  const [filter, setFilter] = useState({
    Type: TypeFilter.current,
    OfEmployee: userPage ? false : true,
    UID,
    PageIndex: 1,
    PageSize: 20,
    IsRead: 2,
  });

  const { isLoading, isFetching } = useQuery(
    ["notification", filter.Type],
    () => notification.getList(filter),
    {
      onSuccess: (res) => {
        totalItems.current = res?.Data?.TotalItem;
        let newList = [];
        if (filter.Type !== TypeFilter.current) {
          newList = res?.Data?.Items;
        } else {
          newList = [...list, ...res?.Data?.Items];
        }
        setList(newList);
        TypeFilter.current = filter.Type;
      },
      onError: (error) => toast.error(error),
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <div className={styles.notiList}>
      <div className={styles.notiHead}>
        {templateTabs?.map((tm) => {
          const bgColor = `bg-${tm?.color}`;
          const textColor = `text-${tm?.color}`;
          return (
            <span
              key={tm?.key}
              className={clsx(
                styles.notiHeadItem,
                TypeFilter.current === tm?.key
                  ? `${bgColor} text-white`
                  : `bg-white ${textColor}`
              )}
              onClick={() => {
                setFilter({ ...filter, PageIndex: 1, Type: Number(tm?.key) });
              }}
            >
              {tm?.tab}
            </span>
          );
        })}
      </div>
      <div className={styles.notiListBody}>
        {!isFetching ? (
          list?.map((item) => <NotiItem item={item} key={item?.Id} />)
        ) : (
          <div className={styles.iconLoading}>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
