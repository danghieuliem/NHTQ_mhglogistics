import { Tag } from "antd";
import React, { useRef, useState } from "react";
import { ActionButton, DataTable } from "~/components";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import { ServiceForm } from "./ServiceForm";

export const ServiceList: React.FC<TTable<TService> & { refetchService }> = ({
  data,
  refetchService,
}) => {
  const columns: TColumnsType<TService> = [
    {
      dataIndex: "Id",
      title: "Vị trí",
      render: (_, __, index) => ++index,
      width: 70
    },
    {
      dataIndex: "IMG",
      align: "center",
      title: "Hình ảnh",
      render: (_, record) => (
        <img
          src={record.IMG}
          width={30}
          height={30}
          style={{ margin: "auto" }}
        />
      ),
    },
    {
      dataIndex: "Name",
      title: "Tên dịch vụ",
    },
    {
      dataIndex: "Active",
      title: "Trạng thái",
      render: (_, record) => (
        <Tag color={record.Active ? "green" : "red"}>
          {record.Active ? "Hiện" : "Ẩn"}
        </Tag>
      ),
    },
    {
      dataIndex: "Created",
      title: "Ngày tạo",
      render: (date) => _format.getVNDate(date),
    },
    {
      dataIndex: "action",
      align: "right",
      title: "Thao tác",
      render: (_, record) => (
        <ActionButton
          icon="fas fa-edit"
          onClick={() => handleModal(record)}
          title="Cập nhật"
        />
      ),
    },
  ];

  const item = useRef<TService>();
  const [modal, setModal] = useState(false);
  const handleModal = (itemSelected: TService) => {
    item.current = itemSelected;
    setModal(true);
  };

  // const expandable = {
  // 	expandedRowRender: (record) => (
  // 		<ul className="px-2 text-xs">
  // 			<li className="sm:hidden flex justify-between py-2">
  // 				<span className="font-medium mr-4">Hình ảnh:</span>
  // 				<img src="/cart.jpg" width={40} height={40} />
  // 			</li>
  // 			<li className="md:hidden flex justify-between py-2">
  // 				<span className="font-medium mr-4">Trạng thái:</span>
  // 				<Tag color={record.Active ? "green" : "red"}>{record.Active ? "Hiện" : "Ẩn"}</Tag>
  // 			</li>
  // 			<li className="lg:hidden flex justify-between py-2">
  // 				<span className="font-medium mr-4">Ngày tạo:</span>
  // 				{_format.getVNDate(record.Created)}
  // 			</li>
  // 			<li className="xl:hidden flex justify-between py-2">
  // 				<span className="font-medium mr-4">Thao tác:</span>
  // 				<ActionButton icon="fas fa-edit" onClick={() => handleModal(record)} title="Cập nhật" />
  // 			</li>
  // 		</ul>
  // 	),
  // };

  return (
    <React.Fragment>
      <DataTable
        {...{
          columns,
          data,
          title: "DANH SÁCH DỊCH VỤ",
          // expandable: expandable,
        }}
      />
      <ServiceForm
        {...{
          onCancel: () => setModal(false),
          visible: modal,
          defaultValues: item.current,
          refetchService: refetchService,
        }}
      />
    </React.Fragment>
  );
};
