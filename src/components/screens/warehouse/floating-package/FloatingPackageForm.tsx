import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { customerBenefits, smallPackage } from '~/api';
import {
	Button,
	FormCard,
	FormInput,
	FormInputNumber,
	FormSelect,
	FormSwitch,
	FormTextarea,
	FormUpload,
	Modal,
	toast
} from '~/components';
import {
	benefitData,
	smallPackageStatusConfirm,
	smallPackageStatusData
} from '~/configs/appConfigs';
import { useDeepEffect } from '~/hooks';
import { TForm } from '~/types/table';

export const FloatingPackageForm: React.FC<
	TForm<TSmallPackage> & { refetch }
> = ({ onCancel, visible, defaultValues, refetch }) => {
	const { control, reset, handleSubmit, getValues } = useForm<TSmallPackage>({
		mode: 'onBlur'
	});

	const { isFetching } = useQuery(
		['smallPackage', defaultValues?.Id],
		() => smallPackage.getByID(defaultValues?.Id).then((res) => res.Data),
		{
			enabled: !!defaultValues?.Id,
			refetchOnWindowFocus: false,
			onSuccess: (data) => reset(data),
			onError: toast.error
		}
	);

	const mutationConfirm = useMutation(smallPackage.update, {
		onSuccess: () => {
			mutationConfirm.reset();
			toast.success('Xác nhận thành công');
			onCancel();
			refetch();
		},
		onError: toast.error
	});

	const handleConfirmBigPakage = async (data: any) => {
		try {
			await mutationConfirm.mutateAsync([data]);
		} catch (error) {}
	};

	return (
		<Modal onCancel={onCancel} visible={visible} width={1000}>
			<FormCard>
				<FormCard.Header onCancel={onCancel}>
					<div className="w-full">
						<p>Xác nhận kiện trôi nổi</p>
					</div>
				</FormCard.Header>
				<FormCard.Body>
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-2">
							<FormInput
								control={control}
								name="OrderTransactionCode"
								rules={{ required: 'Không bỏ trống mã vận đơn' }}
								label="Mã vận đơn"
								placeholder=""
								disabled
							/>
						</div>
						<div className="col-span-1">
							<FormInput
								control={control}
								name="FloatingUserName"
								rules={{ required: 'Không bỏ trống tên người dùng' }}
								label="Username"
								placeholder=""
								disabled
							/>
						</div>
						<div className="col-span-1">
							<FormInput
								control={control}
								name="FloatingUserPhone"
								required={true}
								label="Số điện thoại"
								placeholder=""
								disabled
							/>
						</div>
						<div className="col-span-2">
							<FormInput
								control={control}
								name="UserNote"
								required={false}
								label="Khách hàng ghi chú"
								placeholder=""
								disabled
							/>
						</div>
						<div className="col-span-2">
							<FormUpload
								control={control}
								name="IMG"
								label="Hình ảnh"
								required={false}
								disabled
							/>
						</div>
						<div className="col-span-2">
							<FormTextarea
								control={control}
								name="Description"
								label="Ghi chú nội bộ"
								placeholder=""
								required={false}
							/>
						</div>
						<div className="col-span-2">
							<FormSelect
								control={control}
								name="FloatingStatus"
								label="Trạng thái xác nhận"
								placeholder=""
								required={false}
								data={smallPackageStatusConfirm}
								defaultValue={smallPackageStatusConfirm.find(
									(x) => x.id === defaultValues?.FloatingStatus
								)}
							/>
						</div>
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button
						title="Xác nhận"
						btnClass="!bg-main"
						onClick={handleSubmit(handleConfirmBigPakage)}
						showLoading
					/>
					<Button
						title="Hủy"
						btnClass="!bg-red"
						onClick={() => {
							onCancel();
						}}
					/>
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
