import { Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authenticate } from "~/api";
import { Button } from "~/components";
import { FormInput } from "~/components/globals/formBase";

const ForgotPasswordForm = ({ visible, setOpenModal }) => {
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
  }, [visible]);

  const _onPress = async () => {
    try {
      setLoading(true);
      await authenticate
        .forgotPassword({
          Email: getValues("Email"),
        })
        .then(() => {
          toast.success("Đã gửi mật khẩu mới về mail của bạn!");
          setOpenModal("");
          setLoading(false);
        })
        .catch((error) => {
          toast.error((error as any)?.response?.data?.ResultMessage);

          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error((error as any)?.response?.data?.ResultMessage);
    }
  };

  return (
    <Modal visible={visible} footer={false} closeIcon={false} closable={false}>
      <div className="authContainer">
        <Card
          className="!m-[-10px]"
          extra={
            <div className="flex items-center justify-between">
              <p className="heading !pb-0">Lấy lại mật khẩu</p>
              <span
                className="cursor-pointer"
                onClick={() => setOpenModal(false)}
              >
                <i className="fas fa-times text-[#adadad] hover:text-red text-[20px]"></i>
              </span>
            </div>
          }
          actions={[
            <div className="link" onClick={() => setOpenModal("signIn")}>
              <a className="!mt-0 !inline-block">Đăng nhập</a>
            </div>,
            <div className="link" onClick={() => setOpenModal("register")}>
              <a className="!mt-0 !inline-block">Đăng ký</a>
            </div>,
          ]}
        >
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
        </Card>
      </div>
    </Modal>
  );
};

export const ForgotPasswordFormMemo = React.memo(ForgotPasswordForm)