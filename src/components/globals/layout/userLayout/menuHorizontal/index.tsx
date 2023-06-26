import { Card, Popover } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { userRouter } from "~/configs/routers";
import styles from "./index.module.css";

export const MenuHorizontal: FC<{}> = ({}) => {
  const router = useRouter();
  const renderMenuRouter = userRouter;
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
    <>
      <div className={clsx(styles.navigation)}>
        <div className="component-container">
          <nav className={styles.userNav}>
            {userRouter.map((menu, index) =>
              menu?.childrens.length === 1 ? (
                <div
                  key={clsx(menu?.icon, index, menu?.name)}
                  className={clsx(
                    styles.inner,
                    menuActive?.name === menu?.name && styles.innerActive
                  )}
                  onClick={() => router.push(menu?.path)}
                >
                  <div className={styles.name}>{menu?.name}</div>
                </div>
              ) : (
                <Popover
                  placement="bottomLeft"
                  key={clsx(menu?.icon, index, menu?.name, "popover-key")}
                  className="!border-none"
                  content={
                    <div className="bg-main rounded-[6px] p-2" key={clsx('popover-key-content-', menu?.name)}>
                      {menu?.childrens.map((menuChild) => (
                        <ul
                          key={clsx(menuChild?.name, menu?.path)}
                          className={clsx(styles.ulMenuList)}
                        >
                          <li>
                            <Link href={menuChild?.path}>
                              <a
                                className={clsx(
                                  styles.PopoverliMenuItem,
                                  router?.asPath === menuChild?.path &&
                                    styles.PopoverliMenuItemActive
                                )}
                              >
                                {menuChild?.name}
                              </a>
                            </Link>
                          </li>
                        </ul>
                      ))}
                    </div>
                  }
                >
                  <div
                    className={clsx(
                      styles.inner,
                      menuActive?.name === menu?.name && styles.innerActive
                    )}
                    onClick={() => router.push(menu?.path)}
                  >
                    <div
                      key={clsx(menu?.icon, index, menu?.name)}
                      className={styles.name}
                    >
                      {menu?.name}
                    </div>
                    {menu?.childrens.length > 1 && (
                      <i
                        className={clsx(
                          styles.dropdown,
                          "fas fa-chevron-square-down"
                        )}
                      ></i>
                    )}
                  </div>
                </Popover>
              )
            )}
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
