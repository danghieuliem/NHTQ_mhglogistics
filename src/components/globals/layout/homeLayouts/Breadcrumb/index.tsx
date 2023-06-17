import Link from "next/link";
import React from "react";
import styles from "./index.module.css";

export const HomeBreadcrumb: React.FC<{ currentRoute: any; name: string }> =
  React.memo(({ currentRoute, name }) => {
    return (
      <div className={styles.breadCrumb}>
        <Link href="/">
          <a className={styles.aTitle}>Trang chủ</a>
        </Link>
        <Link href="#">
          <a className={styles.aTitle}>{name}</a>
        </Link>
      </div>
    );
  });
