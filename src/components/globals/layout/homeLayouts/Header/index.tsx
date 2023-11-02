import { Avatar as AvatarAntd, Card, Image, Popover, Tooltip } from "antd";
import clsx from "clsx";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { default as AvatarName } from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { config, socialList } from "~/configs";
import {
  RootState,
  logOut,
  selectConnection,
  selectFirstPageDashboard,
  useAppSelector,
} from "~/store";
import { _format } from "~/utils";
import Navbar from "../Navbar";
import styles from "./index.module.css";
// import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const UserControl = ({ user, setOpenModal, firstPage, connection }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.userControl}>
      {!user?.Id ? (
        <div className="login-user flex items-center justify-end ml-4">
          <a
            className={styles.headerTopLinkNotAuth}
            onClick={() => setOpenModal("register")}
          >
            Đăng ký
          </a>
          <a
            className={styles.headerTopLinkNotAuth}
            onClick={() => setOpenModal("signIn")}
          >
            Đăng nhập
          </a>
        </div>
      ) : (
        <Popover
          trigger={"click"}
          placement="bottomRight"
          content={
            <Card
              bodyStyle={{ padding: "8px" }}
              headStyle={{ padding: "0 12px" }}
              extra={
                <div className={styles.head}>
                  <span className={styles.icon}>
                    {user?.AvatarIMG ? (
                      <AvatarAntd
                        src={user?.AvatarIMG}
                        className="!rounded-[4px]"
                      />
                    ) : (
                      <AvatarName
                        name={user?.UserName}
                        size={"40px"}
                        textSizeRatio={2}
                      />
                    )}
                  </span>
                  <span className={styles.headInfo}>
                    <span className="flex justify-between items-center">
                      <Tooltip title="Quyền hạn của bạn">
                        <span className="font-bold text-sec">
                          {user?.UserGroupName}
                        </span>
                      </Tooltip>
                      <Tooltip title="Cấp độ VIP của bạn">
                        <span className="text-white ml-4 bg-main py-1 px-2 leading-[initial] rounded-[4px] text-[10px] font-bold">
                          VIP {user?.LevelId}
                        </span>
                      </Tooltip>
                    </span>
                    <Tooltip
                      title="Số dư ví của bạn (VNĐ)"
                      className="flex justify-between items-center text-main"
                    >
                      <i className="fas fa-wallet !text-[14px]"></i>
                      <span className="ml-4">
                        {user?.Wallet !== 0
                          ? _format.getVND(user?.Wallet, " ")
                          : "--"}
                      </span>
                    </Tooltip>
                  </span>
                </div>
              }
              actions={[
                <div
                  className={clsx(styles.bodyItem, styles.logOutButton)}
                  onClick={() => {
                    connection &&
                      connection.invoke(
                        "leave",
                        user.UserId.toString(),
                        user.UserGroupId.toString()
                      );
                    Cookies.remove(config.tokenName);
                    dispatch(logOut());
                  }}
                >
                  <a href="#">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Đăng xuât</span>
                  </a>
                </div>,
              ]}
            >
              <div className={styles.body}>
                <ul className={styles.bodyList}>
                  <Link href={user?.UserGroupId === 2 ? "/user" : firstPage}>
                    <li className={clsx(styles.bodyItem, styles.bodyItemPage)}>
                      <a>
                        <i className="fas fa-user-shield"></i>
                        <span>Quản trị</span>
                      </a>
                    </li>
                  </Link>

                  <Link href="/user/cart">
                    <li className={clsx(styles.bodyItem, styles.bodyItemCart)}>
                      <a>
                        <i className="fa fa-shopping-cart"></i>
                        <span>Giỏ hàng</span>
                      </a>
                    </li>
                  </Link>
                </ul>
              </div>
            </Card>
          }
        >
          <div
            className={clsx(
              "relative group ml-4  cursor-pointer",
              styles.hoverInfo
            )}
          >
            {/* <Link href={firstPage ? firstPage : "/user"}> */}
            <span className="uppercase font-semibold flex text !text-main login-user items-center">
              <i className="text-main text fas fa-user mr-2"></i>
              <div>{user?.UserName || "Anonymus"} </div>
            </span>
            {/* </Link> */}
          </div>
        </Popover>
      )}
    </div>
  );
};

const Header = ({ dataMenu }) => {
  const firstPage = useAppSelector(selectFirstPageDashboard);
  const connection = useAppSelector(selectConnection);
  const [openModal, setOpenModal] = useState("");

  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal
  );
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurrentInfo
  );

  // if (dataConfig) {
  //   socialList?.forEach((social) => (social.link = dataConfig[social.title]));
  // }

  const handleSetTarget = useCallback((target) => setOpenModal(target), []);

  return (
    <>
      <header className={`${styles.fixed} `}>
        <div className={styles.headerTop}>
          <div className="container">
            <div className={styles.headerTopInner}>
              <div className={styles.headerTopLeft}>
                <div className="mr-3 w-fit flex">
                  <span className="text-white">Tỷ giá:</span>
                  <span
                    className={clsx(
                      styles.headerTopLinkAuth,
                      styles.headerTopLinkAuthRecharge
                    )}
                  >
                    1¥ = {_format.getVND(dataGlobal?.Currency)}
                  </span>
                </div>
                <div className="mr-3 w-fit flex">
                  <span className="text-white">Hotline:</span>
                  <Link href={`tel:+${dataGlobal?.Hotline}`}>
                    <a className={styles.headerTopLinkAuth}>
                      {dataGlobal?.Hotline}
                    </a>
                  </Link>
                </div>
                <div className="mr-3 w-fit hidden md:hidden xl:flex">
                  <span className="text-white">Email:</span>
                  <Link href={`mailto:${dataGlobal?.EmailContact}`}>
                    <a className={styles.headerTopLinkAuth}>
                      {dataGlobal?.EmailContact}
                    </a>
                  </Link>
                </div>
              </div>
              <div className={styles.headerTopRight}>
                <div className={`${styles.socialHeader}`}>
                  {socialList.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Link href={item?.link ?? "/"}>
                          <a
                            style={{ display: !item?.link && "none" }}
                            className={styles.aLink}
                            target="_blank"
                          >
                            <span className={styles.boxCial}>
                              {item.icon ? (
                                <i className={`${item?.icon} text-[12px]`}></i>
                              ) : (
                                <div
                                  style={{
                                    backgroundImage: `url(${item.imgSrc})`,
                                    width: "100%",
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                ></div>
                              )}
                            </span>
                          </a>
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </div>
                <UserControl
                  {...{
                    user: userCurrentInfo,
                    setOpenModal,
                    firstPage,
                    connection,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <div className="container">
            <div className="justify-between flex items-center ">
              <div className={clsx(styles.left, "block lg:hidden xl:block")}>
                <Link href="/">
                  <a className="flex items-center">
                    <div className={styles.logo}>
                      <Image
                        src={dataGlobal?.LogoIMG || "/default/default_logo.png"}
                        alt=""
                        width={"100%"}
                        height={"auto"}
                        preview={false}
                        style={{
                          paddingTop: 7,
                          filter: "drop-shadow(2px 4px 6px #ffffff08)",
                        }}
                      />
                    </div>
                  </a>
                </Link>
              </div>
              <div className="flex items-center w-full justify-between  lg:w-full lg:justify-center xl:w-fit xl:justify-right">
                <Navbar dataConfig={dataGlobal} dataMenu={dataMenu} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <SignInFormMemo
        setOpenModal={handleSetTarget}
        visible={openModal === "signIn" ? true : false}
      />
      <RegisterFormMemo
        setOpenModal={handleSetTarget}
        visible={openModal === "register" ? true : false}
      />
      <ForgotPasswordFormMemo
        setOpenModal={handleSetTarget}
        visible={openModal === "forgetPassword" ? true : false}
      /> */}
    </>
  );
};

export default Header;
