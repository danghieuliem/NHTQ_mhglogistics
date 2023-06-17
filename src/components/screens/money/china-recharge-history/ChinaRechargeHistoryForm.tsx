import router from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { withdraw } from '~/api';
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

export const ChinaRechargeHistoryForm: React.FC<TForm<TRechargeRMB>> = ({
	onCancel,
	visible,
	defaultValues
}) => {
	const { handleSubmit, reset, control } = useForm<TRechargeRMB>({
		mode: 'onBlur'
	});

	const { data, isLoading } = useQuery(
		['clientChinaWithdrawData', defaultValues?.Id],
		() => withdraw.getByID(defaultValues?.Id),
		{
			enabled: !!defaultValues?.Id,
			refetchOnWindowFocus: false,
			onSuccess: (data) => reset(data?.Data),
			onError: toast.error
		}
	);

	const queryClient = useQueryClient();
	const mutationUpdate = useMutation(withdraw.update, {
		onSuccess: (data) => {
			toast.success('Cập nhật yêu cầu nạp tiền thành công');
			queryClient.setQueryData(
				['clientChinaWithdrawData', defaultValues?.Id],
				data.Data
			);
			queryClient.invalidateQueries('clientChinaWithdrawData');
			router.back();
		},
		onError: toast.error
	});

	const _onPress = (data: TRechargeRMB) => {
		const { Updated, UpdatedBy, ...props } = data;
		return mutationUpdate.mutateAsync(props);
	};

	return (
		<Modal visible={visible} onCancel={onCancel}>
			<FormCard loading={isLoading}>
				<FormCard.Header onCancel={onCancel}>
					<div className="w-full">
						<p>Yêu cầu rút tiền #{defaultValues?.Id}</p>
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
								required={false}
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
								required={false}
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
								data={paymentStatusData.slice(1)}
								disabled={data?.Data?.Status !== EPaymentStatusData.Unapproved}
								defaultValue={paymentStatusData.find(
									(x) => x.id === defaultValues?.Status
								)}
								label="Trạng thái"
								placeholder=""
								required={false}
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
