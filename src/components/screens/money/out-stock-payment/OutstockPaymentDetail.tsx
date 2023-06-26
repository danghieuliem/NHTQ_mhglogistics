import { Divider, Spin, Table } from "antd";
import React, { useRef } from "react";
import { useQuery } from "react-query";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { toast } from "react-toastify";
import { outStockSession } from "~/api";
import configHomeData from "~/api/config-home";
import { DataTable, FilterInput, IconButton } from "~/components";
import { smallPackageStatusData } from "~/configs";
import { TColumnsType, TTable } from "~/types/table";
import { _format } from "~/utils";
import TagStatus from "../../status/TagStatus";

const fullNameProps = {
  placeholder: "Nhập họ tên người nhận",
  label: "Họ tên người nhận",
  id: "fullName",
  name: "fullName",
};

const phoneNumberProps = {
  placeholder: "Số điện thoại người nhận",
  label: "Nhập số điện thoại người nhận",
  id: "phoneNumber",
  name: "phoneNumber",
};

type TProps = {
  type: "payment" | "print";
  item?: TOutStockSession;
  handleRefetch?: () => Promise<unknown>;
  handleUser?: React.Dispatch<
    React.SetStateAction<{ name: string; phone: string }>
  >;
  user?: { name: string; phone: string };
  fetching?: boolean;
};

export const OutstockPaymentDetail: React.FC<
  TTable<TMoneyOutstockPaymentDetail> & TProps
> = ({ fetching, type, item, loading, handleUser, handleRefetch, user }) => {
  const componentRef = useRef<ReactToPrint>(null);

  const { data: configData } = useQuery(
    ["configData"],
    () => configHomeData.get(),
    {
      onSuccess: (res) => {
        return res?.Data;
      },
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const columns: TColumnsType<TOutStockSessionPackages> = [
    {
      dataIndex: "Id",
      title: "STT",
      render: (_, __, index) => ++index,
    },
    {
      dataIndex: "MainOrderID",
      title: "ID đơn hàng",
    },
    {
      dataIndex: "SmallPackage",
      title: "Mã kiện",
      align: "right",
      render: (smallPackage: TSmallPackage) =>
        smallPackage?.OrderTransactionCode,
    },
    {
      dataIndex: "SmallPackage",
      title: "Cân nặng (kg)",
      align: "right",
      render: (smallPackage: TSmallPackage) =>
        _format.getVND(smallPackage?.PayableWeight, ""),
    },
    {
      dataIndex: "SmallPackage",
      title: "Số khối (m3)",
      align: "right",
      render: (smallPackage: TSmallPackage) =>
        _format.getVND(smallPackage?.VolumePayment, ""),
    },
    {
      dataIndex: "SmallPackage",
      title: "Trạng thái kiện",
      render: (smallPackage: TSmallPackage) => (
        <TagStatus
          color={
            smallPackageStatusData.find((x) => smallPackage?.Status === x.id)
              ?.color
          }
          statusName={smallPackage?.StatusName}
        />
      ),
    },
    {
      dataIndex: "IsPayment",
      title: "Trạng thái thanh toán",
      render: (isPayment: boolean) => (
        <TagStatus
          color={isPayment ? "#1965e0" : "#f52525"}
          statusName={isPayment ? "Đã thanh toán" : "Chưa thanh toán"}
        />
      ),
    },
    {
      dataIndex: "OrderRemaining",
      title: "Số tiền cần thanh toán (VNĐ)",
      align: "right",
      render: (money) => (
        <b className="text-warning">{_format.getVND(money, " ")}</b>
      ),
    },
  ];

  const summary = () => {
    return (
      <React.Fragment>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng cân nặng</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} align="right">
            {_format.getVND(
              item?.OutStockSessionPackages?.reduce(
                (prev, cur) => prev + cur?.SmallPackage?.PayableWeight,
                0
              ),
              " Kg"
            ) || "0 Kg"}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tổng số khối</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align="right">
            {item?.OutStockSessionPackages?.reduce(
              (prev, cur) => prev + cur?.SmallPackage?.VolumePayment,
              0
            ).toFixed(5) + " m3"}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Số dư tài khoản khách</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={1} align="right">
            {_format.getVND(item?.UserWallet)}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={7}>
            <b>Tiền cần thanh toán</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} align="right">
            <b className="text-warning">{_format.getVND(item?.TotalPay)}</b>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </React.Fragment>
    );
  };

  const onPayment = async (IsPaymentWallet: boolean) => {
    const id = toast.loading("Đang xử lý ...");
    outStockSession
      .updateStatus({
        Id: item?.Id,
        Status: 2,
        IsPaymentWallet,
      })
      .then((res) => {
        toast.update(id, {
          render: "Thanh toán thành công!",
          isLoading: false,
          autoClose: 3000,
          type: "success",
        });
        handleRefetch();
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          isLoading: false,
          autoClose: 3000,
          type: "error",
        });
      });
  };

  const ComponentToPrint = React.forwardRef<{}, {}>((props, ref: any) => {
    return (
      <div className="w-full mb-10 p-4" ref={ref}>
        <div className="text-xs text-black">
          {_format.getVNDate(new Date())}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="text-xs text-black my-2 font-bold uppercase">
              {/* NHAPHANGTQ.MONAMEDIA.NET */}
              {configData?.Data?.CompanyLongName}
            </div>
            <div className="text-xs text-black">
              {/* Địa chỉ: 373/226 Lý Thường Kiệt, P8, Q. Tân Bình, TP. HCM */}
              {/* {configData?.Data?.Address} */}
              <span
                dangerouslySetInnerHTML={{
                  __html: configData?.Data?.Address,
                }}
              ></span>
            </div>
            <div className="text-xs text-black">
              Website: {configData?.Data?.WebsiteName}
            </div>
            <div className="text-xs text-black">
              Điện thoại: {configData?.Data?.Hotline}
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-right ml-auto max-w-[270px]">
              <div className="text-xs my-2 text-center text-black">
                Mẫu số 01 - TT
              </div>
              <div className="text-xs text-black text-center">
                (Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ
                tài chính)
              </div>
            </div>
          </div>
        </div>
        <div className="text-2xl my-8 text-black font-bold text-center">
          PHIẾU XUẤT KHO
          <div className="text-sm text-black font-normal text-center">
            Thời gian xuất kho: {_format.getVNDate(new Date())}
          </div>
        </div>
        <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex justify-between">
          Họ và tên người đến nhận: <p className="w-48">{user.name}</p>
        </div>
        <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex justify-between">
          Số điện thoại người đến nhận: <p className="w-48">{user.phone}</p>
        </div>
        {/* <div className="border-b border-b-[rgba(0,0,0,.3)] text-black text-sm my-3 border-dashed flex justify-between">
					Số dư hiện tại: <p className="w-48">{_format.getVND(15000000)}</p>
				</div> */}
        <div className="text-black text-sm my-3">Danh sách kiện:</div>
        <table className="table-preview">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Mã kiện</th>
              <th>Cân thực (kg)</th>
              <th>Số khối (m3)</th>
              <th>Kích thước (D x R x C)</th>
              <th>Phí cân nặng (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {item?.OutStockSessionPackages.map((item, index) => {
              return (
                <tr key={item.Id}>
                  <td>{++index}</td>
                  <td>{item?.OrderTransactionCode}</td>
                  <td>{item?.SmallPackage?.Weight}</td>
                  <td>{item?.SmallPackage?.VolumePayment}</td>
                  <td>{item?.SmallPackage?.LWH}</td>
                  <td>{_format.getVND(item?.SmallPackage?.PriceWeight, "")}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={5}>Tổng tiền cần thanh toán</td>
              <td>
                {_format.getVND(
                  Number(
                    item?.OutStockSessionPackages.reduce(
                      (prev, cur) => prev + cur?.TotalPriceVND,
                      0
                    )
                  )
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <strong>***Lưu ý:</strong>
          <div className="text-sm">
            * Quý khách vui lòng quay video trong khi mở hàng, giữ lại tư liệu
            hộp và mã vận đơn để chúng tôi có tư liệu phản ánh với shop nếu phát
            sinh lỗi
          </div>
          <div className="text-sm">
            * Sản phẩm có xảy ra lỗi vui lòng phản hồi trong 24h, Sau thời gian
            trên đơn hàng được xác nhận hoàn thành.
          </div>
          <div className="text-sm">
            * Mọi chính sách được cập nhật tại mục CHÍNH SÁCH trên Website.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <div className="text-center text-base">Người xuất hàng</div>
            <div className="text-center text-sm">(Ký, họ tên)</div>
          </div>
          <div className="col-span-1">
            <div className="text-center text-base">Người nhận</div>
            <div className="text-center text-sm">(Ký, họ tên)</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Spin spinning={fetching}>
      <div className="hidden">
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className="tableBox w-fit py-4 mb-4">
        <div className="flex items-center">
          <div className="IconFilter text-blue bg-[#e7f6fa]">
            <i className="far fa-poll text-[28px]"></i>
          </div>
          <div className="ml-4">
            <p>Tổng tiền thanh toán</p>
            <p className="text-blue font-semibold text-right">
              {_format.getVND(item?.TotalPay)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end ">
        <div className="flex">
          <div className="">
            <FilterInput
              {...fullNameProps}
              inputClassName={"bg-[#333]"}
              value={user.name}
              // handleSearch={(val) =>
              // 	handleUser((prev) => ({...prev, name: val}))
              // }
            />
          </div>
          <div className="ml-3">
            <FilterInput
              {...phoneNumberProps}
              value={user.phone}
              // handleSearch={(val) =>
              // 	handleUser((prev) => ({...prev, phone: val}))
              // }
            />
          </div>
        </div>
        <div className="flex items-center">
          {!!item?.OutStockSessionPackages.find((x) => !x.IsPayment) ? (
            <React.Fragment>
              <IconButton
                icon="far fa-dollar-sign"
                title="Thanh toán bằng tiền mặt"
                onClick={() => onPayment(false)}
                btnClass="!mr-2"
                showLoading
                toolip=""
              />
              <IconButton
                icon="fas fa-credit-card"
                title="Thanh toán"
                onClick={() => onPayment(true)}
                btnClass="!mr-2"
                showLoading
                toolip="Thanh toán bằng ví điện tử!"
              />
              <IconButton
                icon="fas fa-sync"
                title="Reload"
                onClick={handleRefetch}
                btnClass="!mr-2"
                showLoading
                toolip=""
              />
            </React.Fragment>
          ) : (
            <ReactToPrint content={() => componentRef.current}>
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <IconButton
                    icon="fas fa-print"
                    title="In phiếu xuất kho"
                    onClick={() =>
                      outStockSession.export({ Id: item.Id }).then(() => {
                        handleRefetch();
                        handlePrint();
                      })
                    }
                    btnClass="!mr-2"
                    showLoading
                    toolip=""
                  />
                )}
              </PrintContextConsumer>
            </ReactToPrint>
          )}
        </div>
      </div>
      <Divider />
      <div className="tex-center inline-block text-sm text-[#ed5b00] font-bold">
        <span> Phiếu xuất kho #{item?.Id}</span>
      </div>
      <DataTable
        {...{
          columns,
          data: item?.OutStockSessionPackages,
          bordered: true,
          summary: !loading ? summary : undefined,
          // expandable: expandable,
        }}
      />
    </Spin>
  );
};
