import {
  FormEditor,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
  FormUpload,
  ResizeImage,
} from "~/components";
import { TControl } from "~/types/field";

type TProps = TControl<TArticleList> & {
  type: "add" | "edit";
  data?: any;
  pageType?: any;
};

export const ArticleListForm: React.FC<TProps> = ({
  control,
  type,
  data,
  pageType,
}) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-2">
        <div className="col-span-full md:col-span-3">
          <div className="mb-4">
            <FormInput
              control={control}
              label="Tiêu đề"
              placeholder=""
              name="Title"
              rules={{
                required: "This field is required",
              }}
            />
          </div>
          <div className="mb-4">
            <FormSelect
              control={control}
              label="Chuyên mục"
              placeholder="Chọn chuyên mục"
              name="PageTypeId"
              data={pageType}
              select={{ label: "Name", value: "Id" }}
              rules={{
                required: "This field is required",
              }}
              defaultValue={
                type === "edit"
                  ? {
                      Name: pageType?.find(
                        (item) => item?.Id === data?.PageTypeId
                      )?.Name,
                      Id: data?.PageTypeId,
                    }
                  : null
              }
            />
          </div>
          <div className="mb-4">
            <FormTextarea
              control={control}
              name="Summary"
              label="Mô tả ngắn"
              required={false}
              inputClassName="!h-[260px]"
              placeholder="Mô tả ngắn cho bài viết"
            />
          </div>
          <div className="mb-4">
            <FormUpload
              control={control}
              name="IMG"
              label="Ảnh đại diện"
              required={false}
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-4">
              <FormSwitch
                control={control}
                name="Active"
                label="Trạng thái"
                required={false}
              />
            </div>
            {type === "edit" && (
              <div className="col-span-1">
                <FormSwitch
                  control={control}
                  name="SideBar"
                  label="Sidebar"
                  required={false}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-full md:col-span-9 min-h-[700px]">
          <FormEditor
            control={control}
            label=""
            name="PageContent"
            required={false}
          />
        </div>
      </div>
    </>
  );
};
