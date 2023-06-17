import router from "next/router";
import { useQuery } from "react-query";
import { pageType } from "~/api";
import { ArticleCategoryTable, IconButton, Layout, toast } from "~/components";
import { breadcrumb } from "~/configs";
import { SEOConfigs } from "~/configs/SEOConfigs";
import { TNextPageWithLayout } from "~/types/layout";

const Index: TNextPageWithLayout = () => {
  // const [SearchContent, setSearchContent] = useState<string>(null);
  // const [filter, setFilter] = useState({

  // });

  // const handleFilter = (SearchContent: string) => {
  // 	console.log(SearchContent);
  // 	setSearchContent(SearchContent);
  // };

  const { data, isFetching } = useQuery(
    [
      "pageType",
      {
        PageIndex: 1,
        PageSize: 1000,
        OrderBy: "Id desc",
      },
    ],
    () =>
      pageType
        .getList({
          PageIndex: 1,
          PageSize: 1000,
          OrderBy: "Id desc",
        })
        .then((res) => {
          return res?.Data;
        }),
    {
      onSuccess: (data) => data?.Items,
      onError: toast.error,
    }
  );

  return (
    <>
      <div className="tableBox">
        <div className="flex justify-end items-end mb-4">
          {/* <ArticleFilterBase handleFilter={handleFilter} /> */}
          <div className="col-span-1 xl:text-left text-left xl:mb-0">
            <IconButton
              onClick={() =>
                router.push("/manager/article/article-category/add")
              }
              btnClass={"iconGreen w-[180px]"}
              icon="far fa-plus"
              title={"Thêm chuyên mục"}
              showLoading
              toolip=""
            />
          </div>
        </div>
        <ArticleCategoryTable data={data?.Items} loading={isFetching} />
      </div>
    </>
  );
};

Index.displayName = SEOConfigs.post.Categories;
Index.breadcrumb = breadcrumb.article.articleCategory.main;
Index.Layout = Layout;

export default Index;
