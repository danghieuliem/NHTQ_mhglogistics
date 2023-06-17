import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { user } from "~/api";
import {
  Button,
  FormAsyncSelect,
  FormCard,
  FormDate,
  FormInput,
  FormRadio,
  FormSelect,
  Modal,
} from "~/components";
import {
  activeData,
  EActiveData,
  EGenderData,
  genderData,
} from "~/configs/appConfigs";
import { TForm } from "~/types/table";
import { _format } from "~/utils";
import { checkUnique, createComplain, EUnique } from "../../auth/method";

type TProps = TForm<TEmployee> & {
  userLevelCatalogue: TUserLevelCatalogue[];
  userGroupCatalogue: TUserGroupCatalogue[];
  userSaleCatalogue: TUserCatalogue[];
  userOrderCatalogue: TUserCatalogue[];
};

export const ClientListForm: FC<TProps> = ({
  onCancel,
  visible,
  userLevelCatalogue,
  userGroupCatalogue,
  userOrderCatalogue,
  userSaleCatalogue,
}) => {
  const router = useRouter();
  const { handleSubmit, setValue, watch, reset, control } = useForm<
    TEmployee & { UserGroupId: number }
  >({
    mode: "onBlur",
    defaultValues: { Gender: 0 },
  });
  const password = watch("Password");

  React.useEffect(() => {
    if (visible) {
      reset({
        Gender: EGenderData.FEMALE,
        LevelId: userLevelCatalogue?.[0]?.Id,
        UserGroupId: 2,
        Status: EActiveData.Actived,
        IsAdmin: false,
        DatHangId: 0,
        SaleId: 0,
        Deposit: 0,
        FeeTQVNPerWeight: 0,
        FeeBuyPro: 0,
        Currency: 0,
        IsLocked: false,
      });
    }
  }, [visible]);

  const queryClient = useQueryClient();

  const _onPress = (data: TEmployee) => {
    onCancel();
    const id = toast.loading("Đang xử lý ...");
    user
      .create(data)
      .then((res) => {
        queryClient.invalidateQueries("clientData");
        toast.update(id, {
          render: "Thêm khách hàng thành công",
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          type: "error",
          autoClose: 2000,
          isLoading: false,
        });
      });
  };

  return (
    <Modal
      visible={visible}
      width={900}
      style={{ top: 50 }}
      onCancel={onCancel}
    >
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Thêm khách hàng</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <FormInput
                control={control}
                name="FullName"
                label="Họ và tên"
                placeholder=""
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="Phone"
                label="Số điện thoại"
                placeholder=""
                rules={{
                  required: "Vui lòng điền số điện thoại..",
                  minLength: {
                    value: 10,
                    message: "Số điện thoại tối thiểu 10 số!",
                  },
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Sđt không đúng định dạng",
                  },
                  validate: {
                    check: (value) => {
                      return checkUnique(value.trim(), EUnique.phone);
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <FormDate
                control={control}
                name="Birthday"
                label="Ngày sinh"
                placeholder=""
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="col-span-1">
              <FormSelect
                control={control}
                label="Giới Tính"
                placeholder=""
                name="Gender"
                data={genderData}
                select={{ label: "Name", value: "Id" }}
                required={false}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="UserName"
                label="Tên đăng nhập / Nick name"
                placeholder=""
                rules={{
                  required: "Vui lòng điền thông tin đăng nhập",
                  minLength: {
                    value: 6,
                    message: "username phải ít nhất 6 kí tự",
                  },
                  maxLength: {
                    value: 30,
                    message: "username phải ít hơn 30 kí tự",
                  },
                  validate: {
                    check: (value) => {
                      if (value) {
                        const check = _format.checkUserNameVNese(value.trim());
                        if (value.trim().includes(" ")) {
                          return "username chứa khoảng trắng giữa 2 chữ!";
                        }
                        if (check) {
                          return "Username không được chứa Tiếng Việt";
                        }
                        return checkUnique(value.trim(), EUnique.username);
                      }
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="Email"
                label="Email"
                placeholder=""
                rules={{
                  required: "Vui lòng điền email..",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "email không đúng định dạng",
                  },
                  validate: {
                    check: (value) => {
                      return checkUnique(value.trim(), EUnique.email);
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="Password"
                label="Mật khẩu"
                placeholder=""
                type="password"
                rules={{
                  minLength: {
                    value: 8,
                    message: "Mật khẩu ít nhất 8 kí tự",
                  },
                  validate: {
                    check: (value) => {
                      if (value) {
                        const check = _format.checkUserNameVNese(value.trim());

                        if (value.trim() === "") {
                          return "Vui lòng điền mật khẩu";
                        }

                        if (value.trim().includes(" ")) {
                          return "Mật khẩu không chứa khoảng trắng giữa 2 chữ!";
                        }
                        if (check) {
                          return "Mật khẩu không được chứa Tiếng Việt";
                        }
                      }
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <FormInput
                control={control}
                name="ConfirmPassWord"
                label="Nhập lại mật khẩu"
                type="password"
                placeholder=""
                rules={{
                  required: "Vui lòng xác nhận mật khẩu..",
                  validate: {
                    checkEqualPassword: (value) => {
                      if (value) {
                        const check = _format.checkUserNameVNese(value.trim());

                        if (value.trim() === "") {
                          return "Vui lòng điền mật khẩu";
                        }

                        if (value.trim().includes(" ")) {
                          return "Mật khẩu không chứa khoảng trắng giữa 2 chữ!";
                        }
                        if (check) {
                          return "Mật khẩu không được chứa Tiếng Việt";
                        }
                        return password === value.trim() || createComplain();
                      }
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <FormAsyncSelect
                control={control}
                name="SaleId"
                label="Nhân viên kinh doanh"
                data={{ options: userSaleCatalogue }}
                select={{ label: "FullName", value: "Id" }}
                defaultValue={{ FullName: "Chọn nhân viên kinh doanh", Id: 0 }}
                placeholder=""
                required={false}
                menuPlacement="bottom"
              />
            </div>
            <div className="col-span-1">
              <FormAsyncSelect
                control={control}
                name="DatHangId"
                data={{ options: userOrderCatalogue }}
                select={{ label: "FullName", value: "Id" }}
                label="Nhân viên đặt hàng"
                defaultValue={{ FullName: "Chọn nhân viên đặt hàng", Id: 0 }}
                placeholder=""
                required={false}
                menuPlacement="bottom"
              />
            </div>
            <div className="col-span-1">
              <FormAsyncSelect
                control={control}
                name="UserGroupId"
                data={{
                  options: userGroupCatalogue?.filter((x) => x.Id === 2),
                }}
                select={{ label: "Description", value: "Id" }}
                defaultValue={
                  userGroupCatalogue?.filter((x) => x.Id === 2)?.[0]
                }
                label="Quyền hạn"
                placeholder=""
                required={false}
                menuPlacement="bottom"
                disabled={router.asPath.includes("client/client-list/")}
              />
            </div>
            <div className="col-span-1">
              <FormAsyncSelect
                control={control}
                name="LevelId"
                data={{ options: userLevelCatalogue }}
                defaultValue={userLevelCatalogue?.[0]}
                select={{ label: "Name", value: "Id" }}
                label="Level"
                placeholder=""
                menuPlacement="bottom"
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormSelect
                control={control}
                name="Status"
                data={activeData.slice(1)}
                label="Trạng thái tài khoản"
                placeholder=""
                menuPlacement="bottom"
                defaultValue={activeData[1]}
                rules={{ required: "Vui lòng chọn thông tin!" }}
                required={false}
                callback={() =>
                  setValue(
                    "IsLocked",
                    watch("Status") === EActiveData.Blocked ? true : false
                  )
                }
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title="Thêm mới"
            btnClass="!bg-main"
            onClick={handleSubmit(_onPress)}
          />
          <Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};
