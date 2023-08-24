import { Button, Drawer, Dropdown, Grid, Image, Menu } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

// const activeMenuStyle =
//   'font-bold after:content-[""] after:absolute after:top-[96%] after:left-[0px] after:w-[100%] after:h-[4px] after:bg-[#383838]';

const { useBreakpoint } = Grid;

const handleSetMenu = (dataMenu) => {
  if (!dataMenu) return;
  const newDataMenu = dataMenu.map((menu) => {
    if (menu?.Children < 0) return menu;
    const newChildren = [];

    for (let i in menu?.Children) {
      if (menu.Children[i].Active) {
        newChildren.push(menu.Children[i]);
      }
    }

    return {
      ...menu,
      Children: newChildren,
    };
  });

  return newDataMenu;
};

type TProps = {
  dataConfig?: any;
  dataMenu;
};

const Navbar = ({ dataConfig, dataMenu }: TProps) => {
  const { sm, md, lg } = useBreakpoint();
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState(
    Number(localStorage.getItem("PageTypeId"))
  );
  const [visible, setVisible] = useState(false);
  const [newMenu, setNewMenu] = useState(handleSetMenu(dataMenu));

  useEffect(() => {
    if (!dataMenu) return;
    setNewMenu(handleSetMenu(dataMenu));
  }, [dataMenu]);

  useEffect(() => {
    if (Number(localStorage.getItem("PageTypeId"))) {
      setActiveMenu(Number(localStorage.getItem("PageTypeId")))
    }
  }, [localStorage.getItem("PageTypeId")])


  return (
    <React.Fragment>
      <div className={styles.mobileHidden}>
        <ul className={styles.MenuList}>
          <li
            key={"trang-chu"}
            className={`${
              router?.asPath === "/" && styles.activeMenuStyle
            }`}
            onClick={() => {
              localStorage.setItem("PageTypeId", "0");
              router.push("/");
            }}
          >
            <a>Trang chủ</a>
            {
              <span
                className={`${styles.activeLine} ${
                  router?.asPath === "/" ? "block" : "hidden"
                }`}
              ></span>
            }
          </li>
          {newMenu?.map((item) => {
            return item?.Children.length <= 0 ? (
              <React.Fragment key={item?.Id}>
                <li
                  key={item?.Name}
                  className={`${
                    router?.asPath !== "/" &&
                    activeMenu === item?.PageTypeId &&
                    styles.activeMenuStyle
                  }`}
                  onClick={() => {
                    localStorage.setItem("PageTypeId", item?.PageTypeId);
                    router.push({
                      pathname: "/chuyen-muc/",
                      query: `code=${item?.Link}`,
                    });
                  }}
                >
                  <a>{item?.Name}</a>
                  {
                    <span
                      className={`${styles.activeLine} ${`${
                        router?.asPath !== "/" &&
                        activeMenu === item?.PageTypeId
                          ? "block"
                          : "hidden"
                      }`}`}
                    ></span>
                  }
                </li>
              </React.Fragment>
            ) : (
              <Dropdown
                overlay={
                  <Menu>
                    {item?.Children.map((child) => (
                      <Menu.Item key={child?.Id}>
                        <a
                          onClick={() => {
                            // router.push({
                            //   pathname: `/chuyen-muc/detail/?code=${}`
                            // })
                            localStorage.setItem("PageTypeId", child?.Id);
                          }}
                        >
                          {child?.Name}
                        </a>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                key={item?.Id}
              >
                <li
                  key={item?.Name}
                  className={`${
                    activeMenu === item?.PageTypeId && styles.activeMenuStyle
                  }`}
                  onClick={() => {
                    router.push({
                      pathname: "/chuyen-muc/",
                      query: `code=${item?.Link}`,
                    });
                    // router.push(`/chuyen-muc/${item?.Code}`);
                  }}
                >
                  <a>{item?.Name} ---</a>
                  {/* {
                    <span
                      className={`${styles.activeLine} ${`${
                        targetCode === item?.Code ? "block" : "hidden"
                      }`}`}
                    ></span>
                  } */}
                </li>
              </Dropdown>
            );
          })}
        </ul>
      </div>
      <div className={`${styles.mobileVisible} ${styles.mobile}`}>
        <Button className={styles.bgColor} onClick={() => setVisible(true)}>
          <i className="fas fa-bars"></i>
        </Button>
        {/* `${dataConfig?.CompanyLongName}` */}
        <Drawer
          title={
            <Image
              src={`${dataConfig?.LogoIMG}`}
              preview={false}
              width={"60%"}
            />
          }
          placement="left"
          width={300}
          onClose={() => setVisible(false)}
          visible={visible}
          closable={false}
          style={{ zIndex: "10000000" }}
        >
          <Menu className={styles.MenuList} mode={lg ? "horizontal" : "inline"}>
            <Menu.Item
              key={"Trang chủ"}
              eventKey={"Trang chủ"}
              // className={`${targetCode === "" && styles.activeMenuStyle}`}
              onClick={() => {
                router.push("/");
              }}
            >
              <a>Trang chủ</a>
            </Menu.Item>
            {newMenu?.map((item) => (
              <Menu.Item
                eventKey={item?.Name}
                key={item?.Name}
                // className={`${
                //   targetCode === item?.Name && styles.activeMenuStyle
                // }`}
                onClick={() => {
                  router.push({
                    pathname: "/chuyen-muc",
                    query: { code: item?.Code },
                  });
                  // router.push(`/chuyen-muc/${item?.Link}`);
                }}
              >
                <a>{item?.Name}</a>
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
