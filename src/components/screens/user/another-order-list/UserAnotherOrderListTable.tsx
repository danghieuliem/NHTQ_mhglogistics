import { Divider, Modal } from "antd";
import { TableRowSelection } from "antd/lib/table/interface";
import clsx from "clsx";
import Link from "next/link";
import router from "next/router";
import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { mainOrder, orderShopTemp } from "~/api";
import {
  ActionButton,
  DataTable,
  UserAnotherOrderListFilter,
} from "~/components";
import { EOrderStatus, orderStatus } from "~/configs/appConfigs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

const PaymenComponent = ({
  data,
  selectedRowsList,
  handleDeposit,
  handlePayment,
  selectedRowKeys,
}) => {
  const paymentData = data?.filter((item) => item?.Status === 10);
  const noDepositData = data?.filter((item) => item?.Status === 0);
  const [show, setShow] = useState(false);
  // const [loading, setLoading] = useState(false);

  return (
    <>
      <ActionButton
        isButton
        isButtonClassName="bg-sec !text-white hover:!bg-main"
        title="Đặt cọc/thanh toán"
        icon="fad fa-money-check !mr-2"
        disabled={selectedRowKeys.length <= 0}
        onClick={() => setShow(!show)}
      />
      <Modal
        footer={false}
        visible={show}
        closable={false}
        onCancel={() => setShow(!show)}
      >
        <div className="p-4">
          {noDepositData?.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="col-span-2 flex flex-col">
                <span className="font-bold">Tổng tiền đặt cọc: </span>
                <span className="text-lg text-main font-semibold">
                  {_format.getVND(
                    noDepositData?.reduce(
                      (acc, cur) => acc + cur?.AmountDeposit,
                      0
                    ) || 0
                  )}
                </span>
              </span>
              <ActionButton
                icon="!mr-0"
                title="Đặt cọc"
                isButton
                isButtonClassName="bg-blue h-fit !text-white"
                onClick={() => {
                  handleDeposit(noDepositData);
                  setShow(!show);
                }}
              />
            </div>
          )}
          {noDepositData?.length > 0 && paymentData.length > 0 && (
            <Divider className="!my-2" />
          )}
          {paymentData?.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <span className="col-span-2 flex flex-col">
                  <span className="font-bold">Tổng tiền thanh toán: </span>
                  <span className="text-lg text-main font-semibold">
                    {_format.getVND(
                      paymentData?.reduce(
                        (prev, cur) => prev + cur?.RemainingAmount,
                        0
                      )
                    )}
                  </span>
                </span>
                <ActionButton
                  icon="!mr-0"
                  title="Thanh toán"
                  isButton
                  isButtonClassName="bg-blue h-fit !text-white"
                  onClick={() => {
                    handlePayment(paymentData);
                    setShow(!show);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

const PaymenComponentMemo = React.memo(PaymenComponent);

export const UserAnotherOrderListTable: React.FC<
  TTable<TOrder> & {
    type;
    q;
    moneyOfOrders;
    handleFilter;
  }
> = ({ data, loading, handleModal, type, q, moneyOfOrders, handleFilter }) => {
  const [delLoading, setDelLoading] = useState(false);
  const queryClient = useQueryClient();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleDeleteProd = async (id: number) => {
    setDelLoading(true);
    const idToast = toast.loading("Đang xử lý");
    try {
      await mainOrder.delete(id);
      toast.update(idToast, {
        render: `Hủy đơn hàng #${id} thành công!`,
        type: "success",
        autoClose: 1000,
        isLoading: false,
      });
      queryClient.invalidateQueries("orderList");
      setDelLoading(false);
    } catch (error) {
      toast.update(idToast, {
        render: (error as any)?.response?.data?.ResultMessage,
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      setDelLoading(false);
    }
  };

  const handleAddSameOrder = useCallback((Id: number) => {
    const id = toast.loading("Đang thêm ...");
    orderShopTemp
      .addSame({ Id: Id })
      .then((res) => {
        toast.update(id, {
          render: "Thêm đơn thành công, vui lòng kiểm tra giỏ hàng!",
          type: "success",
          autoClose: 1000,
          closeOnClick: true,
          isLoading: false,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: "Thêm đơn thất bại!",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      });
  }, []);

  const mutationUpdateDeposit = useMutation((data: TOrder[]) =>
    mainOrder.updateOrder(
      data?.map((item) => item.Id),
      { Status: 2 }
    )
  );
  const mutationUpdatePayment = useMutation((data: TOrder[]) =>
    mainOrder.updateOrder(
      data?.map((item) => item?.Id),
      { Status: 7 }
    )
  );

  const handleDeposit = useCallback((data: TOrder[]) => {
    const id = toast.loading("Đang xử lý ...");
    // setLoading(true);

    mutationUpdateDeposit
      .mutateAsync(data)
      .then(() => {
        queryClient.invalidateQueries("orderList");
        queryClient.invalidateQueries("clientData");
        queryClient.invalidateQueries({ queryKey: "menuData" });
        setSelectedRowKeys([]);
        toast.update(id, {
          render: "Đặt cọc thành công.",
          isLoading: false,
          type: "success",
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          isLoading: false,
          type: "error",
          autoClose: 1000,
        });
      });
    // .finally(() => setLoading(false));
  }, []);

  const handlePayment = useCallback((data: TOrder[]) => {
    const id = toast.loading("Đang xử lý ...");
    // setLoading(true);

    mutationUpdatePayment
      .mutateAsync(data)
      .then(() => {
        queryClient.invalidateQueries("orderList");
        queryClient.invalidateQueries("clientData");
        setSelectedRowKeys([]);
        toast.update(id, {
          render: "Đặt cọc thành công.",
          isLoading: false,
          type: "success",
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          isLoading: false,
          type: "error",
          autoClose: 1000,
        });
      });
    // .finally(() => setLoading(false));
  }, []);

  const columns: TColumnsType<TOrder> = [
    {
      dataIndex: "Id",
      title: "ID",
      width: 60,
      responsive: ["lg"],
    },
    {
      dataIndex: "ImageOrigin",
      title: "Ảnh",
      align: "center",
      render: (img) => {
        return (
          <div className="flex justify-center m-auto w-20 h-20">
            <img
              src={img ? img.replaceAll(" ", "") : "/default/pro-empty.jpg"}
              alt="image"
              width={75}
              height={75}
              style={{ borderRadius: "4px", objectFit: "contain" }}
            />
          </div>
        );
      },
      width: 90,
    },
    {
      dataIndex: "TotalPriceVND",
      title: (
        <>
          Tổng tiền <br /> (VNĐ)
        </>
      ),
      align: "right",
      responsive: ["sm"],
      render: (price) => _format.getVND(price, " "),
      width: 120,
    },
    {
      dataIndex: "AmountDeposit",
      title: (
        <>
          Số tiền phải cọc <br /> (VNĐ)
        </>
      ),
      align: "right",
      width: 120,
      responsive: ["md"],
      render: (price) => _format.getVND(price, " "),
    },
    {
      dataIndex: "Deposit",
      title: (
        <>
          Số tiền đã cọc <br />
          (VNĐ)
        </>
      ),
      width: 120,
      align: "right",
      responsive: ["md"],
      render: (price) => _format.getVND(price, " "),
    },
    {
      dataIndex: "DepositDate",
      title: "TimeLine",
      width: 240,
      render: (_, record) => (
        <React.Fragment>
          {record.Created && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.NoDeposit && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Lên đơn: </span>
              <span>
                {_format.getVNDate(record.Created, "HH:mm")} -
                {_format.getVNDate(record.Created, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DepositDate && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.Deposited && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Đặt cọc:</span>
              <span>
                {_format.getVNDate(record.DepositDate, "HH:mm")} -
                {_format.getVNDate(record.DepositDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateBuy && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.Purchased && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Đã mua hàng:</span>
              <span>
                {_format.getVNDate(record.DateBuy, "HH:mm")} -
                {_format.getVNDate(record.DateBuy, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateTQ && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.InChinaWarehoue && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Vê kho TQ:</span>
              <span>
                {_format.getVNDate(record.DateTQ, "HH:mm")} -
                {_format.getVNDate(record.DateTQ, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.DateVN && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.InVietnamWarehoue && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Vê kho VN:</span>
              <span>
                {_format.getVNDate(record.DateVN, "HH:mm")} -
                {_format.getVNDate(record.DateVN, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.PayDate && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.Paid && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Thanh toán:</span>
              <span>
                {_format.getVNDate(record.PayDate, "HH:mm")} -
                {_format.getVNDate(record.PayDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
          {record.CompleteDate && (
            <p
              className={clsx(
                record?.Status === EOrderStatus.Finished && "text-red",
                "flex justify-between px-2"
              )}
            >
              <span>Hoàn thành:</span>
              <span>
                {_format.getVNDate(record.CompleteDate, "HH:mm")} -
                {_format.getVNDate(record.CompleteDate, "DD/MM/YYYY")}
              </span>
            </p>
          )}
        </React.Fragment>
      ),
      responsive: ["xl"],
    },
    {
      dataIndex: "Status",
      title: "Trạng thái",
      render: (status, record) => {
        const color = orderStatus.find((x) => x.id === status);
        return (
          <TagStatus color={color?.color} statusName={record?.StatusName} />
        );
      },
      width: 140,
    },
    {
      dataIndex: "action",
      title: "Thao tác",
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex gap-1 flex-col">
            <Link href={`/user/order-list/detail/?id=${record?.Id}`}>
              <a target="_blank">
                <ActionButton
                  isButton={true}
                  icon="far fa-info-square"
                  title="Chi tiết"
                />
              </a>
            </Link>
            {Number(q) !== 3 && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận muốn mua lại đơn hàng này?",
                    onOk: () => handleAddSameOrder(record?.Id),
                  })
                }
                isButton={true}
                icon="fas fa-cart-arrow-down"
                title="Mua lại đơn"
              />
            )}
            {record?.Status === EOrderStatus.NoDeposit && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận đặt cọc đơn này",
                    onOk: () => handleDeposit([record]),
                  })
                }
                icon="far fa-dollar-sign"
                title="Đặt cọc"
                btnYellow
                isButton={true}
              />
            )}
            {record?.Status === EOrderStatus.InVietnamWarehoue && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận thanh toán đơn này",
                    onOk: () => handlePayment([record]),
                  })
                }
                icon="fas fa-credit-card"
                title="Thanh toán"
                isButtonClassName="bg-blue !text-white"
                isButton={true}
              />
            )}
            {record?.Status === EOrderStatus.NoDeposit && (
              <ActionButton
                onClick={() =>
                  Modal.confirm({
                    title: "Xác nhận xóa đơn hàng?",
                    onOk: () => handleDeleteProd(record?.Id),
                  })
                }
                icon="fas fa-trash"
                isButtonClassName="!bg-red !text-white"
                title="Hủy đơn!"
                btnYellow
                isButton={true}
              />
            )}
            {/* record.IsCheckNotiPrice */}
          </div>
        );
      },
      responsive: ["xl"],
      width: 130,
      fixed: "right",
    },
  ];

  const rowSelection: TableRowSelection<TOrder> = {
    selectedRowKeys,
    getCheckboxProps: (record) => {
      return record.Status === 10 || record.Status === 0
        ? { name: record.Id.toString(), disabled: false }
        : { name: record.Id.toString(), disabled: true, className: "!hidden" };
    },
    onChange: (selectedRowKeys: React.Key[], selectedRows: TOrder[]) => {
      // console.log("selectedRowKeys: ", selectedRowKeys);
      // console.log("selectedRows: ", selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      // handleModal(selectedRows, undefined, "some");
    },
    // hideSelectAll: true,
    // columnWidth: 26,
  };

  const expandable = {
    expandedRowRender: (record: any) => {
      return (
        <div className="extentable">
          <div className="extentable-content">
            <div className="extentable-row lg:hidden">
              <span className="extentable-label">Id đơn: </span>
              <span className="extentable-value">{record?.Id}</span>
            </div>
            <div className="extentable-row sm:hidden">
              <span className="extentable-label">Tổng tiền: </span>
              <span className="extentable-value">
                {_format.getVND(record?.TotalPriceVND)}
              </span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-label">Số tiền phải cọc: </span>
              <span className="extentable-value">
                {_format.getVND(record?.AmountDeposit)}
              </span>
            </div>
            <div className="extentable-row md:hidden">
              <span className="extentable-label">Số tiền đã cọc: </span>
              <span className="extentable-value">
                {_format.getVND(record?.Deposit)}
              </span>
            </div>
            <div className="extentable-row">
              <span className="extentable-label !text-red">
                Số tiền còn lại:{" "}
              </span>
              <span className="extentable-value !text-red">
                {_format.getVND(
                  record?.TotalPriceVND - record?.Deposit,
                  " VNĐ"
                )}
              </span>
            </div>

            {/* timeline */}
            {[
              {
                title: "Lên đơn",
                value: record.Created,
              },
              {
                title: "Đặt cọc",
                value: record.DepositDate,
              },
              {
                title: "Đặt hàng",
                value: record.DateBuy,
              },
              {
                title: "Đã về kho TQ",
                value: record.DateTQ,
              },
              {
                title: "Đã về kho VN",
                value: record.DateVN,
              },
              {
                title: "Thanh toán",
                value: record.PayDate,
              },
              {
                title: "Hoàn thành",
                value: record.CompleteDate,
              },
            ].map(
              (item) =>
                item?.value && (
                  <div className="extentable-row">
                    <span className="extentable-label">{item?.title}: </span>
                    <span className="extentable-value">
                      {_format.getVNDate(item?.value, "HH:mm")} -
                      {_format.getVNDate(item?.value, "DD/MM/YYYY")}
                    </span>
                  </div>
                )
            )}
          </div>
          <div className="extentable-actions">
            {/* button detail */}
            <div className="extentable-button">
              <ActionButton
                onClick={() =>
                  router.push({
                    pathname: "/user/order-list/detail",
                    query: {
                      id: record?.Id,
                    },
                  })
                }
                isButton={true}
                icon="far fa-info-square"
                title="Chi tiết"
              />
            </div>

            {/* mua lại */}
            {Number(q) !== 3 && (
              <div className="extentable-button">
                <ActionButton
                  onClick={() =>
                    Modal.confirm({
                      title: "Xác nhận muốn mua lại đơn hàng này?",
                      onOk: () => {
                        const id = toast.loading("Đang thêm ...");
                        orderShopTemp
                          .addSame({ Id: record?.Id })
                          .then((res) => {
                            toast.update(id, {
                              render:
                                "Thêm đơn thành công, vui lòng kiểm tra giỏ hàng!",
                              type: "success",
                              autoClose: 1000,
                              closeOnClick: true,
                              isLoading: false,
                            });
                          })
                          .catch((error) => {
                            toast.update(id, {
                              render: "Thêm đơn thất bại!",
                              type: "error",
                              isLoading: false,
                            });
                          });
                      },
                    })
                  }
                  isButton={true}
                  icon="fas fa-cart-arrow-down"
                  title="Mua lại"
                />
              </div>
            )}

            {/* khiếu nại */}
            {record?.Status === EOrderStatus.Finished && (
              <div className="extentable-button">
                <ActionButton
                  onClick={() =>
                    router.push({
                      pathname: "/user/report/detail",
                      query: {
                        id: record?.Id,
                      },
                    })
                  }
                  icon="fas fa-balance-scale-right"
                  title="Khiếu nại"
                  btnRed
                  isButton={true}
                />
              </div>
            )}

            {Number(q) === 3 ? (
              <>
                {record?.IsCheckNotiPrice && (
                  <>
                    {record?.Status === EOrderStatus.NoDeposit && (
                      <div className="extentable-button">
                        <ActionButton
                          onClick={() => {
                            type.current = "deposit";
                            handleModal([record], undefined, "one");
                          }}
                          icon="far fa-dollar-sign"
                          title="Đặt cọc"
                          btnYellow
                          isButton={true}
                        />
                      </div>
                    )}
                    {record?.Status === EOrderStatus.InVietnamWarehoue && (
                      <div className="extentable-button">
                        <ActionButton
                          onClick={() => {
                            type.current = "payment";
                            handleModal([record], undefined, "one");
                          }}
                          icon="fas fa-credit-card"
                          title="Thanh toán"
                          btnBlue
                          isButton={true}
                        />
                      </div>
                    )}
                  </>
                )}
                {record?.Status === EOrderStatus.NoDeposit && (
                  <div className="extentable-button">
                    <ActionButton
                      onClick={() =>
                        Modal.confirm({
                          title: "Xác nhận xóa đơn hàng?",
                          onOk: () => handleDeleteProd(record?.Id),
                        })
                      }
                      icon="fas fa-trash"
                      title="Hủy đơn!"
                      btnYellow
                      isButton={true}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                {record?.Status === EOrderStatus.NoDeposit && (
                  <div className="extentable-button">
                    <ActionButton
                      onClick={() => {
                        type.current = "deposit";
                        handleModal([record], undefined, "one");
                      }}
                      icon="far fa-dollar-sign"
                      title="Đặt cọc"
                      btnYellow
                      isButton={true}
                    />
                  </div>
                )}
                {record?.Status === EOrderStatus.InVietnamWarehoue && (
                  <div className="extentable-button">
                    <ActionButton
                      onClick={() => {
                        type.current = "payment";
                        handleModal([record], undefined, "one");
                      }}
                      icon="fas fa-credit-card"
                      title="Thanh toán"
                      btnBlue
                      isButton={true}
                    />
                  </div>
                )}
                {record?.Status === EOrderStatus.NoDeposit && (
                  <div className="extentable-button">
                    <ActionButton
                      onClick={() =>
                        Modal.confirm({
                          title: "Xác nhận xóa đơn hàng?",
                          onOk: () => handleDeleteProd(record?.Id),
                        })
                      }
                      icon="fas fa-trash"
                      title="Hủy đơn!"
                      btnYellow
                      isButton={true}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    },
  };

  return (
    <DataTable
      {...{
        columns,
        data,
        bordered: true,
        rowSelection,
        loading,
        // title: q === "3" ? "Danh sách đơn mua hộ khác" : "Danh sách đơn mua hộ",
        expandable: expandable,
        scroll: { y: 640 },
        mediaWidth: 1200,
        extraElmentClassName:
          "flex items-center !justify-between !w-full flex-wrap",
        extraElment: (
          <>
            <PaymenComponentMemo
              data={data}
              selectedRowKeys={selectedRowKeys}
              handleDeposit={handleDeposit}
              handlePayment={handlePayment}
              selectedRowsList={setSelectedRowKeys}
            />
            <UserAnotherOrderListFilter
              moneyOfOrders={moneyOfOrders}
              numberOfOrder={orderStatus}
              handleFilter={handleFilter}
            />
          </>
        ),
      }}
    />
  );
};
