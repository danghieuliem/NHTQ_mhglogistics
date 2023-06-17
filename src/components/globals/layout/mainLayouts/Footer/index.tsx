import React from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import { RootState } from "~/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Tooltip } from "antd";

type TProps = {
  hover: boolean;
  userPage?: boolean;
};
const Footer: React.FC<TProps> = ({ hover, userPage }) => {
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);

  return (
    <footer
      className={clsx(
        styles.footer,
        hover && styles.hover,
      )}
    >
      <p className="hidden sm:block text-xs">© 2023 NHẬP HÀNG TRUNG QUỐC</p>
      <div className={styles.toolsExt}>
        <Link href={dataGlobal?.CocCocExtensionLink ?? "/"}>
          <a target="_blank">
            <Tooltip className={styles.icon} title="Cài đặt công cụ trên Cốc Cốc" placement="top">
              <img
                src="/default/logo-coccoc.png"
                alt=""
                width={16}
                height={16}
              />
              <span>
                Cốc Cốc
              </span>
            </Tooltip>
          </a>
        </Link>
        <Link href={dataGlobal?.ChromeExtensionLink ?? "/"}>
          <a target="_blank">
            <Tooltip className={styles.icon} title="Cài đặt công cụ trên Chrome" placement="top">
              <img
                src="/default/logo-chrome.png"
                alt=""
                width={16}
                height={16}
              />
              <span>Chrome</span>
            </Tooltip>
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
