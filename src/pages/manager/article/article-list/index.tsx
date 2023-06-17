import router from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { Page } from "~/api";
import {
  ArticleFilterBase,
  ArticleListTable,
  IconButton,
  Layout,
  showToast,
} from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  const handleFilter = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  const [filter, setFilter] = useState({
    PageIndex: 1,
    PageSize: 10,
    OrderBy: "PageTypeId",
    SearchContent: null,
    TotalItems: null,
    PageTypeId: null,
  });

  const { data, isFetching } = useQuery(
    ["Page", { ...filter }],
    () => Page.getList(filter).then((res) => res?.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) =>
        setFilter({
          ...filter,
          TotalItems: data?.TotalItem,
          PageIndex: data?.PageIndex,
          PageSize: data?.PageSize,
        }),
      onError: (error) => {
        showToast({
          title:
            (error as any)?.response?.data?.ResultCodepin === 500 &&
            "Lỗi server!",
          message: (error as any)?.response?.data?.ResultMessage,
          type: "error",
        });
      },
    }
  );

  return (
    <>
      <div className="tableBox">
        <div className="flex justify-between items-end pb-4 px-[10px]">
          <ArticleFilterBase handleFilter={handleFilter} />
          <IconButton
            onClick={() => router.push("/manager/article/article-list/add")}
            btnClass={"iconGreen"}
            icon="far fa-plus"
            title={"Thêm bài viết"}
            showLoading
            toolip=""
          />
        </div>
        <ArticleListTable
          data={data?.Items}
          loading={isFetching}
          filter={filter}
          handleFilter={handleFilter}
        />
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.post.listPost;
Index.breadcrumb = breadcrumb.article.articleList.main;
Index.Layout = Layout;
export default Index;
