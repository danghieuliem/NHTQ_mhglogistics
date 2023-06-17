import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { transportationOrder } from '~/api';
import {
	Button,
	FormCard,
	FormInput,
	FormSelect,
	Modal,
	showToast
} from '~/components';
import { useCatalogue } from '~/hooks/useCatalogue';
import { _format } from '~/utils';

type TProps = {
	visible: boolean;
	onCancel: () => void;
	ids: number[];
	isAll: boolean;
	enabled: boolean;
};

type TForm = {
	ShippingType: number;
	Note: string;
	/**
	 * 0: Thanh toán tại kho,
	 * 2: Thanh toán qua ví
	 */
	Type: 0 | 2;
	ListID: number[];
};

export const UserDepositListForm: React.FC<TProps> = ({
	onCancel,
	visible,
	ids,
	isAll,
	enabled
}) => {
	// catalogue scope
	// ===== BEGIN =====
	const { shippingTypeToVN } = useCatalogue({ shippingTypeToVNEnabled: true });
	// ===== END =====

	const { data, isFetching } = useQuery(
		['billing', ids, isAll],
		() =>
			transportationOrder.getBillingInfo({
				IsAll: isAll,
				ListID: ids
			}),
		{
			enabled,
			select: (data) => data.Data
		}
	);

	const queryClient = useQueryClient();
	// const mutationPayment = useMutation(
	// 	(data: TForm) => transportationOrder.makePayment(data),
	// 	{
	// 		onSuccess: () => {
	// 			mutationPayment.reset();
	// 			onCancel();
	// 			queryClient.invalidateQueries('userDepositList');
	// 			showToast({
	// 				type: 'success',
	// 				title: '200',
	// 				message: 'Thanh toán ký gửi thành công'
	// 			});
	// 		},
	// 		onError: (error) =>
	// 			showToast({
	// 				title: (error as any)?.response?.data?.ResultCode,
	// 				message: (error as any)?.response?.data?.ResultMessage,
	// 				type: 'error'
	// 			})
	// 	}
	// );

	const { control, handleSubmit } = useForm<TForm>({ mode: 'onBlur' });

	// const _onPressAtWarehouse = (data: TForm) =>
	// 	mutationPayment.mutateAsync({ ...data, Type: 0, ListID: ids });

	// const _onPress = (data: TForm) =>
	// 	mutationPayment.mutateAsync({ ...data, Type: 2, ListID: ids });

	return (
		<Modal visible={visible} onCancel={onCancel}>
			<FormCard loading={isFetching}>
				<FormCard.Header onCancel={onCancel}>
					<p>Thanh toán xuất kho</p>
				</FormCard.Header>
				<FormCard.Body>
					<div className="text-sm mb-4">
						Tổng số mã xuất kho của quý khách :{' '}
						{_format.getVND(data?.ListId?.length, '')}
					</div>
					<div className="text-sm my-4">
						Tổng số kg xuất kho: {_format.getVND(data?.TotalWeight, ' kg')}.{' '}
						{_format.getVND(data?.TotalWeightPriceVND)}.
					</div>
					<div className="text-sm my-4">
						Cước vật tư: {_format.getVND(data?.TotalSensoredFeeVND)}.
					</div>
					<div className="text-sm my-4">
						PP hàng đặc biệt: {_format.getVND(data?.TotalAdditionFeeVND)}.
					</div>
					<div className="text-sm my-4">
						Tổng số tiền xuất kho của quý khách:{' '}
						{_format.getVND(data?.TotalPriceVND)}.
					</div>
					<FormSelect
						control={control}
						name="ShippingType"
						data={shippingTypeToVN}
						placeholder=""
						label="Hình thức vận chuyển trong nước:"
						select={{ label: 'Name', value: 'Id' }}
						selectContainerClassName="my-4"
						rules={{ required: 'This field is required' }}
					/>
					<FormInput
						control={control}
						name="Note"
						label="Ghi chú:"
						placeholder=""
						inputContainerClassName="mt-4"
						required={false}
					/>
				</FormCard.Body>
				{/* <FormCard.Footer>
					<Button
						showLoading
						disabled={mutationPayment.isLoading}
						title="Thanh toán tại kho"
						btnClass="!bg-[#f14f04] ml-0 mr-2"
						onClick={handleSubmit(_onPressAtWarehouse)}
					/>
					<Button
						showLoading
						disabled={mutationPayment.isLoading}
						title="Thanh toán"
						btnClass="!bg-[#f14f04] !mx-0"
						onClick={handleSubmit(_onPress)}
					/>
				</FormCard.Footer> */}
			</FormCard>
		</Modal>
	);
};
