import { BackTop } from "antd";
import styles from "./index.module.css";

export const ButtonBackTop: React.FC<{}> = ({ children }) => {
  return (
    <BackTop className={styles.backTopWrapper}>
      <div className={styles.backTopInner}>
        <i className={`fas fa-angle-double-up  ${styles.backTopIcon}`}></i>
      </div>
    </BackTop>
  );
};
