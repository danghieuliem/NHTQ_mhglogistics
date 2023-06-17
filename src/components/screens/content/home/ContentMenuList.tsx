import { Popconfirm, Space, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { menu } from "~/api";
import {
  ActionButton,
  AddChildContentForm,
  AddNewContentForm,
  DataTable,
  EditContentForm,
  toast,
} from "~/components";
import { IconButton } from "~/components/globals/button/IconButton";
import { TColumnsType, TTable } from "~/types/table";

export const ContentMenuList: React.FC<TTable<any>> = ({ data }) => {
  const [addNewModal, setAddNewModal] = useState(false);
  const [edit, setEdit] = useState(0);
  const [child, setChild] = useState(0);

  const queryClient = useQueryClient();
  const mutationDelete = useMutation((id: any) => menu.delete(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("menuData");
      toast.success("Xoá thành công");
    },
    onError: toast.error,
  });

  const _onRemove = async (id: any) => {
    try {
      await mutationDelete.mutateAsync(id);
    } catch (error) {}
  };

  const columns: TColumnsType<any> = [
    {
      dataIndex: "Position",
      title: "Vị trí",
      render: (_, __, index) => ++index,
    },
    {
      dataIndex: "Name",
      title: "Tên menu",
    },
    {
      dataIndex: "Active",
      title: "Trạng thái",
      render: (_, record) => (
        <Tag color={record?.Active ? "green" : "red"}>
          {record?.Active ? "Hiện" : "Ẩn"}
        </Tag>
      ),
    },
    {
      dataIndex: "action",
      align: "right",
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <ActionButton
            icon="fas fa-edit"
            onClick={() => setEdit(record?.Id)}
            title="Chỉnh sửa nội dung"
          />
          <ActionButton
            icon="fas fa-layer-plus"
            onClick={() => setChild(record?.Id)}
            title="Thêm menu con"
            iconContainerClassName="iconGreen"
          />
          <Popconfirm
            onConfirm={() => _onRemove(record?.Id)}
            placement="topRight"
            title="Bạn muốn xoá menu này?"
            okText="Yes"
            cancelText="No"
          >
            <ActionButton
              icon="fas fa-trash-alt"
              title="Delete"
              iconContainerClassName="iconGreen"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="md:flex items-center justify-between pb-4 border-[#333]">
        <p className="text-[16px] text-main font-[600]">
          DANH SÁCH MENU
        </p>
        <IconButton
          onClick={() => setAddNewModal(true)}
          btnIconClass={""}
          title="Thêm"
          icon="far fa-plus"
          showLoading
          toolip="Thêm menu"
          btnClass="iconGreen mt-[-10px]"
        />
      </div>
        <DataTable
          {...{
            data: data,
            columns,
            isExpand: true,
            expandable: {
              expandIcon: ({ expanded, onExpand, record }) =>
                record?.Children.length > 0 ? (
                  <>
                    {expanded ? (
                      <i
                        className="fas fa-folder-open"
                        onClick={(e) => onExpand(record, e)}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-folder-plus"
                        onClick={(e) => onExpand(record, e)}
                      ></i>
                    )}
                  </>
                ) : (
                  <div className="">
                    <i className="fas fa-folder"></i>
                  </div>
                ),
              expandedRowRender: (record) => {
                const OrderBy = record?.Children.sort(
                  (a, b) => a?.Position - b?.Position
                );
                return OrderBy?.map((item) => (
                  <div
                    key={item?.Id}
                    className="flex justify-between items-center"
                  >
                    <div className="">
                      {/* <Tooltip title="Vị trí menu" className="mr-4">
												{item?.Position}
											</Tooltip> */}
                      <Tooltip title="Trạng thái">
                        <Tag
                          color={item?.Active ? "green" : "red"}
                          className="mr-4"
                        >
                          {item?.Active ? "Hiện" : "Ẩn"}
                        </Tag>
                      </Tooltip>
                      <Tooltip
                        title="Tên menu con"
                        className="ml-1 text-[12px] text-[#6b6f82]"
                      >
                        {item?.Name}
                      </Tooltip>
                      {/* <Tooltip title="Trạng thái">
												<Tag color={item?.Active ? "green" : "red"}>{item?.Active ? "Hiện" : "Ẩn"}</Tag>
											</Tooltip> */}
                    </div>
                    <Space>
                      <div>
                        <ActionButton
                          icon="fas fa-edit"
                          onClick={() => setEdit(item?.Id)}
                          title="Chỉnh sửa nội dung"
                        />
                      </div>
                      <div>
                        <Popconfirm
                          onConfirm={() => _onRemove(item?.Id)}
                          placement="topRight"
                          title="Bạn muốn xoá menu này?"
                          okText="Yes"
                          cancelText="No"
                        >
                          <ActionButton
                            icon="fas fa-trash-alt"
                            title="Delete"
                            iconContainerClassName="iconGreen"
                          />
                        </Popconfirm>
                      </div>
                    </Space>
                  </div>
                ));
              },
              rowExpandable: (record) => record?.Children.length > 0,
            },
          }}
        />

      <AddNewContentForm
        visible={addNewModal}
        onCancel={() => setAddNewModal(false)}
      />
      <EditContentForm edit={edit} onCancel={() => setEdit(0)} />
      <AddChildContentForm child={child} onCancel={() => setChild(0)} />
    </React.Fragment>
  );
};
