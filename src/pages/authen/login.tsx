import { Divider } from "antd";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  ForgotPasswordForm,
  RegisterFormMemo,
  SignInForm,
} from "~/components";
import { BlankLayout } from "~/components";
import { RootState } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import styles from "./index.module.css";
import { TrialForm } from "~/components/screens/auth/Trial";

const Index: TNextPageWithLayout = () => {
  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal
  );

  const [isOpen, setIsOpen] = useState("login");

  const handleSetOpen = useCallback((x) => setIsOpen(x), []);

  return (
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

            {isOpen === "trial" && <h1>Phân quyền dùng thử</h1>}
          </div>
        </div>
        {isOpen === "login" && (
          <>
            <SignInForm handleOpen={handleSetOpen} />
            <Button
              onClick={() => setIsOpen("trial")}
              title="Dùng thử"
              btnClass="!bg-green"
            />
          </>
        )}

        {isOpen === "register" && (
          <RegisterFormMemo handleOpen={handleSetOpen} />
        )}

        {isOpen === "forgetPass" && (
          <ForgotPasswordForm handleOpen={handleSetOpen} />
        )}

        {isOpen === "trial" && <TrialForm handleOpen={handleSetOpen} />}

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
  );
};

Index.Layout = BlankLayout;
Index.displayName = "Hệ thống";

export default Index;
