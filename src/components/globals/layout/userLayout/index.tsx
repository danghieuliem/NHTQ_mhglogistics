import React from "react";
import { Layout } from "../mainLayouts";
import styles from "./index.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { Tooltip } from "antd";

type TProps = {
  children: React.ReactNode;
  breadcrumb?: string;
};

export const UserLayout: React.FC<TProps> = ({ children, breadcrumb }) => {
  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal
  );

  return (
    <Layout userPage={true} breadcrumb={breadcrumb}>
      {children}
      <div className={styles.extWrapper}>
        <div className={`${styles.toolsExt} ${styles.toolsExtMobileHidden}`}>
          <Link href={dataGlobal?.CocCocExtensionLink ?? "/"}>
            <a target="_blank" className={styles.icon}>
              <Tooltip title="Cài đặt công cụ trên Cốc Cốc" placement="left">
                <img
                  src="/default/logo-coccoc.png"
                  alt=""
                  width={20}
                  height={20}
                />
              </Tooltip>
            </a>
          </Link>
          <Link href={dataGlobal?.ChromeExtensionLink ?? "/"}>
            <a target="_blank" className={styles.icon}>
              <Tooltip title="Cài đặt công cụ trên Chrome" placement="left">
                <img
                  src="/default/logo-chrome.png"
                  alt=""
                  width={20}
                  height={20}
                />
              </Tooltip>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
