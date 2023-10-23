import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authenticate } from "~/api";
import { Button, showToast } from "~/components";
import { FormInput } from "~/components/globals/formBase";
const aLink =
  "cursor-pointer text-main hover:text-sec transition-all duration-300";

export const ForgotPasswordForm = ({ handleOpen }) => {
  const { handleSubmit, control, getValues, reset } = useForm<{
    Email: string;
  }>({
    mode: "onBlur",
    defaultValues: {
      Email: "",
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    reset({ Email: "" });
  }, []);

  const _onPress = async () => {
    try {
      setLoading(true);
      await authenticate
        .forgotPassword({
          Email: getValues("Email"),
        })
        .then(() => {
          toast.success("Đã gửi mật khẩu mới về mail của bạn!");
          setLoading(false);
        })
        .catch((error) => {
          showToast({
            title: (error as any)?.response?.data?.ResultCode === 401 && "Lỗi!",
            message: "Emall không tồn tại!",
            type: "error",
          });
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      showToast({
        title:
          (error as any)?.response?.data?.ResultCode === 401 && "Lỗi server!",
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
    }
  };

  return (
    <div className="authContainer">
      <form onSubmit={handleSubmit(_onPress)}>
        <div className="col-span-2">
          <FormInput
            control={control}
            placeholder="Nhập địa chỉ email gửi yêu cầu"
            name="Email"
            homeType="forgetPass"
            label="Email"
            type={"email"}
            disabled={loading}
            rules={{
              required: "Vui lòng điền email.",
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Không đúng định dạng",
              },
            }}
            prefix={<i className="fas fa-envelope"></i>}
          />
        </div>
        <div className="col-span-2">
          <Button
            loading={loading}
            btnClass="w-full"
            title="Gửi yêu cầu"
            htmlType="submit"
          />
        </div>
      </form>
      <div className="py-4 flex justify-between flex-col xs:flex-row gap-4">
        <span className={aLink} onClick={() => handleOpen("login")}>
          Đăng nhập hệ thống
        </span>
        <span className={aLink} onClick={() => handleOpen("register")}>
          Đăng ký tài khoản
        </span>
      </div>
    </div>
  );
};
