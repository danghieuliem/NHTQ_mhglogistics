import { useSelector } from "react-redux";
import BlankLayout from "~/components/globals/layout/blankLayouts";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import styles from "./index.module.css";
import { Divider } from "antd";
import { ForgotPasswordForm, RegisterFormMemo, SignInForm } from "~/components";
import { useCallback, useState } from "react";
import { HomeLayoutProtector } from "~/components/globals/layout/homeLayouts/HomeLayoutProtector";
import Link from "next/link";

const Index: TNextPageWithLayout = () => {
  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal
  );

  const [isOpen, setIsOpen] = useState("login");

  const handleSetOpen = useCallback((x) => setIsOpen(x), []);

  return (
    // <HomeLayoutProtector>
    <div className={styles.loginPage}>
      <div className={styles.loginWrapper}>
        <div>
          <div className={styles.loginText}>
            <Link href={"/"}>
              <a>
                <div className={styles.loginLogo}>
                  <img src={dataGlobal?.LogoIMG} alt="" />
                </div>
              </a>
            </Link>
            <Divider />
            {isOpen === "login" && <h1>Đăng nhập hệ thống</h1>}

            {isOpen === "register" && <h1>Đăng ký tài khoản</h1>}

            {isOpen === "forgetPass" && <h1>Tìm lại mật khẩu</h1>}
          </div>
        </div>
        {isOpen === "login" && <SignInForm handleOpen={handleSetOpen} />}

        {isOpen === "register" && (
          <RegisterFormMemo handleOpen={handleSetOpen} />
        )}

        {isOpen === "forgetPass" && (
          <ForgotPasswordForm handleOpen={handleSetOpen} />
        )}

        <div className={styles.loginContact}>
          <div className={styles.infoWrapper}>
            <span className={styles.infoLabel}>Hotline: </span>
            <span className={styles.infoValue}>{dataGlobal?.Hotline}</span>
          </div>
          <div className={styles.infoWrapper}>
            <span className={styles.infoLabel}>Email: </span>
            <span className={styles.infoValue}>{dataGlobal?.EmailContact}</span>
          </div>
        </div>
      </div>
      <img src="/default/login-bottom.png" alt="" className={styles.img} />
    </div>
    // {/* </HomeLayoutProtector> */}
  );
};

// Index.displayName = SEOConfigs.homePage;
Index.Layout = BlankLayout;
Index.displayName = "Hệ thống";

export default Index;
