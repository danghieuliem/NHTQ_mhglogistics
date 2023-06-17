import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { refund } from '~/api';
import {
	Modal,
	FormCard,
	FormInput,
	FormInputNumber,
	FormSelect,
	FormTextarea,
	Button
} from '~/components';
import { toast } from '~/components/toast';
import { paymentStatusData, EPaymentStatusData } from '~/configs/appConfigs';
import { TForm } from '~/types/table';

export const ChinaWithdrawHistoryForm: React.FC<TForm<TRefund>> = ({
	onCancel,
	visible,
	defaultValues
}) => {
	const { handleSubmit, reset, control } = useForm<TRefund>({
		mode: 'onBlur'
	});

	const { data, isLoading } = useQuery(
		['clientWithdrawData', defaultValues?.Id],
		() => refund.getByID(defaultValues?.Id),
		{
			enabled: !!defaultValues?.Id,
			refetchOnWindowFocus: false,
			onSuccess: (data) => reset(data.Data),
			onError: toast.error
		}
	);

	const queryClient = useQueryClient();
	const mutationUpdate = useMutation(refund.update, {
		onSuccess: (data) => {
			toast.success('Cập nhật yêu cầu rút tiền thành công');
			queryClient.setQueryData(
				['clientWithdrawData', defaultValues?.Id],
				data.Data
			);
			queryClient.invalidateQueries('clientWithdrawData');
		},
		onError: toast.error
	});

	const _onPress = (data: TRefund) => {
		const { Updated, UpdatedBy, ...props } = data;
		mutationUpdate.mutateAsync(props);
		onCancel();
	};

	return (
		<Modal visible={visible} onCancel={onCancel}>
			<FormCard loading={isLoading}>
				<FormCard.Header onCancel={onCancel}>
					<div className="w-full">
						<p>Yêu cầu nạp tiền #{defaultValues?.Id}</p>
					</div>
				</FormCard.Header>
				<FormCard.Body>
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-1">
							<FormInput
								control={control}
								name="UserName"
								label="Username"
								placeholder=""
								disabled
								rules={{
									required: 'This is required field'
								}}
							/>
						</div>
						<div className="col-span-1">
							<FormInputNumber
								control={control}
								name="Amount"
								label="Số tiền nạp (VNĐ)"
								placeholder=""
								suffix=" VNĐ"
								disabled
								rules={{
									required: 'This is required field'
								}}
							/>
						</div>
						<div className="col-span-2">
							<FormTextarea
								control={control}
								name="Note"
								label="Nội dung"
								placeholder=""
								required={false}
							/>
						</div>
						<div className="col-span-2">
							<FormSelect
								control={control}
								name="Status"
								disabled={data?.Data?.Status !== EPaymentStatusData.Unapproved}
								data={paymentStatusData.slice(1)}
								defaultValue={paymentStatusData.find(
									(x) => x.id === defaultValues?.Status
								)}
								label="Trạng thái"
								placeholder=""
								rules={{
									required: 'This is required field'
								}}
							/>
						</div>
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button
						title="Cập nhật"
						btnClass="!bg-main"
						showLoading
						onClick={handleSubmit(_onPress)}
					/>
					<Button title="Hủy" btnClass="bg-pending" onClick={onCancel} />
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
