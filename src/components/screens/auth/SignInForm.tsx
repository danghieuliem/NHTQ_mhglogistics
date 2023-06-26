import { Card, Modal } from "antd";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authenticate, setToken, user as userAPI } from "~/api";
import { Button, FormInput } from "~/components";
import { showToast } from "~/components/toast";
import { setRouter, updateUser, useAppDispatch } from "~/store";
import { _format } from "~/utils";

export const SignInForm = ({ visible, setOpenModal }) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset, resetField } = useForm<TLogin>({
    mode: "onBlur",
    defaultValues: {
      userName: "monachecker",
      password: "mona@123",
    },
  });

  useEffect(() => {
    reset({
      userName: "monachecker",
      password: "mona@123",
    });
  }, [visible]);

  const [loading, setLoading] = useState(false);
  const [showP, setShowP] = useState(false);

  const _onPress = (data: TLogin) => {
    setLoading(true);
    authenticate
      .login(data)
      .then((res) => {
        const token = res.Data.token;
        Cookie.set("tokenNHTQ-demo", token);
        setToken(token);
        const user: TUser = JSON.parse(
          _format.getJWTDecode(token)[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
          ]
        );
        userAPI
          .getByID(user?.UserId)
          .then((res) => {
            dispatch(
              updateUser({
                ...res?.Data,
                IsConfirmOTP: false,
                Roles: [],
                LastName: "",
                FirstName: "",
                Token: token,
              })
            );
            setOpenModal("");
            setLoading(false);
            dispatch(setRouter(user.UserGroupId));
          })
          .catch(() => console.log("error to fetching user by id!"));
      })
      .catch(() => {
        resetField("password");
        showToast({
          title: "",
          message: "Tên đăng nhập hoặc mật khẩu không chính xác",
          type: "error",
        });
        setLoading(false);
      });
  };

  return (
    <Modal visible={visible} footer={false} closeIcon={true} closable={false}>
      <div className="authContainer">
        <Card
          className="!m-[-10px]"
          extra={
            <div className="flex items-center justify-between">
              <p className="heading !pb-0">Đăng nhập</p>
              <span
                className="cursor-pointer"
                onClick={() => setOpenModal(false)}
              >
                <i className="fas fa-times text-[#adadad] hover:text-red text-[20px]"></i>
              </span>
            </div>
          }
          actions={[
            <div className="link" onClick={() => setOpenModal("register")}>
              <a className="!mt-0 !inline-block">Đăng ký</a>
            </div>,
            <div
              className="link"
              onClick={() => setOpenModal("forgetPassword")}
            >
              <a className="!mt-0 !inline-block">Quên mật khẩu?</a>
            </div>,
          ]}
        >
          <form onSubmit={handleSubmit(_onPress)}>
            <div className="col-span-2">
              <FormInput
                disabled={loading}
                control={control}
                name="userName"
                homeType="login"
                label="Tài khoản"
                placeholder="Nhập tài khoản"
                rules={{
                  required: "Bạn chưa điền thông tin!",
                }}
                prefix={
                  <i className="fas fa-user"></i>
                }
              />
            </div>
            <div className="col-span-2">
              <FormInput
                disabled={loading}
                control={control}
                name="password"
                label="Mật khẩu"
                allowClear={false}
                prefix={<i className="fas fa-lock"></i>}
                suffix={
                  <i
                    onClick={() => setShowP(!showP)}
                    className={!showP ? "fas fa-eye-slash" : "fas fa-eye"}
                  ></i>
                }
                homeType="login"
                type={!showP ? "password" : "text"}
                placeholder="Nhập mật khẩu"
                rules={{
                  required: "Bạn chưa điền thông tin!",
                }}
              />
            </div>
            <div className="col-span-2">
              <Button
                loading={loading}
                title="Đăng nhập"
                btnClass="w-full"
                htmlType="submit"
              />
            </div>
          </form>
        </Card>
      </div>
    </Modal>
  );
};
