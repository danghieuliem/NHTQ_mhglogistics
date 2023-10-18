import { Menu } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { userRouter } from "~/configs/routers";
import { RootState, selectRouter, useAppSelector } from "~/store";
import styles from "./index.module.css";
import { useQuery } from "react-query";
import { mainOrder } from "~/api";
import { useSelector } from "react-redux";
const { SubMenu } = Menu;

export type TProps = {
  hover: boolean;
  tabbar: boolean;
  userPage?: boolean;
  handleHover?: (val: boolean) => void;
};

const Sidebar: FC<TProps> = ({ userPage, hover, handleHover }) => {
  let menuRouter = useAppSelector(selectRouter);
  const router = useRouter();
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  let renderMenuRouter = userPage ? userRouter : menuRouter;

  if (window.innerWidth < 1200) {
    renderMenuRouter = userRouter;
  }

  const [activekey, setActiveKey] = useState([]);

  const [activeRouter, setActiveRouter] = useState([""]);
  const [obj, setObj] = useState({});

  const handleActiveKey = (name: string) => {
    const indexKey = activekey.indexOf(name);
    if (indexKey === -1) {
      setActiveKey([...activekey, name]);
    } else {
      activekey.splice(indexKey, 1);
      setActiveKey([...activekey]);
    }
  };

  useQuery(
    ["count-order"],
    () =>
      mainOrder
        .getCountOrder({
          UID: userCurrentInfo?.UserId,
          RoleID:
            userCurrentInfo?.UserGroupId === 8 ||
            userCurrentInfo?.UserGroupId === 6
              ? 3
              : userCurrentInfo?.UserGroupId,
        })
        .then((res) => {
          let data = res?.Data;
          let obj = {};
          data?.forEach((item) => {
            obj[item.Key] = item.Value;
          });
          setObj(obj);
        }),
    {
      enabled: [1, 3, 4, 6, 7, 8].includes(userCurrentInfo?.UserGroupId),
      retry: false,
    }
  );

  useEffect(() => {
    setActiveRouter([router?.asPath]);

    for (let i in renderMenuRouter) {
      for (let x in renderMenuRouter[i].Children) {
        if (renderMenuRouter[i].Children[x].SubChildren) {
          for (let z in renderMenuRouter[i].Children[x].SubChildren) {
            if (
              router?.asPath.match(
                renderMenuRouter[i].Children[x].SubChildren[z].Path
              )
            ) {
              setActiveKey([
                clsx(renderMenuRouter[i].Children[x]?.Label, "-subItem"),
              ]);
              break;
            }
          }
        }
      }
    }
  }, [router.asPath]);

  return (
    <div className={clsx(styles.navWrapper, hover && styles.navWrapperOpen)}>
      {renderMenuRouter?.map((menuParent) => (
        <div key={menuParent?.Title} className={styles.menuWrapper}>
          <div className={styles.mainTitle}>
            <span className="mr-2">
              <i className={menuParent?.Icon}></i>
            </span>
            <span>{menuParent?.Title}</span>
          </div>
          <Menu mode="inline" openKeys={activekey} selectedKeys={activeRouter}>
            {menuParent?.Children.map((child) => {
              if (!child?.SubChildren) {
                return (
                  <Menu.Item
                    key={clsx(child?.Path)}
                    className={clsx(
                      styles.childLabel,
                      activeRouter[0] === child?.Path && styles.childLabelActive
                    )}
                    onClick={() => handleHover(false)}
                  >
                    <Link
                      href={child.Path}
                      key={clsx(child?.Path, "-item")}
                      passHref
                    >
                      <a>
                        {/* <i className={child?.Icon}></i> */}
                        <span>{child?.Label}</span>
                      </a>
                    </Link>
                  </Menu.Item>
                );
              } else {
                return (
                  <SubMenu
                    key={clsx(child?.Label, "-subItem")}
                    className={clsx(styles.subMenu, "nav-subMenu")}
                    title={
                      <span className={styles.subMenuLabel}>
                        {/* <i className={child?.Icon}></i> */}
                        <span>{child?.Label}</span>
                      </span>
                    }
                    onTitleClick={() => {
                      handleActiveKey(clsx(child?.Label, "-subItem"));
                    }}
                  >
                    {child?.SubChildren.map((item) => (
                      <Menu.Item
                        key={item?.Label}
                        className={clsx(
                          styles.subLabel,
                          !router.asPath.match("/order/order-list/")
                            ? activeRouter[0].match(item?.Path) &&
                                styles.subLabelActive
                            : activeRouter[0] === item?.Path &&
                                styles.subLabelActive
                        )}
                        onClick={() => handleHover(false)}
                      >
                        <Link href={item.Path}>
                          <a>
                            {/* <i className="fal fa-long-arrow-alt-right"></i> */}
                            <i className="fas fa-dot-circle"></i>
                            <span>
                              {item?.Label}{" "}
                              <span>{item?.Key && `(${obj[item.Key]})`}</span>
                            </span>
                          </a>
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              }
            })}
          </Menu>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Sidebar);
