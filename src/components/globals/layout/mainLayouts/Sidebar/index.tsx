import { Menu, Popover } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useCallback, useState } from "react";
import { selectRouter, useAppSelector } from "~/store";
import styles from "./index.module.css";

type TProps = {
  hover: boolean;
  tabbar: boolean;
  handleHover: (bool: boolean) => void;
  handleTabbar: (bool: boolean) => void;
};

const Sidebar: FC<TProps> = ({ handleHover, hover, tabbar }) => {
  let menuRouter = useAppSelector(selectRouter);
  const [renderMenuRouter, setRenderMenuRouter] = useState(menuRouter);
  const { route } = useRouter();
  const [dropdown, setDropdown] = useState("");
  const handleDropdown = useCallback(
    (name: string) => setDropdown((dropdown) => (dropdown != name ? name : "")),
    []
  );

  return (
    <>
      <div
        className={clsx(
          styles.navigation,
          hover && styles.expand,
          tabbar && styles.show
        )}
      >
        <Menu className={clsx(styles.list)}>
          {renderMenuRouter?.map((item, index) => (
            <React.Fragment key={index}>
              {item.controllers?.map((subItem) => (
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
                      // handleHover,
                    }}
                  ></Menus>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </Menu>
      </div>
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
  handleHover: (bool: boolean) => void;
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
  handleHover,
}) => {
  return (
    <ul>
      <li onClick={handleDropdown} className={styles.item}>
        {!childrens?.length ? (
          <>
            {(!sidebarHovered && !sidebarTabbar && (
              // <Popover
              //   overlayStyle={{ borderRadius: 10 }}
              //   title={subItemName}
              //   placement="rightTop"
              //   content={
              //     <li key={name} className="w-fit p-2 font-bold text-base">
              //       <Link href={path}>
              //         <a className="popover-a flex items-center">
              //           <span className={styles.titleChild}>{name}</span>
              //         </a>
              //       </Link>
              //     </li>
              //   }
              // >
              <Link href={path} >
                <a className={clsx(styles.link, activeRouter && styles.active)}>
                  <span className={clsx(styles.span)}>
                    <i className={clsx(icon, styles.icon)}></i>
                  </span>
                  <span className={styles.title}>{name}</span>
                  {!!childrens?.length && (
                    <span
                      className={clsx(
                        styles.arrow,
                        ((sidebarHovered && activeRouter) ||
                          (dropdown && sidebarHovered)) &&
                          "rotate-90"
                      )}
                    >
                      <i className="fas fa-angle-right"></i>
                    </span>
                  )}
                </a>
              </Link>
              // </Popover>
            )) || (
              <Link href={path === "javascript;" ? null : path}>
                <a
                  className={clsx(styles.link, activeRouter && styles.active)}
                  onClick={(e) => {
                    e.currentTarget
                      .closest("ul.ant-menu")
                      .querySelectorAll("a")
                      .forEach((item) => {
                        item.classList.remove(`${styles.active}`);
                        // handleHover(false);
                      });
                  }}
                >
                  <span className={clsx(styles.span)}>
                    <i className={clsx(icon, styles.icon)}></i>
                  </span>
                  <span className={styles.title}>{name}</span>
                  {!!childrens?.length && (
                    <span className={styles.arrow}>
                      <i className="fas fa-angle-right"></i>
                    </span>
                  )}
                </a>
              </Link>
            )}
          </>
        ) : (
          <>
            {(!sidebarHovered && !sidebarTabbar && (
              <Popover
                overlayStyle={{ borderRadius: 10 }}
                title={subItemName}
                placement="rightTop"
                content={childrens?.map((children) => (
                  <li
                    key={children.name}
                    className="w-fit my-2 font-bold text-base"
                  >
                    <Link href={children.path}>
                      <a className="popover-a flex items-center">
                        <span className={clsx(styles.titleChild)}>
                          {children.name}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              >
                <a className={clsx(styles.link, activeRouter && styles.active)}>
                  <span className={clsx(styles.span)}>
                    <i className={clsx(icon, styles.icon)}></i>
                  </span>
                  <span className={styles.title}>{name}</span>
                  {!!childrens?.length && (
                    <span
                      className={clsx(
                        styles.arrow,
                        ((sidebarHovered && activeRouter) ||
                          (dropdown && sidebarHovered)) &&
                          "rotate-90"
                      )}
                    >
                      <i className="fas fa-angle-right"></i>
                    </span>
                  )}
                </a>
              </Popover>
            )) || (
              // activeRouter && styles.active
              <a className={clsx(styles.link)}>
                <span className={clsx(styles.span)}>
                  <i className={clsx(icon, styles.icon)}></i>
                </span>
                <span className={styles.title}>{name}</span>
                {!!childrens?.length && (
                  <span
                    className={clsx(
                      styles.arrow,
                      ((sidebarHovered && activeRouter) ||
                        (dropdown && sidebarHovered)) &&
                        "rotate-90"
                    )}
                  >
                    <i className="fas fa-angle-right"></i>
                  </span>
                )}
              </a>
            )}
          </>
        )}
        {!!childrens?.length && (
          <ul
            className={styles.dropdown}
            style={{
              height:
                (sidebarHovered && activeRouter) || (dropdown && sidebarHovered)
                  ? 32 * childrens.length
                  : 0,
            }}
          >
            {childrens.map((children) => (
              <li key={children.name} className={styles.item}>
                <Link href={children.path}>
                  <a
                    className={clsx(styles.link)}
                    id={children.path}
                    onClick={(e) => {
                      e.currentTarget
                        .closest("ul.ant-menu")
                        .querySelectorAll("a")
                        .forEach((item) => {
                          item.classList.remove(`${styles.active}`);
                        });
                      e.currentTarget.classList.add(`${styles.active}`);
                      // handleHover(false);
                    }}
                  >
                    {/* <i
                      className={clsx("fas fa-play", styles.icon)}
                      style={{ fontSize: 6, textAlign: "center" }}
                    ></i> */}
                    <span className={styles.titleChild}>{children.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default Sidebar;
