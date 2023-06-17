import router from "next/router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { user } from "~/api";
import {
  FormDate,
  FormInput,
  FormInputNumber, FormSelect
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { showToast, toast } from "~/components/toast";
import { activeData, genderData } from "~/configs/appConfigs";
import { useDeepEffect } from "~/hooks";

import { Switch } from "antd";
import { checkUnique, createComplain, EUnique } from "../../auth/method";

type TProps = {
  defaultValues: TEmployee;
  userLevelCatalogue: TUserLevelCatalogue[];
  userGroupCatalogue: TUserGroupCatalogue[];
  userSaleCatalogue: TUserCatalogue[];
  userOrderCatalogue: TUserCatalogue[];
  loading: boolean;
  oriEmail: React.MutableRefObject<any>;
  oriPhone: React.MutableRefObject<any>;
};

type TForm = TEmployee & {
  UserGroupId: number;
  FeeTQVNPerVolume: number;
};

export const EmployeeManagementDetailForm: React.FC<TProps> = ({
  defaultValues,
  userGroupCatalogue,
  userLevelCatalogue,
  userOrderCatalogue,
  userSaleCatalogue,
  loading,
  oriEmail,
  oriPhone,
}) => {
  const [changePass, setChangePass] = useState(false);
  const UserGroupNameCur = useRef(null);

  const { handleSubmit, control, watch, getValues, reset } = useForm<TForm>({
    mode: "onBlur",
  });

  useDeepEffect(() => {
    reset({
      ...defaultValues,
      PasswordNew: "",
      PasswordAgain: "",
      IsResetPassword: false,
    });
  }, [defaultValues]);

  const mutationUpdate = useMutation(user.update, {
    onSuccess: () => {
      toast.success("Cập nhật nhân viên thành công");
    },
    onError: (error) => {
      showToast({
        title: (error as any)?.response?.data?.ResultCode === 401 && "Lỗi!",
        message: (error as any)?.response?.data?.ResultMessage,
        type: "error",
      });
    },
  });

  const _onPress = (data: TForm) => {
    toast.info("Đang xử lý ...");
    if (data?.PasswordNew) {
      if (data?.PasswordAgain !== data?.PasswordNew) {
        toast.error("Mật khẩu nhập lại sai rồi nè!");
        return;
      } else {
        const newData = {
          ...data,
          PasswordNew: data?.PasswordNew.trim(),
          PasswordAgain: data?.PasswordAgain.trim(),
          IsResetPassword: true,
        };
        mutationUpdate.mutateAsync({
          ...newData,
          UserGroupName: UserGroupNameCur.current,
        });
      }
    } else {
      mutationUpdate.mutateAsync({
        ...data,
        UserGroupName: UserGroupNameCur.current,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="tableBox md:col-span-2 xl:col-span-1 h-fit">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 font-bold text-[22px]">
              Cấu hình người dùng
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="UserName"
                placeholder="Username"
                label="Nhập username"
                required={false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="FullName"
                placeholder="Nhập họ và tên"
                label="Họ và tên"
                rules={{ required: "Không bỏ trống họ và tên" }}
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Address"
                placeholder="Địa chỉ"
                label="Nhập địa chỉ"
                rules={{ required: "Không bỏ trống địa chỉ" }}
              />
            </div>
            <div className="col-span-2">
              <FormDate
                label="Ngày sinh"
                name="Birthday"
                control={control}
                placeholder="Nhập ngày sinh"
              />
            </div>
            <div className="col-span-2">
              <FormInput
                type="email"
                control={control}
                name="Email"
                placeholder="Email"
                label="Email"
                rules={{
                  required: "Vui lòng điền email..",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "email không đúng định dạng",
                  },
                  validate: {
                    check: (value) => {
                      if (value !== oriEmail.current) {
                        return checkUnique(value, EUnique.email);
                      } else return;
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-2">
              <FormSelect
                control={control}
                label="Giới Tính"
                placeholder=""
                name="Gender"
                data={genderData}
                select={{ label: "Name", value: "Id" }}
                defaultValue={genderData?.[defaultValues?.Gender]}
                required={false}
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                name="Phone"
                placeholder=""
                label="Số điện thoại"
                rules={{
                  required: "Vui lòng điền số điện thoại..",
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Sđt không đúng định dạng",
                  },
                  validate: {
                    check: (value) => {
                      if (value !== oriPhone.current) {
                        return checkUnique(value.trim(), EUnique.phone);
                      } else return;
                    },
                  },
                }}
              />
            </div>
            <div className="col-span-2 flex items-end justify-end">
              <label className="mr-3">Đổi mật khẩu?</label>
              <Switch
                onChange={() => {
                  setChangePass(!changePass);
                  reset();
                }}
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                required={changePass}
                disabled={!changePass}
                name="PasswordNew"
                type="text"
                placeholder="Mật khẩu mới"
                label="Mật khẩu mới"
                rules={
                  changePass
                    ? {
                        minLength: {
                          value: 8,
                          message: "Mật khẩu ít nhất 8 kí tự",
                        },
                        required: "Vui lòng điền mật khẩu",
                      }
                    : {}
                }
              />
            </div>
            <div className="col-span-2">
              <FormInput
                control={control}
                required={changePass}
                disabled={!changePass}
                name="PasswordAgain"
                type="text"
                placeholder="Nhập lại mật khẩu mới"
                label="Nhập lại mật khẩu mới"
                rules={
                  changePass
                    ? {
                        required: "Vui lòng xác nhận mật khẩu..",
                        validate: {
                          checkEqualPassword: (value) => {
                            return (
                              getValues("PasswordNew") === value ||
                              createComplain()
                            );
                          },
                        },
                      }
                    : {}
                }
              />
            </div>
          </div>
        </div>
        <div className="tableBox md:col-span-2 xl:col-span-1">
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-1 font-bold text-[22px]">Cấu hình giá</div>
            <div className="col-span-1 grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className="mb-3">
                  <FormInputNumber
                    control={control}
                    name="Currency"
                    // defaultValue={defaultValues?.Currency}
                    suffix=" VNĐ"
                    label="Tỉ giá riêng (VNĐ)"
                    placeholder="Tỉ giá riêng (VNĐ)"
                    required={false}
                  />
                </div>
                <div className="mb-3">
                  <FormInputNumber
                    control={control}
                    name="FeeBuyPro"
                    // defaultValue={defaultValues?.FeeBuyPro ?? 0}
                    label="Phí mua hàng riêng (%)"
                    suffix=" %"
                    placeholder="Phí mua hàng riêng (%)"
                    required={false}
                  />
                </div>
                <div className="mb-3">
                  <FormInputNumber
                    control={control}
                    name="Deposit"
                    suffix=" %"
                    label="Phí đặt cọc riêng (%)"
                    placeholder="Phí đặt cọc riêng (%)"
                    required={false}
                  />
                </div>
                <div className="mb-3">
                  <FormInputNumber
                    control={control}
                    name="FeeTQVNPerWeight"
                    label="Phí cân nặng riêng (VNĐ/Kg)"
                    suffix=" VNĐ/Kg"
                    placeholder="Phí cân nặng riêng (VNĐ/Kg)"
                    required={false}
                  />
                </div>
                <div className="mb-3">
                  <FormInputNumber
                    control={control}
                    name="FeeTQVNPerVolume"
                    label="Phí thể tích riêng (VNĐ/m3)"
                    placeholder="Phí thể tích riêng (VNĐ/m3)"
                    suffix=" VNĐ/m3"
                    required={false}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="mb-3">
                  <FormSelect
                    control={control}
                    placeholder=""
                    name="SaleId"
                    label="Nhân viên kinh doanh"
                    data={userSaleCatalogue}
                    required={false}
                    select={{ label: "UserName", value: "Id" }}
                    isClearable={true}
                    defaultValue={{
                      UserName:
                        userSaleCatalogue?.find(
                          (item) => item.Id === defaultValues?.SaleId
                        )?.UserName ?? "Chọn nhân viên kinh doanh",
                      Id: defaultValues?.SaleId ?? 0,
                    }}
                    // callback={(val) => {
                    // 	console.log(userSaleCatalogue?.find((item) => item.Id === val)?.UserName);
                    // }}
                  />
                </div>
                <div className="mb-3">
                  <FormSelect
                    control={control}
                    placeholder=""
                    name="DatHangId"
                    label="Nhân viên đặt hàng"
                    isClearable={true}
                    data={userOrderCatalogue}
                    required={false}
                    select={{ label: "UserName", value: "Id" }}
                    defaultValue={{
                      UserName:
                        userOrderCatalogue?.find(
                          (item) => item.Id === defaultValues?.DatHangId
                        )?.UserName ?? "Chọn nhân viên đặt hàng",
                      Id: defaultValues?.DatHangId ?? 0,
                    }}
                    // callback={(val) => {
                    // 	console.log(userOrderCatalogue?.find((item) => item.Id === val)?.UserName);
                    // }}
                  />
                </div>
                <div className="mb-3">
                  <FormSelect
                    control={control}
                    placeholder=""
                    name="LevelId"
                    required={false}
                    label="Cấp người dùng"
                    data={userLevelCatalogue}
                    select={{ label: "Name", value: "Id" }}
                    defaultValue={{
                      Name:
                        userLevelCatalogue?.find(
                          (item) => item.Id === defaultValues?.LevelId
                        )?.Name ?? "Chọn cấp người dùng",
                      Id: defaultValues?.LevelId,
                    }}
                    // callback={(val) => {
                    // 	console.log(userLevelCatalogue?.find((item) => item.Id === val)?.Name);
                    // }}
                  />
                </div>
                <div className="mb-3">
                  <FormSelect
                    control={control}
                    placeholder=""
                    name="UserGroupId"
                    label="Quyền hạn"
                    data={userGroupCatalogue}
                    select={{ label: "Name", value: "Id" }}
                    defaultValue={{
                      Name: defaultValues?.UserGroupName,
                      Id: defaultValues?.UserGroupId,
                    }}
                    callback={(val) => {
                      UserGroupNameCur.current = userGroupCatalogue.find(
                        (item) => item.Id === val
                      )?.Name;
                    }}
                  />
                </div>
                <div className="mb-3">
                  <FormSelect
                    control={control}
                    name="Status"
                    data={activeData.slice(1)}
                    defaultValue={{
                      id: defaultValues?.Status,
                      name: defaultValues?.StatusName,
                    }}
                    label="Trạng thái tài khoản"
                    placeholder="Chọn trạng thái tài khoản"
                    required={false}
                    menuPlacement="bottom"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 pt-3 mt-3 border-t border-[#ccc]">
              <div className="flex justify-end items-end">
                <IconButton
                  icon="fas fa-edit"
                  title="Cập nhật"
                  onClick={handleSubmit(_onPress)}
                  btnClass="!mr-2 !bg-active"
                  showLoading
                  toolip=""
                />
                <IconButton
                  icon="fas fa-undo-alt"
                  title="Trở về"
                  toolip=""
                  onClick={() => router.back()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
