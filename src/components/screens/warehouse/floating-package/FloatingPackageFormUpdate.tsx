import { TablePaginationConfig } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
	defaultPagination,
	smallPackageStatusData
} from '~/configs/appConfigs';
import { useCatalogue, useDeepEffect } from '~/hooks';
import { TForm } from '~/types/table';

export const FloatingPackageFormUpdate: React.FC<
	TForm<TSmallPackage> & { defaultValues: any; refetch }
> = ({ onCancel, visible, defaultValues, refetch }) => {
	const { control, reset, handleSubmit, getValues } = useForm<TSmallPackage>({
		mode: 'onBlur',
		defaultValues
	});

	const { bigPackage } = useCatalogue({
		bigPackageEnabled: true
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

	const mutationUpdate = useMutation(smallPackage.update, {
		onSuccess: () => {
			mutationUpdate.reset();
			toast.success('Cập nhật thành công');
			onCancel();
		},
		onError: toast.error
	});

	const _onPress = async (data: any) => {
		try {
			await mutationUpdate.mutateAsync([data]);
		} catch (error) {}
	};

	return (
		<Modal onCancel={onCancel} visible={visible} width={1000}>
			<FormCard>
				<FormCard.Header onCancel={onCancel}>
					<div className="w-full">
						<p>Mã vận đơn #3321</p>
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
							/>
						</div>
						<div className="col-span-1">
							<FormSelect
								control={control}
								name="BigPackageId"
								label="Bao hàng"
								placeholder=""
								required={false}
								data={bigPackage as any}
								defaultValue={{
									Id: defaultValues?.BigPackageId,
									Name: defaultValues?.Code
								}}
								select={{ label: 'Name', value: 'Id' }}
							/>
						</div>
						<div className="col-span-1">
							<FormInput
								control={control}
								name="ProductType"
								rules={{ required: 'Không bỏ trống tên người dùng' }}
								label="Loại hàng"
								placeholder=""
							/>
						</div>
						<div className="col-span-1">
							<FormInputNumber
								control={control}
								name="FeeShip"
								label="Phí ship (tệ)"
								placeholder=""
								prefix="¥ "
								rules={{
									required: 'This is required field'
								}}
							/>
						</div>
						<div className="col-span-1">
							<FormInputNumber
								control={control}
								name="Weight"
								label="Trọng lượng (kg)"
								placeholder=""
								suffix=" kg"
								rules={{
									required: 'This is required field'
								}}
							/>
						</div>

						<div className="col-span-2">
							<FormUpload
								control={control}
								name="IMG"
								label="Hình ảnh"
								required={false}
							/>
						</div>
						<div className="col-span-2">
							<FormTextarea
								control={control}
								name="Description"
								label="Ghi chú"
								placeholder=""
								required={false}
							/>
						</div>
						<div className="col-span-2">
							<FormSelect
								control={control}
								name="Status"
								data={smallPackageStatusData}
								defaultValue={smallPackageStatusData.find(
									(x) => x.id === defaultValues?.Status
								)}
								label="Trạng thái"
								placeholder=""
								required={false}
							/>
						</div>
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button
						title="Cập nhật"
						btnClass="!bg-main"
						onClick={handleSubmit(_onPress)}
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
