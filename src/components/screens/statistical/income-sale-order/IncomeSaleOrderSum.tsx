import { FC } from 'react';
import clsx from 'clsx';
import { _format } from '~/utils';

type TData = {
	MaxTotalPriceVND?: number;
	MaxPriceVND?: number;
	MaxFeeBuyPro?: number;
	MaxFeeShipCN?: number;
	MaxTQVNWeight?: number;
	MaxFeeWeight?: number;
	MaxOrderFee?: number;
	MaxBargainMoney?: number;
	MaxTotalOrder?: number;
};

const textTitle = 'text-xs font-semibold tracking-wide text-[#797877]';
const textValue = 'text-xs font-semibold text-blue';
const iconBox = ' h-fit items-center mx-[22px]';

export const IncomeSaleSum: FC<{ data: TData }> = ({ data }) => {
	return (
		<div className="xl:grid grid-cols-3 gap-6 rounded-3xl">
			<div className="flex w-[100%] border-[2px] border-[#f7e3db] py-[6px] rounded-xl justify-between items-center">
				<div className={iconBox}>
					<span className="mb-[20px] p-[14px] pt-[16px] items-center rounded-xl bg-[#fff] border-2 border-[#f7d2c3]">
						<i className="far fa-usd-circle text-[#f6cdbd] text-xl"></i>
					</span>
				</div>
				<div className="w-[350px] items-center px-4">
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng giá trị đơn hàng</p>
						<p className={textValue}>
							{data?.MaxTotalPriceVND && _format.getVND(data.MaxTotalPriceVND)}
						</p>
					</div>
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng tiền hàng</p>
						<p className={textValue}>
							{data?.MaxPriceVND && _format.getVND(data.MaxPriceVND)}
						</p>
					</div>
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng phí đơn hàng</p>
						<p className={textValue}>
							{data?.MaxFeeBuyPro && _format.getVND(data.MaxFeeBuyPro)}
						</p>
					</div>
				</div>
			</div>
			<div className=" flex w-[100%] border-[2px] border-[#f7e3db] py-[6px] rounded-xl justify-between items-center">
				<div className={iconBox}>
					<span className="mb-[20px] p-[14px] pt-[16px] items-center rounded-xl bg-[#fff] border-2 border-[#f7d2c3]">
						<i className="far fa-usd-circle text-[#f6cdbd] text-xl"></i>
					</span>
				</div>
				<div className="w-[350px] items-center px-4">
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng phí mua hàng</p>
						<p className={textValue}>
							{data?.MaxOrderFee && _format.getVND(data.MaxOrderFee)}
						</p>
					</div>
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng vận chuyển TQ-VN</p>
						<p className={textValue}>
							{data?.MaxTQVNWeight && _format.getVND(data.MaxTQVNWeight)}
						</p>
					</div>
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng vận chuyển nội địa</p>
						<p className={textValue}>
							{data?.MaxFeeShipCN && _format.getVND(data.MaxFeeShipCN)}
						</p>
					</div>
				</div>
			</div>
			<div className="flex w-[100%] border-[2px] border-[#f7e3db] py-[6px] rounded-xl justify-between items-center">
				<div className={iconBox}>
					<span className="mb-[20px] p-[14px] pt-[16px] items-center rounded-xl bg-[#fff] border-2 border-[#f7d2c3]">
						<i className="far fa-usd-circle text-[#f6cdbd] text-xl"></i>
					</span>
				</div>
				<div className="w-[350px] items-center px-4">
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng mặc cả</p>
						<p className={textValue}>
							{data?.MaxBargainMoney && _format.getVND(data.MaxBargainMoney)}
						</p>
					</div>
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng cân nặng</p>
						<p className={textValue}>
							{data?.MaxFeeWeight && _format.getVND(data.MaxFeeWeight)}
						</p>
					</div>
					<div className="flex col-span-1 text-center justify-between items-center py-1">
						<p className={textTitle}>Tổng số đơn hàng</p>
						<p className={textValue}>
							{data?.MaxTotalOrder && _format.getVND(data.MaxTotalOrder)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
