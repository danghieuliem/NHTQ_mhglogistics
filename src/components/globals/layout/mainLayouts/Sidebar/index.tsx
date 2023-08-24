import { Menu } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { userRouter } from "~/configs/routers";
import { selectRouter, useAppSelector } from "~/store";
import styles from "./index.module.css";
const { SubMenu } = Menu;

export type TProps = {
  hover: boolean;
  tabbar: boolean;
  userPage?: boolean;
};

const Sidebar: FC<TProps> = ({ userPage, hover }) => {
  let menuRouter = useAppSelector(selectRouter);
  const router = useRouter();

  let renderMenuRouter = userPage ? userRouter : menuRouter;

  if (window.innerWidth < 1200) {
    renderMenuRouter = userRouter;
  }

  const [activekey, setActiveKey] = useState([]);

  const [activeRouter, setActiveRouter] = useState([""]);

  const handleActiveKey = (name: string) => {
    const indexKey = activekey.indexOf(name);
    if (indexKey === -1) {
      setActiveKey([...activekey, name]);
    } else {
      activekey.splice(indexKey, 1);
      setActiveKey([...activekey]);
    }
  };

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
      {renderMenuRouter?.map((menuParent, index) => (
        <div key={menuParent?.Title} className={styles.menuWrapper}>
          <div className={styles.mainTitle}>
            <span className="mr-2"><i className={menuParent?.Icon}></i></span>
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
                      activeRouter[0].match(child?.Path) &&
                        styles.childLabelActive
                    )}
                  >
                    <Link
                      href={child.Path}
                      key={clsx(child?.Path, "-item")}
                      passHref
                    >
                      <a target="_blank">
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
                          activeRouter[0].match(item?.Path) &&
                            styles.subLabelActive
                        )}
                      >
                        <Link href={item.Path}>
                          <a target="_blank">
                            {/* <i className="fal fa-long-arrow-alt-right"></i> */}
                            <i className="fas fa-dot-circle"></i>
                            <span>{item?.Label}</span>
                            <br />
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
