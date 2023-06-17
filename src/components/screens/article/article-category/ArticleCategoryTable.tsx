import { Tag, Tooltip } from "antd";
import router from "next/router";
import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";

export const ArticleCategoryTable: FC<TTable<TPageType>> = ({
  data,
  loading,
  pagination,
}) => {
  const columns: TColumnsType<TPageType> = [
    {
      dataIndex: "Id",
      title: "ID",
    },
    {
      dataIndex: "Name",
      title: "Tên chuyên mục",
    },
    {
      dataIndex: "Code",
      title: "Link chuyên mục",
      render(value, record, index) {
        return <Tooltip title="Link gắn vào menu">{record?.Code}</Tooltip>;
      },
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
      dataIndex: "Updated",
      title: "Lần cuối thay đổi",
      render: (date) => date && _format.getVNDate(date),
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <ActionButton
          onClick={() => {
            router.push({
              pathname: "/manager/article/article-category/detail",
              query: { id: record?.Id },
            });
          }}
          icon="fad fa-edit"
          title="Cập nhật"
        />
      ),
    },
  ];

  // const expandable = {
  //   expandedRowRender: (record) => (
  //     <ul className="px-2 text-xs">
  //       <li className="sm:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Lần cuối thay đổi:</span>
  //         {_format.getVNDate(record.lastEdited)}
  //       </li>
  //       <li className="xl:hidden flex justify-between py-2">
  //         <span className="font-medium mr-4">Thao tác:</span>

  //         <ActionButton
  //           onClick={() => {
  //             router.push({
  //               pathname: "/manager/article/article-category/detail",
  //               query: { id: record?.Id },
  //             });
  //           }}
  //           icon="fad fa-edit"
  //           title="Cập nhật"
  //         />
  //       </li>
  //     </ul>
  //   ),
  // };

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        // expandable: expandable,
        loading,
        pagination,
      }}
    />
  );
};
