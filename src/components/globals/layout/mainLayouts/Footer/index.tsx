import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import styles from "./index.module.css";

type TProps = {
  hover: boolean;
  userPage?: boolean;
};

const Footer: React.FC<TProps> = () => {
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);

  return (
    <footer className={styles.footer}>
      <div className="component-container">
        <div className={styles.inner}>
          <div>
            <span className={styles.tag}>Hotline hỗ trợ:</span>
            <a className={styles.value} href={`tel:+${dataGlobal?.HotlineSupport}`}>
              {dataGlobal?.HotlineSupport}
            </a>
          </div>
          <div>
            <span className={styles.tag}>Phiên bản: </span>
            <span className={styles.value}>MONA.Software/NHTQ 6.0.5</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
