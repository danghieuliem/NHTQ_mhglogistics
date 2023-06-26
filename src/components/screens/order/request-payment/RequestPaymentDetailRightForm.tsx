import React from "react";
import { FormInput, FormInputNumber, FormTextarea } from "~/components/globals/formBase";
import { TControl } from "~/types/field";

export const RequestPaymentDetailRightForm: React.FC<TControl<TRequestPaymentOrder> & {loading: boolean}> = ({
	control,
	getValues,
	fields,
	loading,
	setValue,
}) => {
	return (
		<React.Fragment>
			<div className="tableBox mb-4">
				<div className="text-base mb-4 font-bold">THÔNG TIN ĐƠN HÀNG</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<FormInputNumber
							control={control}
							name="CurrencyConfig"
							label="Tỷ giá hệ thống"
							placeholder=""
							disabled
							rules={{required: "This field is required"}}
						/>
					</div>
					<div className="col-span-1">
						<FormInputNumber
							control={control}
							name="Currency"
							label="Tỷ giá tính tiền"
							placeholder=""
							disabled
							rules={{required: "This field is required"}}
						/>
					</div>
					<div className="col-span-1">
						<FormInputNumber
							control={control}
							name="TotalPrice"
							label="Tổng tiền Tệ (¥)"
							placeholder=""
							prefix="¥ "
							disabled
							rules={{required: "This field is required"}}
						/>
					</div>
					<div className="col-span-1">
						<FormInputNumber
							control={control}
							name="TotalPriceVND"
							label="Tổng tiền Việt Nam Đồng (VNĐ)"
							placeholder=""
							suffix=" VNĐ"
							disabled
							rules={{required: "This field is required"}}
						/>
					</div>
					<div className="col-span-2">
						<FormTextarea control={control} name="Note" label="Ghi chú" placeholder="" required={false} />
					</div>
					{/* <div className="col-span-2">
						<Skeleton
							loading={loading}
							paragraph={{rows: 1, width: "100%"}}
							title={false}>
							<FormCheckbox label="Chưa hoàn thiện" control={control} name="IsComplete" />
							<Checkbox
								defaultChecked={getValues("IsComplete")}
								onChange={() => setValue("IsComplete", !getValues("IsComplete"))}>
								Chưa hoàn thiện?
							</Checkbox>
						</Skeleton>
					</div> */}
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 tableBox">
				<div className="text-base col-span-2 font-bold">CHI TIẾT HÓA ĐƠN</div>
				{fields.map((item, index) => (
					<React.Fragment key={item.id}>
						<div className="col-span-1">
							<FormInputNumber
								control={control}
								name={`PayHelpDetails.${index}.Desc1`}
								label="Tổng tiền hóa đơn thanh toán hộ"
								placeholder=""
								disabled
								rules={{required: "This field is required"}}
							/>
						</div>
						<div className="col-span-1">
							<FormInput
								control={control}
								name={`PayHelpDetails.${index}.Desc2`}
								label="Nội dung hóa đơn thanh toán hộ"
								placeholder=""
								required={false}
							/>
						</div>
					</React.Fragment>
				))}
			</div>
			{/* <div className="text-base mt-8 mb-4 font-bold">LỊCH SỬ THAY ĐỔI</div>
			<ChangeRequestPaymentOrderHistory
				loading={loading}
				data={getValues("HistoryServices")}
			/> */}
		</React.Fragment>
	);
};
