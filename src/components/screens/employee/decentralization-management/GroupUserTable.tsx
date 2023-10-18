import router from "next/router";
import { ActionButton } from "~/components";
import { DataTable } from "~/components/globals/table";
import { TColumnsType } from "~/types/table";

export const GroupUserTable = ({ data }) => {
  const columns: TColumnsType<any> = [
    {
      dataIndex: "Id",
      title: "Mã user",
      align: "center",
      render: (_, __, index) => index,
      sorter: true,
    },
    {
      dataIndex: "Name",
      title: "Nhóm user",
      align: "center",
      sorter: true,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, item) => {
        return (
          <ActionButton
            icon={"fas fa-info"}
            title={""}
            onClick={() =>
              router.push({
                pathname:
                  "/manager/employee/decentralization-management/detail",
                query: { id: item?.Id },
              })
            }
          />
        );
      },
      responsive: ["sm"],
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};
