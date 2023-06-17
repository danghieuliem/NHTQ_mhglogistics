import { Tag } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { ContactUs } from "~/api/contact-us";
import { DataTable, IconButton, Layout, toast } from "~/components";
import { useAppSelector } from "~/store";
import { TNextPageWithLayout } from "~/types/layout";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

const Index: TNextPageWithLayout = () => {
  const { current: newUser } = useAppSelector((state) => state.user);
  if (!newUser) return null;
  const [idContact, setIdContact] = useState([]);
  const [dataContact, setDataContact] = useState([]);

  const { refetch, isFetching, isLoading } = useQuery(["contact-us"], () =>
    ContactUs.getList({
      PageIndex: 1,
      PageSize: 99999,
      OrderBy: "Id desc",
    }).then((res) => setDataContact(res?.Data?.Items))
  );

  const handleContact = () => {
    ContactUs.update(idContact)
      .then((res) => {
        refetch();
        toast.success("Đã check liên hệ!");
      })
      .catch((error) => {
        toast.error("Đã xảy ra lỗi!");
      });
  };

  const columns: TColumnsType<any> = [
    {
      dataIndex: "Id",
      title: "STT",
      render: (_, __, index) => <>{++index}</>,
      width: 50,
    },
    {
      dataIndex: "FullName",
      title: "Họ tên",
    },
    {
      dataIndex: "Email",
      title: "Email",
    },
    {
      dataIndex: "Phone",
      title: "Số điện thoại",
    },
    {
      dataIndex: "Content",
      title: "Khách ghi chú",
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      sorter: (a, b) => a.Status - b.Status,
      render(value, record, index) {
        return (
          <Tag color={record?.Status ? "green" : "red"}>
            {record?.Status ? "Đã liên hệ" : "Chưa liên hệ"}
          </Tag>
        );
      },
    },
    {
      dataIndex: "Created",
      title: "Ngày khách liên hệ",
      render: (_, record) => {
        return <>{_format.getVNDate(record?.Created)}</>;
      },
    },
  ];

  return (
    <div className="tableBox text-right">
      <IconButton
        onClick={() => handleContact()}
        title="Xác nhận đã liên hệ"
        icon="fas fa-user-check"
        btnClass="mb-4"
        btnIconClass="mr-3"
        disabled={
          idContact.length > 0 || isFetching || isLoading ? false : true
        }
      />
      <DataTable
        {...{
          data: dataContact,
          columns,
          rowSelection: {
            type: "checkbox",
            onChange: (val) => setIdContact(val),
            getCheckboxProps(record: any) {
              return {
                disabled: record?.Status,
              };
            },
          },
        }}
      />
    </div>
  );
};

Index.displayName = "Danh sách khách hàng liên hệ";
Index.breadcrumb = "Danh sách khách hàng cần liên hệ";
Index.Layout = Layout;

export default Index;
