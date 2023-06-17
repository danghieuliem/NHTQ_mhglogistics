import { Menu } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FC, useCallback, useState } from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { userRouter } from "~/configs/routers";
import { RootState } from "~/store";
import styles from "./index.module.css";

export const MenuHorizontal: FC<{}> = ({}) => {
  const { route } = useRouter();
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);

  const [dropdown, setDropdown] = useState("");
  const handleDropdown = useCallback((name: string) => {
    setDropdown((dropdown) => (dropdown != name ? name : ""));
  }, []);

  const [hover, setHover] = useState(true);
  const [tabbar, setTabbar] = useState(false);

  return (
    <>
      <div className={clsx(styles.navigation, hover && styles.expand)}>
        <div className="component-container">
          <Menu className={clsx(styles.list, "submenu")}>
            {userRouter.map((item, index) => (
              <React.Fragment key={index}>
                {item.controllers.map((subItem) => (
                  <React.Fragment key={subItem.name}>
                    <Menus
                      {...{
                        ...subItem,
                        sidebarTabbar: tabbar,
                        sidebarHovered: hover,
                        dropdown: dropdown === subItem.name,
                        handleDropdown: () => handleDropdown(subItem.name),
                        activeRouter:
                          subItem?.childrens?.some(
                            (item) => item.path === route
                          ) ?? subItem.path === route,
                        subItemName: subItem.name,
                      }}
                    ></Menus>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </Menu>
        </div>
      </div>
      {dataGlobal?.NotiRun && (
        <Marquee
          direction="right"
          speed={70}
          gradient={false}
          className=" text-main"
          style={{
            height: "40px",
            fontSize: "20px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          <i className="fas fa-bullhorn mr-4 rotate-[-20deg]"></i>
          {dataGlobal?.NotiRun}
        </Marquee>
      )}
    </>
  );
};

type TMenu = {
  // router
  path: string;
  icon: string;
  name: string;
  childrens?: {
    path: string;
    name: string;
  }[];
  subItemName: string;

  // animation
  sidebarHovered: boolean;
  sidebarTabbar: boolean;
  activeRouter: boolean;
  dropdown: boolean;
  handleDropdown: () => void;
};

const Menus: FC<TMenu> = ({
  icon,
  sidebarHovered,
  name,
  path,
  childrens,
  activeRouter,
  dropdown,
  subItemName,
  handleDropdown,
  sidebarTabbar,
}) => {
  return (
    <div className="">
      <div onClick={handleDropdown} className={`${styles.item}`}>
        {!childrens?.length ? (
          <>
            <Link href={path}>
              <a className={clsx(styles.link, activeRouter && styles.active)}>
                {/* {
                  <span
                    className={`${styles.activeLine} ${
                      activeRouter ? "block" : "hidden"
                    }`}
                  ></span>
                } */}
                {/* <span className={clsx(styles.span)}>
                  <i className={clsx(icon, styles.icon)}></i>
                </span> */}
                <span className="flex items-center">
                  <span className={styles.title}>{name}</span>
                  {!!childrens?.length && (
                    <span className={styles.arrow}>
                      <img
                        src="/icon/menu-icon.png"
                        alt=""
                        className={styles.iconArrow}
                      />
                      {/* <i className="fal fa-angle-right"></i> */}
                    </span>
                  )}
                </span>
              </a>
            </Link>
          </>
        ) : (
          <a className={clsx(styles.link, activeRouter && styles.active)}>
            {/* {
              <span
                className={`${styles.activeLine} ${
                  activeRouter ? "block" : "hidden"
                }`}
              ></span>
            } */}

            {/* <span className={clsx(styles.span)}>
              <i className={clsx(icon, styles.icon)}></i>
            </span> */}
            <span className="flex items-center">
              <span className={styles.title}>{name}</span>
              {!!childrens?.length && (
                <span
                  className={clsx(
                    styles.arrow
                    // ((sidebarHovered && activeRouter) ||
                    //   (dropdown && sidebarHovered)) &&
                    //   "rotate-90"
                  )}
                >
                  {/* <i className="fal fa-angle-right"></i> */}
                  <img
                    src="/icon/menu-icon.png"
                    alt=""
                    className={styles.iconArrow}
                  />
                </span>
              )}
            </span>
          </a>
        )}
        {!!childrens?.length && (
          <ul
            className={`${styles.dropdown} absolute`}
            style={{
              height: dropdown && sidebarHovered ? 39 * childrens.length : 0,
            }}
          >
            {childrens.map((children) => (
              <li key={children.name} className={`${styles.item}`}>
                <Link href={children.path}>
                  <a className={clsx(styles.link)}>
                    <span className={`${styles.title}`}>{children.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
