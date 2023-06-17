import { Tabs } from "antd";
import router, { useRouter } from "next/router";
import { Control, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Page } from "~/api";
import {
  ArticleListForm,
  ArticleSEOForm,
  FormUpload,
  IconButton,
  Layout,
  ResizeImage,
  toast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

type TForm = Partial<TArticleList & TArticleSEO>;

const Index: TNextPageWithLayout = () => {
  const { query } = useRouter();
  const { control, handleSubmit, getValues, setValue, reset } = useForm<TForm>({
    mode: "onBlur",
  });

  const { data } = useQuery(
    ["articleList", +query?.id],
    () => Page.getByID(+query?.id),
    {
      onSuccess: (data) => {
        reset(data.Data);
        setValue(
          "OGUrl",
          `${window.location.origin}/chuyen-muc/detail/code=${data?.Data?.Code}`
        );
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      enabled: !!query?.id,
    }
  );

  const mutationUpdate = useMutation((data: TForm) => Page.update(data), {
    onSuccess: () => toast.success("Cập nhật bài viết thành công"),
    onError: toast.error,
  });

  const _onPress = async (data: TForm) => {
    try {
      await mutationUpdate.mutateAsync(data);
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
                title="Cập nhật"
                icon="fas fa-pencil"
                showLoading
                btnClass="!mr-4"
                toolip=""
              />
              <IconButton
                title="Trở về"
                icon="fas fa-undo-alt"
                toolip=""
                onClick={() => router.back()}
              />
            </div>
          }
        >
          <Tabs.TabPane key={"1"} tab={"Nội dung bài viết"}>
            <ArticleListForm
              control={control as Control<TArticleList, object>}
              type="edit"
              data={data?.Data}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key={"2"} tab={"Cấu hình SEO"}>
            <ArticleSEOForm
              control={control as Control<TArticleSEO, object>}
              data={data?.Data}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.post.editPost;
Index.breadcrumb = breadcrumb.article.articleList.detail;
Index.Layout = Layout;

export default Index;
