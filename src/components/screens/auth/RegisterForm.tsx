// import {signIn} from "next-auth/react";
import Cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { authenticate, setToken, user as userAPI } from "~/api";
import { Button, FormInput, toast } from "~/components";
import { config } from "~/configs";
import { setRouter, updateUser, useAppDispatch } from "~/store";
import { _format } from "~/utils";
import { EUnique, checkUnique, createComplain } from "./method";
import { useRouter } from "next/router";

const aLink =
  "cursor-pointer text-main hover:text-sec transition-all duration-300";

const RegisterForm = ({ handleOpen }) => {
  const dispatch = useAppDispatch();

  const { handleSubmit, control, watch, reset } = useForm<TUserRegister>({
    mode: "onBlur",
    defaultValues: {
      UserName: "",
      Password: "",
      ConfirmPassword: "",
      Email: "",
      Phone: "",
      FullName: "",
    },
  });
  const password = watch("Password");
  const [psIcon, setPsIcon] = useState(false);
  const [cpsIcon, setCpsIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    reset({
      UserName: "",
      Password: "",
      ConfirmPassword: "",
      Email: "",
      Phone: "",
      FullName: "",
    });
  }, []);

  const { mutate, isLoading } = useMutation(
    (data: TUserRegister) => authenticate.register(data),
    {
      onSuccess: async (data) => {
        const token = data?.Data?.token;
        Cookie.set(config.tokenName, token);
        setToken(token);
        toast.success("Đăng ký tài khoản thành công");
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
            setLoading(false);
            router.push('/user/');
            dispatch(setRouter(user.UserGroupId));
          })
          .catch(() => console.log("error to fetching user by id!"));
      },
      onError: (error) => {
        setLoading(false);
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
    }
  );

  const _onPress = (data: TUserRegister) => {
    setLoading(true);
    const { FullName, Phone } = data;
    const newData = {
      ...data,
      FullName: FullName.trim(),
      Phone: Phone.trim(),
    };
    mutate(newData);
  };

  return (
    <div className="authContainer">
      <form onSubmit={handleSubmit(_onPress)}>
        <div className="col-span-2 md:col-span-1">
          <FormInput
            homeType="register"
            label="Tên đăng nhập"
            control={control}
            placeholder="Nhập UserName"
            name="UserName"
            rules={{
              required: "Vui lòng điền username.",
              minLength: {
                value: 6,
                message: "Tôi thiểu 6 kí tự!",
              },
              maxLength: {
                value: 30,
                message: "Tối đa 30 kí tự",
              },
              validate: {
                check: (value) => {
                  const check = _format.checkUserNameVNese(value.trim());
                  if (value.trim().includes(" ")) {
                    return "Không chứa khoảng trắng giữa 2 chữ!";
                  }
                  if (check) {
                    return "Không được chứa Tiếng Việt!";
                  }
                  return checkUnique(value.trim(), EUnique.username);
                },
              },
            }}
            type={"text"}
            disabled={isLoading}
            prefix={<i className="fas fa-user"></i>}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <FormInput
            control={control}
            homeType="register"
            label="Họ & tên"
            placeholder="Nhập họ & tên"
            name="FullName"
            type={"text"}
            rules={{
              required: "Vui lòng điền thông tin",
            }}
            disabled={isLoading}
            prefix={<i className="fas fa-user-tag"></i>}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <FormInput
            control={control}
            homeType="register"
            label="Email"
            placeholder="Nhập địa chỉ email"
            name="Email"
            disabled={isLoading}
            type={"email"}
            rules={{
              required: "Vui lòng điền email.",
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Không đúng định dạng!",
              },
              validate: {
                check: (value) => {
                  return checkUnique(value.trim(), EUnique.email);
                },
              },
            }}
            prefix={<i className="fas fa-envelope"></i>}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <FormInput
            homeType="register"
            label="Số điện thoại"
            control={control}
            placeholder="Nhập số điện thoại"
            name="Phone"
            disabled={isLoading}
            prefix={<i className="fas fa-phone-plus"></i>}
            rules={{
              required: "Nhập số điện thoại.",
              minLength: {
                value: 10,
                message: "Tối thiểu 10 số!",
              },
              pattern: {
                value:
                  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                message: "Sđt không đúng định dạng!",
              },
              validate: {
                check: (value) => {
                  return checkUnique(value.trim(), EUnique.phone);
                },
              },
            }}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <FormInput
            homeType="register"
            label="Mật khẩu"
            prefix={<i className="fas fa-lock"></i>}
            control={control}
            placeholder="Nhập mật khẩu"
            name="Password"
            disabled={isLoading}
            suffix={
              <div className="show-pass" onClick={() => setPsIcon(!psIcon)}>
                <i className={!psIcon ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </div>
            }
            type={!psIcon ? "password" : "text"}
            rules={{
              minLength: {
                value: 8,
                message: "Tối thiểu 8 kí tự!",
              },
              validate: {
                check: (value) => {
                  const check = _format.checkUserNameVNese(value.trim());

                  if (value.trim() === "") {
                    return "Nhập mật khẩu.";
                  }

                  if (value.trim().includes(" ")) {
                    return "Không chứa khoảng trắng giữa 2 chữ!";
                  }
                  if (check) {
                    return "Không được chứa Tiếng Việt!";
                  }
                },
              },
            }}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <FormInput
            control={control}
            homeType="register"
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            name="ConfirmPassword"
            disabled={isLoading}
            prefix={<i className="fas fa-lock"></i>}
            suffix={
              <div className="show-pass" onClick={() => setCpsIcon(!cpsIcon)}>
                <i className={!cpsIcon ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </div>
            }
            type={!cpsIcon ? "password" : "text"}
            rules={{
              required: "Xác nhận lại mật khẩu.",
              validate: {
                checkEqualPassword: (value) => {
                  const check = _format.checkUserNameVNese(value.trim());

                  if (value.trim() === "") {
                    return "Nhập mật khẩu";
                  }

                  if (value.trim().includes(" ")) {
                    return "Không chứa khoảng trắng giữa 2 chữ!";
                  }
                  if (check) {
                    return "Không được chứa Tiếng Việt!";
                  }
                  return password === value.trim() || createComplain();
                },
              },
            }}
          />
        </div>
        <div className="col-span-2">
          <Button
            loading={loading}
            title="Đăng ký"
            btnClass="w-full"
            htmlType="submit"
          />
        </div>
      </form>

      <div className="py-4 flex justify-between">
        <span className={aLink} onClick={() => handleOpen("login")}>
          Đăng nhập hệ thống
        </span>
        <span className={aLink} onClick={() => handleOpen("forgetPass")}>
          Quên mật khẩu?
        </span>
      </div>
    </div>
  );
};

export const RegisterFormMemo = React.memo(RegisterForm);
