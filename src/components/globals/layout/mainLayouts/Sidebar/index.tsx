import { Popover, Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRouter } from "~/configs/routers";
import { RootState, selectRouter, useAppSelector } from "~/store";
import styles from "./index.module.css";

// import type { MenuProps } from 'antd'

function NavList({ menuActive }) {
  const router = useRouter();
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);

  return (
    <div className={clsx(styles.navListContent)}>
      {menuActive?.childrens.map((meuChild) => (
        <ul key={meuChild?.name} className={clsx(styles.ulMenuList)}>
          <li>
            <a
              className={clsx(
                styles.liMenuItem,
                router?.asPath === meuChild?.path && styles.liMenuItemActive
              )}
              onClick={() => router.push(meuChild?.path)}
            >
              {meuChild?.name}
            </a>
          </li>
        </ul>
      ))}
      <div className={styles.footInfo}>
        <Tooltip title="Hỗ trợ kỹ thuật" className={styles.info}>
          <span className={styles.tag}>
            <i className="fas fa-user-headset"></i>
          </span>
          <a
            className={styles.value}
            href={`tel:+${dataGlobal?.HotlineSupport}`}
          >
            {dataGlobal?.HotlineSupport}
          </a>
        </Tooltip>
        <div className={styles.branch}>
          <span className={styles.mainBranch}>MONA.Software</span>
          <Tooltip className={styles.subBranch} title="Phiên bản">
            <span>NHTQ 6.0.5</span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

const MemoMenuList = React.memo(NavList);

export type TProps = {
  hover: boolean;
  tabbar: boolean;
  handleHover: (bool: boolean) => void;
  handleTabbar: (bool: boolean) => void;
  userPage?: boolean;
};

const Sidebar: FC<TProps> = ({ handleHover, hover, tabbar, userPage }) => {
  let menuRouter = useAppSelector(selectRouter);
  const router = useRouter();
  const renderMenuRouter = userPage ? userRouter : menuRouter;

  const [menuActive, setMenuActive] = useState(renderMenuRouter[0]);

  useEffect(() => {
    const pathWindow = router.asPath;
    for (let i in renderMenuRouter) {
      renderMenuRouter[i].childrens?.forEach((child) => {
        if (pathWindow.match(child.path)) {
          setMenuActive(renderMenuRouter[i]);
        }
      });
    }
  }, [router, menuActive?.name]);

  return (
    <nav className={clsx(styles.navWrapper, hover && styles.navWrapperOpen)}>
      <div className={clsx(styles.navIcon)}>
        {renderMenuRouter?.map((menu, index) =>
          hover ? (
            menuActive?.name === menu?.name ? (
              <div
                key={clsx(menu?.icon, menu?.name)}
                className={clsx(
                  styles.icon,
                  menuActive?.name === menu?.name && hover && styles.iconActive,
                  menuActive?.name === menu?.name &&
                    !hover &&
                    styles.iconActiveHover
                )}
                onClick={() => setMenuActive(menu)}
              >
                <div className={styles.iconBorder}></div>
                <i className={menu?.icon}></i>
              </div>
            ) : (
              <Popover
                placement="rightTop"
                key={clsx(menu?.icon, index)}
                content={
                  <div
                    key={clsx(
                      "popover-content-",
                      menu?.name,
                      menu?.path,
                      menu?.icon
                    )}
                    className="bg-main rounded-[6px] shadow-md p-4"
                    // bodyStyle={{ padding: "10px" }}
                    // title={menu?.path !== "javascript:;" ? null : menu?.name}
                    // headStyle={{
                    //   paddingLeft: "10px",
                    //   fontSize: "14px",
                    //   fontWeight: "bold",
                    //   color: "#fff",
                    // }}
                  >
                    {menu?.childrens.map((meuChild) => (
                      <ul
                        key={clsx("menu-childrens-", meuChild?.name)}
                        className={clsx(styles.ulMenuList)}
                      >
                        <li>
                          <Link href={meuChild?.path}>
                            <a className={clsx(styles.PopoverliMenuItem)}>
                              {meuChild?.name}
                            </a>
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                }
              >
                <div
                  key={clsx(menu?.icon, index)}
                  className={clsx(
                    styles.icon,
                    menuActive?.name === menu?.name &&
                      hover &&
                      styles.iconActive,
                    menuActive?.name === menu?.name &&
                      !hover &&
                      styles.iconActiveHover
                  )}
                  onClick={() => router.push(menu?.path)}
                >
                  {/* <div className={styles.iconBorder}></div> */}
                  <i className={menu?.icon}></i>
                </div>
              </Popover>
            )
          ) : (
            <Popover
              placement="rightTop"
              key={clsx(menu?.name, menu?.path, menu?.icon)}
              content={
                <div
                  key={clsx("popover-conent-", menu?.menu, menu?.icon)}
                  className="bg-main rounded-[6px] shadow-md p-4"
                  // bodyStyle={{ padding: "8px" }}
                  // title={menu?.path !== "javascript:;" ? null : menu?.name}
                  // headStyle={{
                  //   paddingLeft: "10px",
                  //   fontSize: "14px",
                  //   fontWeight: "bold",
                  //   color: "#fff",
                  // }}
                >
                  {menu?.childrens.map((meuChild) => (
                    <ul
                      key={meuChild?.name}
                      className={clsx(styles.ulMenuList)}
                    >
                      <li onClick={() => router.push(meuChild?.path)}>
                        <a
                          className={clsx(
                            styles.PopoverliMenuItem,
                            router?.asPath === meuChild?.path &&
                              styles.PopoverliMenuItemActive
                          )}
                        >
                          {meuChild?.name}
                        </a>
                      </li>
                    </ul>
                  ))}
                </div>
              }
            >
              <div
                key={clsx(menu?.icon, index)}
                className={clsx(
                  styles.icon,
                  menuActive?.name === menu?.name && hover && styles.iconActive,
                  menuActive?.name === menu?.name &&
                    !hover &&
                    styles.iconActiveHover
                )}
                onClick={() => router.push(menu?.path)}
              >
                {/* <div className={styles.iconBorder}></div> */}
                <i className={menu?.icon}></i>
              </div>
            </Popover>
          )
        )}
      </div>
      <MemoMenuList menuActive={menuActive} />
    </nav>
  );
};

export default React.memo(Sidebar);
