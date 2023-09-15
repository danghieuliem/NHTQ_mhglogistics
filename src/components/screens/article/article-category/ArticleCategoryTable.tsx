import { Tooltip } from "antd";
import Link from "next/link";
import { FC } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

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
        <TagStatus
          color={!record.Active ? "red" : "green"}
          statusName={!record.Active ? "Ẩn" : "Hiện"}
        />
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
        <Link
          href={`/manager/article/article-category/detail/?id=${record?.Id}`}
        >
          <a target="_blank">
            <ActionButton icon="fad fa-edit" title="Cập nhật" isButton />
          </a>
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        // expandable: expandable,
        loading,
        pagination,
        extraElmentClassName: "w-fit ml-auto",
        extraElment: (
          <div>
            <Link href="/manager/article/article-category/add">
              <a target="_blank">
                <ActionButton
                  icon="fas fa-plus-circle"
                  title={"Thêm chuyên mục"}  
                  isButton isButtonClassName="bg-green !text-white" 
                />
              </a>
            </Link>
          </div>
        ),
      }}
    />
  );
};
