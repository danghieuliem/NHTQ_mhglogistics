import { Avatar as AvatarAntd, Divider, Image, Popover } from "antd";
import clsx from "clsx";
import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
import { default as AvatarName } from "react-avatar";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAllNewNotify } from "~/api";
import { showToast } from "~/components";
import { getLevelId } from "~/configs";
import {
  RootState,
  selectConnection,
  selectFirstPageDashboard,
  useAppSelector,
} from "~/store";
import { _format } from "~/utils";
import Notification from "./box/Notification";
import styles from "./index.module.css";

type TProps = {
  tabbar: boolean;
  handleTabbar: (bool: boolean) => void;
  hover: boolean;
  handleHover: (bool: boolean) => void;
  userPage?: boolean;
};

const Header: React.FC<TProps> = ({
  hover,
  handleTabbar,
  handleHover,
  userPage,
}) => {
  const userNew = useAppSelector((state) => state.user.current);
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);
  const ids = useAppSelector((state) => state?.user?.current)?.UserId;
  const firstPage = useAppSelector(selectFirstPageDashboard);
  const connection = useAppSelector(selectConnection);
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );

  const { reset } = useForm<TUser>({
    mode: "onBlur",
  });

  // const connectionId = connection?.connectionId;

  const { data: dataNewNotify } = useQuery(
    ["new-notification"],
    () =>
      getAllNewNotify
        .getAll({
          OfEmployee: userPage ? false : true,
        })
        .then((res) => {
          return res?.Data;
        }),
    {
      onError: (error) => {
        showToast({
          title: "Đã xảy ra lỗi!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
      enabled: !!userNew,
      retry: false,
    }
  );

  // useEffect(() => {
  //   if (!connectionId) return;
  //   connection.on("send-notification", (noti) => {
  //     return dataList.unshift(noti);
  //   });
  // }, [connectionId]);

  return (
    <header className={clsx(styles.header)}>
      <div
        className={clsx(
          userPage ? styles.innerHeaderUser : styles.innerHeaderManager
        )}
      >
        <div className="flex ">
          {window.innerWidth <= 1280 && userPage && (
            <div
              className={clsx(styles.wrapper, styles.openMenu)}
              onClick={() => handleHover(!hover)}
            >
              {/* <i className="fas fa-align-left"></i> */}
              <img src="/icon/menu-bars.png" />
            </div>
          )}

          {!userPage && (
            <div
              className={clsx(styles.wrapper, styles.openMenu)}
              onClick={() => handleHover(!hover)}
            >
              <img src="/icon/menu-bars.png" />
            </div>
          )}

          <div className={`hidden md:block pl-[15px]`}>
            <div className={clsx(styles.img, "w-[12rem]")}>
              <Link href="/">
                <a className={clsx(styles.logo, "flex items-center")}>
                  <Image
                    src={dataGlobal?.LogoIMG}
                    width={"100%"}
                    height={"100%"}
                    alt="logo"
                    style={{ filter: "unset" }}
                    preview={false}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Tỉ giá + ví dư */}
        <div
          className={clsx(
            styles.wrapper,
            "!hidden lg:!flex flex-1 !justify-end lg:justify-center"
          )}
        >
          <div className={`col-span-1 items-center xl:!flex ${styles.item}`}>
            <div
              className={`xl:flex items-center rounded-md px-2 ${styles.block}`}
            >
              <span className="!mr-1 text-black text-[12px] font-normal">
                Tỉ giá:
              </span>
              <span className="!font-bold xl:!text-[12px] !text-xs flex items-center !text-main">
                1¥ = {_format.getVND(dataGlobal?.Currency, " VNĐ")}
              </span>
            </div>
          </div>
          {userPage && (
            <div
              className={clsx(styles.item, "col-span-1  items-center xl:!flex")}
            >
              <div
                className={clsx(
                  styles.block,
                  "xl:flex items-center rounded-md px-2"
                )}
              >
                <span className="!mr-1 text-[12px] font-normal text-black">
                  Số dư:
                </span>
                <span className="font-bold xl:text-[12px] text-xs flex items-center text-main">
                  {userCurrentInfo?.Wallet !== 0
                    ? _format.getVND(userCurrentInfo?.Wallet)
                    : "0 VNĐ"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div
          className={clsx(
            styles.wrapper,
            hover &&
              userPage &&
              window.innerWidth <= 768 &&
              "!w-0 !overflow-hidden"
          )}
        >
          {/* button direct */}
          <li className={clsx(styles.block, "col-span-1 font-bold")}>
            {userPage === true && userNew?.UserGroupId !== 2 && (
              <Link href={firstPage}>
                <a className={clsx(styles.btnSwitchManager)}>
                  {window.innerWidth >= 520 ? (
                    <span className="">MANAGER</span>
                  ) : (
                    <i className="fas fa-user-shield"></i>
                  )}
                </a>
              </Link>
            )}
            {userPage !== true && (
              <Link href="/user">
                <a className={clsx(styles.btnSwitchManager)}>
                  {window.innerWidth >= 520 ? (
                    <span className="">USER</span>
                  ) : (
                    <i className="fas fa-user"></i>
                  )}
                </a>
              </Link>
            )}
          </li>

          {/* VIP */}
          {userPage && (
            <li
              className={clsx(
                styles.block,
                "!hidden md:!flex items-center text-[12px] mr-2"
              )}
            >
              <span className={styles.VIP}>{getLevelId[userCurrentInfo?.LevelId]?.Name}</span>
            </li>
          )}

          {/* Thông báo */}
          <Popover
            trigger={"click"}
            placement="bottomRight"
            content={
              <div className="flex flex-col items-center">
                <div className={styles.totalNotiButton}>
                  <div className="text-sec text-md font-semibold">
                    Thông báo!
                  </div>
                  <div>
                    <Link
                      href={`${
                        userPage === true ? "/user" : "/manager"
                      }/notification`}
                    >
                      <a>Xem tất cả</a>
                    </Link>
                  </div>
                </div>
                <div
                  className={clsx(
                    !hover ? "w-[400px]" : "w-[300px]",
                    "h-[400px] overflow-hidden border-1 border-solid border-main"
                  )}
                >
                  <Notification userPage={userPage} UID={ids} />
                </div>
              </div>
            }
          >
            <button className="relative">
              <div
                className={clsx(styles.item, "col-span-1 cursor-pointer flex")}
              >
                <div className={clsx(styles.block, styles.actionInfo, "!flex")}>
                  <div
                    className={`text-[20px] text-black ${
                      dataNewNotify > 0 && styles.bellIcon
                    }`}
                  >
                    <i className="fal fa-bell"></i>
                  </div>
                  {dataNewNotify > 0 && (
                    <div
                      className={`text-[10px] items-center flex bg-red rounded-[8px] absolute px-[6px] top-[50%] left-[50%] translate-y-[-90%]`}
                    >
                      <span className="items-center flex text-[#fff]">
                        {dataNewNotify > 100 ? "100+" : dataNewNotify}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </Popover>

          <Divider
            type="vertical"
            className={clsx(
              "bg-main h-3",
              dataNewNotify > 100 ? "!ml-6" : "ml-auto"
            )}
          />

          {/* thông tin người dùng */}
          <Popover
            trigger={"click"}
            placement="bottomRight"
            content={
              <div className={styles.profileWrapper}>
                <Link href="/user/info-users">
                  <a className={clsx(styles.profileLink, styles.btnAccount)}>
                    <i className="fas fa-user-cog"></i>
                    <span>Tài khoản</span>
                  </a>
                </Link>
                <Link href="/">
                  <a
                    className={clsx(styles.profileLink, styles.btnLogout)}
                    onClick={async () => {
                      connection &&
                        (await connection.invoke(
                          "leave",
                          userNew.UserId.toString(),
                          userNew.UserGroupId.toString()
                        ));
                      localStorage.removeItem("currentUser");
                      Cookies.remove("tokenNHTQ-demo");
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Đăng xuất</span>
                  </a>
                </Link>
              </div>
            }
          >
            <div className={clsx(styles.block, styles.profile)}>
              <div className={styles.img}>
                {userCurrentInfo?.AvatarIMG ? (
                  <AvatarAntd src={userCurrentInfo?.AvatarIMG} />
                ) : (
                  <AvatarName
                    name={userCurrentInfo?.UserName}
                    round={true}
                    size={"40px"}
                    textSizeRatio={2}
                  />
                )}
              </div>
              <div className={styles.userInfoWrapper}>
                <span className="text-main text-[14px] items-end font-semibold">
                  {userNew?.UserName}
                </span>
                <span className="text-sec text-[12px] items-end font-semibold">
                  {userCurrentInfo?.UserGroupName}
                </span>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
