import { Image, Avatar as AvatarAntd, Tooltip } from "antd";
import clsx from "clsx";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { user as userApi } from "~/api";
import { default as AvatarName } from "react-avatar";
import {
  ForgotPasswordForm,
  RegisterForm,
  SignInForm,
} from "~/components/screens/auth";
import { getLevelId, socialList } from "~/configs";
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
import { useDispatch, useSelector } from "react-redux";
// import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const UserControl = ({
  dataUser,
  user,
  isLogOut,
  setOpenModal,
  firstPage,
  connection,
}) => {
  const dipatch = useDispatch();

  return (
    <div className={styles.userControl}>
      {!user?.UserId || isLogOut === null ? (
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
        <div className={clsx("relative group ml-4", styles.hoverInfo)}>
          <Link href={firstPage ? firstPage : "/user"}>
            <a className="uppercase font-semibold flex text !text-main login-user items-center">
              <i className="text-main text fas fa-user mr-2"></i>
              <div>{user?.UserName || "Anonymus"} </div>
            </a>
          </Link>
          <div className={clsx(styles.userInfoWrapper)}>
            <div className={styles.head}>
              <span className={styles.icon}>
                {dataUser?.Data?.AvatarIMG ? (
                  <AvatarAntd
                    src={dataUser?.Data?.AvatarIMG}
                    className="!rounded-[4px]"
                  />
                ) : (
                  <AvatarName
                    name={dataUser?.Data?.UserName}
                    size={"40px"}
                    textSizeRatio={2}
                  />
                )}
              </span>
              <span className={styles.headInfo}>
                <span className="flex justify-between items-center">
                  <Tooltip title="Quyền hạn của bạn">
                    <span className="font-bold text-sec">
                      {dataUser?.Data?.UserGroupName}
                    </span>
                  </Tooltip>
                  <Tooltip title="Cấp độ VIP của bạn">
                    <span className="text-white bg-main py-1 px-2 leading-[initial] rounded-[4px] text-[10px] font-bold">
                      VIP {dataUser?.Data?.LevelId}
                    </span>
                  </Tooltip>
                </span>
                <Tooltip
                  title="Số dư ví của bạn (VNĐ)"
                  className="flex justify-between items-center text-main"
                >
                  <i className="fas fa-wallet !text-[14px]"></i>
                  <span>
                    {dataUser?.Data?.Wallet !== 0
                      ? _format.getVND(dataUser?.Data?.Wallet, " ")
                      : "--"}
                  </span>
                </Tooltip>
              </span>
            </div>
            <div className={styles.body}>
              <ul className={styles.bodyList}>
                <Link href={user?.UserGroupId === 2 ? "/user" : firstPage}>
                  <li className={clsx(styles.bodyItem, styles.bodyItemPage)}>
                    <a>
                      <i className="fas fa-toolbox"></i>
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

                <li
                  className={clsx(styles.bodyItem, styles.logOutButton)}
                  onClick={() => {
                    connection &&
                      connection.invoke(
                        "leave",
                        user.UserId.toString(),
                        user.UserGroupId.toString()
                      );
                    localStorage.removeItem("currentUser");
                    Cookies.remove("tokenNHTQ-demo");
                    dipatch(logOut)
                    window.location.reload();
                  }}
                >
                  <a href="#">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Đăng xuât</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Header = ({ dataConfig, dataMenu }) => {
  const router = useRouter();
  const isLogOut = localStorage.getItem("currentUser");
  const user = useAppSelector((state) => state.user.current);
  const userId = user?.UserId;
  const firstPage = useAppSelector(selectFirstPageDashboard);
  const connection = useAppSelector(selectConnection);
  const [openModal, setOpenModal] = useState("");

  // const userCurrentInfo: TUser = useSelector(
  //   (state: RootState) => state.userCurretnInfo
  // );

  // console.log(userCurrentInfo);

  if (dataConfig) {
    socialList?.forEach((social) => (social.link = dataConfig[social.title]));
  }

  // const { data: dataUser } = useQuery(
  //   ["clientData", userId],
  //   () => userApi.getByID(userId),
  //   {
  //     refetchOnReconnect: false,
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //     enabled: !!userId && isLogOut !== null,
  //   }
  // );

  // Handling scroll effect
  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback((e) => setY(window.scrollY), [y]);

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <>
      <header className={`${styles.fixed} `}>
        <div
          className={clsx(
            styles.headerTop,
            `${y > 0 ? styles.headerTopHidden : ""}`
          )}
        >
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
                    1¥ = {_format.getVND(dataConfig?.Currency, "")}
                  </span>
                </div>
                <div className="mr-3 w-fit flex">
                  <span className="text-white">Hotline:</span>
                  <Link href={`tel:+${dataConfig?.Hotline}`}>
                    <a className={styles.headerTopLinkAuth}>
                      {dataConfig?.Hotline}
                    </a>
                  </Link>
                </div>
                <div className="mr-3 w-fit hidden md:hidden xl:flex">
                  <span className="text-white">Email:</span>
                  <Link href={`mailto:${dataConfig?.EmailContact}`}>
                    <a className={styles.headerTopLinkAuth}>
                      {dataConfig?.EmailContact}
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
                    dataUser: null,
                    user,
                    isLogOut,
                    setOpenModal,
                    firstPage,
                    connection,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.headerBottom} ${
            y >= 100 && styles.headerBottomChange
          }`}
        >
          <div className="container">
            <div className="justify-between flex items-center ">
              <div className={clsx(styles.left, "block lg:hidden xl:block")}>
                <Link href="/">
                  <a className="flex items-center">
                    <div className={styles.logo}>
                      <Image
                        src={dataConfig?.LogoIMG || "/default/default_logo.png"}
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
                <Navbar dataConfig={dataConfig} dataMenu={dataMenu} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <SignInForm
        setOpenModal={(target) => setOpenModal(target)}
        visible={openModal === "signIn" ? true : false}
      />
      <RegisterForm
        setOpenModal={(target) => setOpenModal(target)}
        visible={openModal === "register" ? true : false}
      />
      <ForgotPasswordForm
        setOpenModal={(target) => setOpenModal(target)}
        visible={openModal === "forgetPassword" ? true : false}
      />
    </>
  );
};

export default Header;
