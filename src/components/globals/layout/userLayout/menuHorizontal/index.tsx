import { Popover } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { userRouter } from "~/configs/routers";
import styles from "./index.module.css";

export const MenuHorizontal: FC<{}> = ({}) => {
  const router = useRouter();
  const renderMenuRouter: any = userRouter;

  const [activeKey, setActiveKey] = useState([]);

  const [activeRouter, setActiveRouter] = useState([""]);

  const handleActiveKey = (name: string) => {
    const indexKey = activeKey.indexOf(name);

    if (indexKey === -1) {
      setActiveKey([...activeKey, name]);
    } else {
      activeKey.splice(indexKey, 1);
      setActiveKey([...activeKey]);
    }
  };

  useEffect(() => {
    setActiveRouter([router?.asPath]);
    setActiveKey([]);

    for (let i in renderMenuRouter) {
      for (let x in renderMenuRouter[i].Children) {
        if (renderMenuRouter[i].Children[x]?.SubChildren) {
          for (let z in renderMenuRouter[i].Children[x]?.SubChildren) {
            if (
              router?.asPath.match(
                renderMenuRouter[i].Children[x]?.SubChildren[z].Path
              )
            ) {
              setActiveKey([renderMenuRouter[i].Children[x]?.Label]);
              break;
            }
          }
        }
      }
    }
  }, [router.asPath]);

  return (
    <>
      <div className={clsx(styles.navigation)}>
        <div className="component-container">
          <nav className={styles.userNav}>
            {renderMenuRouter?.map((menuParent) => (
              <div key={menuParent?.Title}>
                {menuParent?.Children.map((child) => {
                  if (!child?.SubChildren) {
                    return (
                      <div
                        key={clsx(child?.Path, "-item")}
                        className={clsx(
                          styles.liItem,
                          activeRouter[0] === child?.Path && styles.liItemActive
                        )}
                      >
                        <Link
                          href={child.Path}
                          key={clsx(child?.Path, "-item")}
                          passHref
                        >
                          <a>
                            <span>{child?.Label}</span>
                          </a>
                        </Link>
                      </div>
                    );
                  } else {
                    return (
                      <Popover
                        trigger={"hover"}
                        key={clsx(child?.Path, "-item")}
                        content={() => (
                          <div className={styles.subMenu}>
                            {child?.SubChildren.map((item) => {
                              return (
                                <div
                                  className={clsx(
                                    styles.subMenu,
                                    activeRouter[0] === item?.Path &&
                                      styles.subMenuActive
                                  )}
                                  key={clsx(item?.Label, "-subItem")}
                                >
                                  <Link href={item.Path}>
                                    <a>
                                      <span>{item?.Label}</span>
                                    </a>
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      >
                        <div
                          className={clsx(
                            styles.liItem,
                            activeKey[0]?.match(child?.Label) &&
                              styles.liItemActive
                          )}
                        >
                          <a>
                            {/* <i className={child?.Icon}></i> */}
                            <span>{child?.Label}</span>
                            <i
                              className={clsx(
                                styles.dropdownIcon,
                                "fas fa-chevron-square-down"
                              )}
                            ></i>
                          </a>
                        </div>
                      </Popover>
                    );
                  }
                })}
              </div>
            ))}
          </nav>
        </div>
      </div>
      {/* {dataGlobal?.NotiRun && (
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
      )} */}
    </>
  );
};
