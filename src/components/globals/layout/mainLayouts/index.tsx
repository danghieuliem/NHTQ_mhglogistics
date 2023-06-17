import clsx from "clsx";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useState } from "react";
// import OneSignal from "react-onesignal";
import { useAppSelector } from "~/store";
import { TlayoutWithChild } from "~/types/layout";
import { _func } from "~/utils";
import { ButtonBackTop } from "../../button/ButtonBackTop";
import AuthLayoutProtector from "../authLayouts/AuthlayoutProtector";
import { MenuHorizontal } from "../userLayout/menuHorizontal";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./index.module.css";

type TProps = {
  breadcrumb?: string;
  userPage?: boolean;
};

export const Layout: TlayoutWithChild & React.FC<TProps> = ({
  children,
  userPage,
  breadcrumb,
}) => {
  const router = useRouter();
  const userNew = useAppSelector((state) => state.user.current);
  // const ids = useAppSelector((state) => state?.user?.current)?.UserId;

  // useEffect(() => {
  //   // OneSignal.setSubscription(true)
  //   OneSignal.init({ appId: "86419110-33f6-4e71-b73b-54bd86b5f99a" });

  //   // .then(() => {
  //   // 	OneSignal.showSlidedownPrompt();
  //   // });

  //   // OneSignal.on("popoverShown", function () {
  //   // 	console.log("Slide Prompt Shown");
  //   // });

  //   OneSignal.on("subscriptionChange", async () => {
  //     const userData = await user.getByID(ids);
  //     const data = userData?.Data;

  //     OneSignal.getUserId(async (userId) => {
  //       const res = await user.update({ ...data, OneSignalPlayerID: userId });
  //     });
  //   });
  // }, []);

  const [hover, setHover] = useState(userPage ? window.innerWidth >= 1280 : true);
  const handleHover = useCallback((bool: boolean) => setHover(bool), []);

  const [tabbar, setTabbar] = useState(false);
  const handleTabbar = useCallback((bool: boolean) => setTabbar(bool), []);

  const userGroupId = userNew?.UserGroupId;
  if (userGroupId !== 1) {
    _func.handleCheckAccessPage(userGroupId, router);
  }

  return (
    <AuthLayoutProtector>
      <Header
        {...{
          handleTabbar,
          tabbar,
          hover,
          handleHover,
          userPage,
        }}
      />
      <main
        className={clsx(
          "app-content",
          userPage ? styles.userAppContent : styles.managerAppContent
        )}
      >
        {window.innerWidth >= 1280 && userPage ? (
          <MenuHorizontal />
        ) : (
          <Sidebar {...{ hover, handleHover, tabbar, handleTabbar }} />
        )}

        <div className={clsx("app-main-content height-content app-main")}>
          <div
            className={clsx(
              "app-main-inner",
              !userPage && styles.managerAppMainInner
            )}
          >
            {breadcrumb && (
              <div className={clsx(styles.breadcrumb)}>{breadcrumb}</div>
            )}

            {children}
          </div>

          <ButtonBackTop />
        </div>
      </main>
    </AuthLayoutProtector>
  );
};

Layout.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
