import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { bigPackage } from '~/api';
import {
	Button,
	FormCard,
	FormInput,
	FormInputNumber,
	Modal,
	showToast
} from '~/components';
import { TForm } from '~/types/table';

export const CheckWarehouseChinaNewBagForm: React.FC<
	TForm<TPackage> & { refetch }
> = ({ visible, onCancel, refetch }) => {
	const { handleSubmit, control, reset } = useForm<TPackage>({
		mode: 'onBlur'
	});

	const queryClient = useQueryClient();
	const mutationCreate = useMutation(bigPackage.create, {
		onSuccess: async () => {
			// mutationCreate.reset();
			toast.success('Thêm bao lớn thành công');
			// reset();
			onCancel();
			queryClient.invalidateQueries("bigPackageList");
		},
		onError: (error) =>
			showToast({
				title: (error as any)?.response?.data?.ResultCode,
				message: (error as any)?.response?.data?.ResultMessage,
				type: 'error'
			})
	});

	const _onPress = (data: TPackage) =>
		mutationCreate.mutateAsync({ ...data, Name: data.Code });

	return (
		<Modal visible={visible} onCancel={onCancel}>
			<FormCard>
				<FormCard.Header onCancel={onCancel}>
					<div className="w-full">
						<p>Thêm bao lớn mới</p>
					</div>
				</FormCard.Header>
				<FormCard.Body>
					<div className="grid grid-cols-1 gap-4">
						<div className="col-span-1">
							<FormInput
								control={control}
								name="Code"
								label="Mã bao hàng"
								placeholder=""
								rules={{ required: 'Không bỏ trống mã bao hàng' }}
							/>
						</div>
						<div className="col-span-1">
							<FormInputNumber
								control={control}
								name="Weight"
								label="Cân nặng (kg)"
								placeholder=""
								suffix=" kg"
								required={false}
							/>
						</div>
						<div className="col-span-1">
							<FormInputNumber
								control={control}
								name="Volume"
								label="Khối (m3)"
								placeholder=""
								suffix=" m3"
								required={false}
							/>
						</div>
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button
						title="Thêm"
						showLoading
						onClick={handleSubmit(_onPress)}
						btnClass="!bg-[#f14f04]"
					/>
					<Button title="Huỷ" onClick={onCancel} btnClass="!bg-red" />
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
