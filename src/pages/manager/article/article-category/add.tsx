import { Tabs } from "antd";
import router from "next/router";
import { Control, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { pageType } from "~/api";
import {
  AddArticleCategoryForm,
  ArticleSEOForm,
  IconButton,
  Layout,
  ResizeImage,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

type TForm = Partial<TArticleCategory & TArticleSEO & { sideBar: boolean }>;

const Index: TNextPageWithLayout = () => {
  const { control, handleSubmit } = useForm<TForm>({
    mode: "onBlur",
  });

  const mutationAdd = useMutation((data: any) => pageType.create(data), {
    onSuccess: () => toast.success("Tạo chuyên mục thành công"),
    onError: toast.error,
  });

  const _onPress = async (data: any) => {
    try {
      await mutationAdd.mutateAsync(data);
    } catch (error) {}
  };

  return (
    <>
      <div className="tableBox mb-6">
        <ResizeImage />
      </div>
      <div className="tableBox">
        <Tabs
          tabBarExtraContent={
            <div className="mb-4">
              <IconButton
                onClick={handleSubmit(_onPress)}
                icon="far fa-plus"
                title="Tạo mới"
                btnClass="!mr-4"
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
          }
        >
          <Tabs.TabPane key={"1"} tab="Nội dung chuyên mục">
            <AddArticleCategoryForm
              control={
                control as Control<
                  TArticleCategory & { sideBar: boolean },
                  object
                >
              }
            />
          </Tabs.TabPane>
          <Tabs.TabPane key={"2"} tab="Cấu hình SEO">
            <ArticleSEOForm control={control as Control<TArticleSEO, object>} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.post.addCategories;
Index.breadcrumb = breadcrumb.article.articleCategory.add;
Index.Layout = Layout;

export default Index;
