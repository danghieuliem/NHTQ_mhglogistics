import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authenticate } from "~/api";
import { Button, showToast } from "~/components";
import { FormCard, FormInput } from "~/components/globals/formBase";

export const ForgotPasswordForm = ({ visible, setOpenModal }) => {
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
    <Modal visible={visible} footer={false} closeIcon={false} closable={false} className="min-w-[500px]">
      <div className="authContainer">
        <FormCard>
          <FormCard.Header onCancel={() => setOpenModal("")}>
            <p className="heading !pb-0">Quên mật khẩu?</p>
          </FormCard.Header>
          <FormCard.Body>
            <form onSubmit={handleSubmit(_onPress)}>
              <div
                className="gridContainer"
                style={{
                  pointerEvents: loading ? "none" : "all",
                  opacity: loading ? "0.8" : "1",
                }}
              >
                <div className="col-span-2">
                  <FormInput
                    control={control}
                    placeholder="Nhập địa chỉ email gửi yêu cầu"
                    name="Email"
                    homeType="forgetPass"
                    label="Email"
                    type={"email"}
                    rules={{
                      required: "Vui lòng điền email..",
                      pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "email không đúng định dạng",
                      },
                    }}
                  />
                </div>
                <div className="group col-span-2 !mt-4 uppercase font-bold text-end">
                  <button type="submit" className="w-full">
                    <Button
                      showLoading
                      title="Gửi yêu cầu khôi phục"
                      btnClass="!bg-main !m-0 !rounded-none shadow-xl hover:shadow-none transition-all duration-300 w-full"
                    />
                  </button>
                </div>

                <div
                  className="forgotpasswordLinkTo group col-span-2 !pt-4 border-t border-[#c4c4c4]"
                  id="auth-link"
                >
                  <div className="link" onClick={() => setOpenModal("signIn")}>
                    <a className="!mt-0 !inline-block">Đăng nhập</a>
                  </div>
                  <div
                    className="link"
                    onClick={() => setOpenModal("register")}
                  >
                    <a className="!mt-0 !inline-block">Đăng ký</a>
                  </div>
                </div>
              </div>
            </form>
          </FormCard.Body>
        </FormCard>
      </div>
    </Modal>
  );
};
