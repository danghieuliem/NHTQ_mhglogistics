import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Page, menu } from "~/api";
import {
  FormCard,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormSwitch,
  Modal,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";

const templates = [
  { name: "Trong hệ thống", id: 1 },
  { name: "Khác", id: 0 },
];

const ArticalListComp = ({ control, watch, setValue, categogyList }) => {
  const { data, isFetching } = useQuery(
    [
      "Page",
      {
        PageIndex: 1,
        PageSize: 99999,
        OrderBy: "PageTypeId",
        PageTypeId: watch().PageTypeId,
      },
    ],
    () =>
      Page.getList({
        PageIndex: 1,
        PageSize: 99999,
        OrderBy: "PageTypeId",
        PageTypeId: watch().PageTypeId,
      }).then((res) => res?.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        return data?.Items;
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage);
      },
      refetchOnWindowFocus: false,
      staleTime: 5000,
    }
  );
  return (
    <>
      <div className="col-span-1">
        <FormSelect
          control={control}
          label="Danh sách bài viết"
          placeholder="Chọn bài viết"
          name="PageId"
          data={data?.Items}
          select={{ label: "Title", value: "Id" }}
          required={false}
          isClearable
          disabled={!watch().IsEdit}
          callback={() => {
            if (watch().PageId) {
              setValue(
                "Link",
                data?.Items.find((x) => x.Id === watch().PageId)?.Code
              );
            } else {
              setValue(
                "Link",
                categogyList.find((x) => x.Id === watch().PageTypeId)?.Code
              );
            }
          }}
          defaultValue={
            watch().PageId && {
              Title: data?.Items.find((x) => x.Id === watch().PageId)?.Title,
              Id: watch().PageId,
            }
          }
        />
      </div>
      <div className="col-span-1">
        <FormInput
          control={control}
          name="Link"
          placeholder=""
          label="Link bài viết"
          disabled={!!watch().IsEdit}
        />
      </div>
    </>
  );
};

const CategoryListComp = ({ control, watch, categogyList, setValue }) => {
  // console.log(dataMenuList, watch().PageTypeId);

  return (
    <>
      <div className="col-span-1">
        <FormSelect
          control={control}
          label="Chuyên mục"
          placeholder="Chọn chuyên mục"
          name="PageTypeId"
          data={categogyList}
          select={{ label: "Name", value: "Id" }}
          required={!!watch().IsEdit}
          rules={{
            required: "This field is required",
          }}
          defaultValue={ watch().PageTypeId && {
            Name: categogyList.find((x) => x.Id === watch().PageTypeId)?.Name,
            Id: watch().PageTypeId,
          }}
          disabled={!watch().IsEdit}
          callback={() => {
            setValue(
              "Link",
              categogyList.find((x) => x.Id === watch().PageTypeId)?.Code
            );
          }}
        />
      </div>
      <ArticalListComp
        control={control}
        watch={watch}
        setValue={setValue}
        categogyList={categogyList}
      />
    </>
  );
};

const EditContentForm: React.FC<any> = ({ edit, onCancel, categogyList }) => {
  // const [data, setData] = useState<any>();

  const { control, handleSubmit, setValue, reset, watch } = useForm<{
    Name: string;
    Link: string;
    Active: boolean;
    Position: number;
    PageTypeId?: number;
    PageId?: number;
    Id: number;
    IsEdit?: number;
    Parent?: number;
  }>({
    mode: "onBlur",
    defaultValues: {
      ...edit,
      IsEdit: edit?.PageTypeId ? 1 : 0,
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    reset({
      ...edit,
      IsEdit: edit?.PageTypeId ? 1 : 0,
    });
  }, [edit?.Id]);

  useEffect(() => {
    reset({
      Name: watch().Name,
      Link: watch().Link,
      Active: watch().Active,
      Position: watch().Position,
      PageTypeId: watch().PageTypeId,
      PageId: null,
      Id: watch().Id,
      IsEdit: watch().IsEdit,
      Parent: watch().Parent
    });
  }, [watch().PageTypeId]);

  const _onPress = (newData: {
    Name: string;
    Link: string;
    Active: boolean;
    Position: number;
    PageTypeId?: number;
    PageId?: number;
    Id: number;
    IsEdit?: number;
  }) => {
    const sendData = { ...newData };

    if (!sendData?.IsEdit) {
      delete sendData?.PageId;
      delete sendData?.PageTypeId;
    }
    delete sendData?.IsEdit;

    onCancel();
    const id = toast.loading("Đang xử lý ...");
    menu
      .update(sendData)
      .then(() => {
        queryClient.invalidateQueries("menuData");
        toast.update(id, {
          render: "Cập nhật thành công",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      });
  };

  return (
    <Modal visible={!!edit?.Id} width={1000}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>Cập nhật menu</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className={`grid grid-cols-2 gap-4`}>
            <div className="col-span-1 grid grid-cols-3 gap-4 h-fit">
              <div className="col-span-2">
                <FormInput
                  control={control}
                  name="Name"
                  label="Tên menu"
                  placeholder={""}
                  rules={{ required: "Vui lòng điền thông tin" }}
                />
              </div>
              <div className="col-span-1">
                <FormInputNumber
                  control={control}
                  name="Position"
                  label="Vị trí menu"
                  placeholder=""
                  rules={{ required: "Vui lòng điền vị trí hiển thị" }}
                />
              </div>
              <div className="col-span-3 grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <FormSelect
                    name="IsEdit"
                    control={control}
                    label="Bài viết trong hệ thống?"
                    data={templates}
                    select={{ label: "name", value: "id" }}
                    placeholder={""}
                    required={false}
                    defaultValue={{
                      name: templates?.find((x) => x.id === watch().IsEdit)
                        ?.name,
                      id: watch().IsEdit,
                    }}
                  />
                </div>
                <div className="col-span-1">
                  <FormSwitch
                    control={control}
                    name="Active"
                    label="Trạng thái"
                    required={false}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 grid grid-cols-1 gap-3 h-fit">
              <CategoryListComp
                control={control}
                watch={watch}
                categogyList={categogyList}
                setValue={setValue}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <IconButton
            onClick={handleSubmit(_onPress)}
            icon="fas fa-edit"
            btnIconClass="!mr-2"
            title="Cập nhật"
            showLoading
            toolip=""
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};

export const EditContentFormMemo = React.memo(EditContentForm);
