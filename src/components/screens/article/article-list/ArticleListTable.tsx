import { Pagination, Space, Tag } from "antd";
import router from "next/router";
import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { useCatalogue } from "~/hooks/useCatalogue";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
type TProps = {
  filter: {
    TotalItems: number;
    PageIndex: number;
    PageSize: number;
  };
  handleFilter: (newFilter) => void;
};
export const ArticleListTable: FC<TTable<TPage> & TProps> = ({
  data,
  loading,
  filter,
  handleFilter,
}) => {
  const { pageType } = useCatalogue({ pageTypeEnabled: true });  

  const columns: TColumnsType<TPage> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "Title",
      title: "Tiêu đề bài viết",
    },
    {
      dataIndex: "Code",
      title: "Link bài viết",
    },
    {
      dataIndex: "Active",
      title: "Trạng thái",
      render: (_, record) => (
        <Tag color={!record.Active ? "red" : "green"}>
          {!record.Active ? "Ẩn" : "Hiện"}
        </Tag>
      ),
    },
    {
      dataIndex: "SideBar",
      title: "Sibebar",
      render: (_, record) => (
        <Tag color={!record.SideBar ? "red" : "green"}>
          {!record.SideBar ? "Ẩn" : "Hiện"}
        </Tag>
      ),
    },
    {
      dataIndex: "PageTypeId",
      title: "Chuyên mục",
      render: (_, record) => {
        const Categories = pageType?.find((x) => x?.Id === record?.PageTypeId);
        return <p>{Categories?.Name}</p>;
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <Space>
          <ActionButton
            onClick={() => {
              router.push({
                pathname: "/manager/article/article-list/detail",
                query: { id: record.Id },
              });
            }}
            icon="fad fa-edit"
            title="Cập nhật"
          />
        </Space>
      ),
    },
  ];

  // const expandable = {
  // 	expandedRowRender: (_, record) => (
  // 		<ul className="px-2 text-xs">
  // 			<li className="sm:hidden flex justify-between py-2">
  // 				<span className="font-medium mr-4">Trạng thái:</span>
  // 				<Tag color={record.Status ? "green" : "red"}>Hiện</Tag>
  // 			</li>
  // 			<li className="md:hidden flex justify-between py-2">
  // 				<span className="font-medium mr-4">Chuyên mục:</span>
  // 				{record.categoryName}
  // 			</li>
  // 			<li className="lg:hidden flex justify-between py-2">
  // 				<span className="font-medium mr-4">Ngày tạo:</span>
  // 				{_format.getVNDate(record.createdAt)}
  // 			</li>
  // 			<li className="xl:hidden flex justify-between py-2">
  // 				<span className="font-medium mr-4">Thao tác:</span>
  // 				<Space>
  // 					<ActionButton
  // 						onClick={() => {
  // 							router.push({
  // 								pathname: "/manager/article/article-list/detail",
  // 								query: {id: record.Id},
  // 							});
  // 						}}
  // 						icon="fad fa-edit"
  // 						title="Cập nhật"
  // 					/>
  // 				</Space>
  // 			</li>
  // 		</ul>
  // 	),
  // };

  return (
    <>
      <DataTable
        {...{
          columns,
          data,
          bordered: true,
          // expandable: expandable,
          loading,
        }}
      />
      <div className="mt-4 text-right">
        <Pagination
          total={filter?.TotalItems}
          current={filter?.PageIndex}
          pageSize={filter?.PageSize}
          onChange={(page, pageSize) =>
            handleFilter({ ...filter, PageIndex: page, PageSize: pageSize })
          }
        />
      </div>
    </>
  );
};
