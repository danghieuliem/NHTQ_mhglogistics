import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { user } from "~/api";
import { InfoUserContact, InfoUserForm, UserLayout } from "~/components";
import { SEOHomeConfigs } from "~/configs/SEOConfigs";
import { RootState, updateUser } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const userCurrentInfo: TUser = useSelector(
    (state: RootState) => state.userCurretnInfo
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const oriEmail = useRef(userCurrentInfo.Email);
  const oriPhone = useRef(userCurrentInfo.Phone);

  const { control, reset, handleSubmit, getValues, setValue } = useForm<
    TUser & { PasswordAgain: string; PasswordNew: string; DatHangName: string }
  >({
    mode: "onBlur",
    defaultValues: {
      PasswordNew: "",
      PasswordAgain: "",
      ...userCurrentInfo,
    },
  });

  useEffect(() => {
    reset({
      PasswordNew: "",
      PasswordAgain: "",
      ...userCurrentInfo,
    });

    oriEmail.current = userCurrentInfo.Email;
    oriPhone.current = userCurrentInfo.Phone;
  }, [userCurrentInfo]);

  const handleUpdateUserCurrent = async (data: TUser) => {
    const id = toast.loading("Đang cập nhật...");

    try {
      await user.update(data);
      toast.update(id, {
        render: "Cập nhật thành công",
        isLoading: false,
        autoClose: 1000,
        type: "success",
      });
      dispatch(updateUser({ ...data }));
    } catch (error) {
      toast.update(id, {
        render: (error as any)?.response?.data?.ResultMessage,
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const _onPress = (data) => {
    setIsLoading(true);
    if (data?.PasswordAgain) {
      if (data?.PasswordAgain !== data?.PasswordNew) {
        toast.error("Mật khẩu nhập lại không đúng!");
        setIsLoading(false);
        return;
      } else {
        const newData = {
          ...data,
          IsResetPassword: true,
        };
        handleUpdateUserCurrent(newData);
      }
    } else {
      handleUpdateUserCurrent(data);
    }
  };

  return (
    <div className="mt-8">
      <InfoUserContact data={userCurrentInfo} />
      <InfoUserForm
        data={userCurrentInfo}
        control={control}
        onPress={_onPress}
        handleSubmit={handleSubmit}
        loading={isLoading}
        getValues={getValues}
        reset={reset}
        oriEmail={oriEmail}
        oriPhone={oriPhone}
      />
    </div>
  );
};

Index.displayName = SEOHomeConfigs.infoUser;
Index.Layout = UserLayout;

export default Index;
