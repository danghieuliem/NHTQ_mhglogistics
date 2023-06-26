import { DataTable } from "~/components/globals/table";
import { TColumnsType } from "~/types/table";
import { _format } from "~/utils";

export const SalesMoneyStatisticTable = ({ data }) => {
  const columns: TColumnsType<TStatisticalMoney> = [
    {
      title: "STT",
      dataIndex: "Name",
      render: (_, __, index) => ++index,
    },
    {
      dataIndex: "Name",
      title: "Mục",
      render: (title) => <div className="text-[#000] font-medium">{title}</div>,
    },
    {
      dataIndex: "Total",
      title: "Tổng tiền (VNĐ)",
      align: "right",
      render: (money: number) => {
        return (
          money !== null && (
            <div className="">
              <span>{_format.getVND(money, " ")}</span>
            </div>
          )
        );
      },
    },
    // {
    //   dataIndex: "NotPay",
    //   title: (
    //     <>
    //       ĐẶT CỌC &#8594; HÀNG VỀ VN <br /> (VNĐ)
    //     </>
    //   ),
    //   render: (money: number) =>
    //     money !== null && (
    //       <div className="">
    //         <span>{_format.getVND(money, " ")}</span>
    //       </div>
    //     ),
    //   responsive: ["xl"],
    //   align: "right",
    // },
    // {
    //   dataIndex: "Pay",
    //   title: (
    //     <>
    //       ĐÃ THANH TOÁN &#8594; ĐÃ HOÀN THÀNH <br /> (VNĐ)
    //     </>
    //   ),
    //   align: "right",
    //   render: (money: number) =>
    //     money !== null && (
    //       <div className="">
    //         <span>{_format.getVND(money, " ")}</span>
    //       </div>
    //     ),
    //   responsive: ["xl"],
    // },
  ];

  return (
    <>
      {
        <DataTable
          {...{
            columns,
            data,
            bordered: true,
            // summary,
            rowKey: "Name",
            title: 'Chi tiết'
          }}
        />
      }
    </>
  );
};

// const summary = () => {
// 	return (
// 		<React.Fragment>
// 			<Table.Summary.Row>
// 				<Table.Summary.Cell colSpan={3} index={0}>
// 					<div className="text-[#000] font-medium text-left">
// 						Những đơn đã mua hàng
// 					</div>
// 				</Table.Summary.Cell>
// 				<Table.Summary.Cell index={1} colSpan={3} align="center">
// 					<div className="flex items-center justify-center">
// 						<span>{_format.getVND(0)}</span>
// 						{/* <div className="cursor-pointer ml-4">
// 							<i className="fad fa-download text-lg text-orange"></i>
// 						</div> */}
// 					</div>
// 				</Table.Summary.Cell>
// 			</Table.Summary.Row>
// 			<Table.Summary.Row>
// 				<Table.Summary.Cell index={0} colSpan={3}>
// 					<div className="text-[#000] font-medium text-left">
// 						Những đơn đã hoàn thành
// 					</div>
// 				</Table.Summary.Cell>
// 				<Table.Summary.Cell index={1} colSpan={3} align="center">
// 					<div className="flex items-center justify-center">
// 						<span>{_format.getVND(0)}</span>
// 						{/* <div className="cursor-pointer ml-4">
// 							<i className="fad fa-download text-lg text-orange"></i>
// 						</div> */}
// 					</div>
// 				</Table.Summary.Cell>
// 			</Table.Summary.Row>
// 			<Table.Summary.Row>
// 				<Table.Summary.Cell index={0} colSpan={3}>
// 					<div className="text-[#000] font-medium text-left">
// 						Những đơn từ lúc đã đặt cọc đến khi hoàn thành
// 					</div>
// 				</Table.Summary.Cell>
// 				<Table.Summary.Cell index={1} colSpan={3} align="center">
// 					<div className="flex items-center justify-center">
// 						<span>{_format.getVND(0)}</span>
// 						{/* <div className="cursor-pointer ml-4">
// 							<i className="fad fa-download text-lg text-orange"></i>
// 						</div> */}
// 					</div>
// 				</Table.Summary.Cell>
// 			</Table.Summary.Row>
// 			<Table.Summary.Row>
// 				<Table.Summary.Cell index={0} colSpan={3}>
// 					<div className="text-[#000] font-medium text-left">Tổng tiền cọc</div>
// 				</Table.Summary.Cell>
// 				<Table.Summary.Cell index={1} colSpan={3} align="center">
// 					<div className="flex items-center justify-center">
// 						<span>{_format.getVND(0)}</span>
// 						{/* <div className="cursor-pointer ml-4">
// 							<i className="fad fa-download text-lg text-orange"></i>
// 						</div> */}
// 					</div>
// 				</Table.Summary.Cell>
// 			</Table.Summary.Row>
// 			<Table.Summary.Row>
// 				<Table.Summary.Cell index={0} colSpan={3}>
// 					<div className="text-[#000] font-medium text-left">
// 						Tổng tiền chưa thanh toán
// 					</div>
// 				</Table.Summary.Cell>
// 				<Table.Summary.Cell index={1} colSpan={3} align="center">
// 					<div className="flex items-center justify-center">
// 						<span>{_format.getVND(0)}</span>
// 						{/* <div className="cursor-pointer ml-4">
// 							<i className="fad fa-download text-lg text-orange"></i>
// 						</div> */}
// 					</div>
// 				</Table.Summary.Cell>
// 			</Table.Summary.Row>
// 			<Table.Summary.Row>
// 				<Table.Summary.Cell index={0} colSpan={3}>
// 					<div className="text-[#000] font-medium text-left">
// 						Tổng tiền đơn hàng hỏa tốc
// 					</div>
// 				</Table.Summary.Cell>
// 				<Table.Summary.Cell index={1} colSpan={3} align="center">
// 					<div className="flex items-center justify-center">
// 						<span>{_format.getVND(0)}</span>
// 						{/* <div className="cursor-pointer ml-4">
// 							<i className="fad fa-download text-lg text-orange"></i>
// 						</div> */}
// 					</div>
// 				</Table.Summary.Cell>
// 			</Table.Summary.Row>
// 			<Table.Summary.Row>
// 				<Table.Summary.Cell index={0} colSpan={3}>
// 					<div className="text-[#000] font-medium text-left">
// 						Tổng tiền phí ship tận nhà
// 					</div>
// 				</Table.Summary.Cell>
// 				<Table.Summary.Cell index={1} colSpan={3} align="center">
// 					<div className="flex items-center justify-center">
// 						<span>{_format.getVND(0)}</span>
// 						{/* <div className="cursor-pointer ml-4">
// 							<i className="fad fa-download text-lg text-orange"></i>
// 						</div> */}
// 					</div>
// 				</Table.Summary.Cell>
// 			</Table.Summary.Row>
// 			<Table.Summary.Row>
// 				<Table.Summary.Cell index={0} colSpan={3}>
// 					<div className="text-[#000] font-medium text-left">
// 						Tổng tiền tất cả
// 					</div>
// 				</Table.Summary.Cell>
// 				<Table.Summary.Cell index={1} colSpan={3} align="center">
// 					<div className="flex items-center justify-center">
// 						<span className="text-warning text-lg">
// 							<b>{_format.getVND(0)}</b>
// 						</span>
// 					</div>
// 				</Table.Summary.Cell>
// 			</Table.Summary.Row>
// 		</React.Fragment>
// 	);
// };
