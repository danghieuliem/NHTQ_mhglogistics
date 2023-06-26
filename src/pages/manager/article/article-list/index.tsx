import Link from "next/link";
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
    PageSize: 20,
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
      <div className="flex justify-between items-end">
        <ArticleFilterBase handleFilter={handleFilter} />
        <Link href={"/manager/article/article-list/add"}>
          <a target="_blank">
            <IconButton
              btnClass={"iconGreen"}
              icon="far fa-plus"
              title={"Thêm bài viết"}
              showLoading
              toolip=""
            />
          </a>
        </Link>
      </div>
      <ArticleListTable
        data={data?.Items}
        loading={isFetching}
        filter={filter}
        handleFilter={handleFilter}
      />
    </>
  );
};

Index.displayName = SEOConfigs.post.listPost;
Index.breadcrumb = breadcrumb.article.articleList.main;
Index.Layout = Layout;
export default Index;
