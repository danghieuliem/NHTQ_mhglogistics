import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { bigPackage, smallPackage } from '~/api';
import { Modal, showToast } from '~/components';
import { Button } from '~/components/globals/button/PrimaryButton';
import {
	FormAsyncSelect,
	FormCard,
	FormInput,
	FormInputNumber,
	FormSelect,
	FormUpload
} from '~/components/globals/formBase';
import { toast } from '~/components/toast';
import { smallPackageStatusData } from '~/configs/appConfigs';
import { TForm } from '~/types/table';

export const PackageManagementFormDetail: React.FC<
	TForm<TSmallPackage> & { refetch }
> = ({ onCancel, visible, defaultValues, refetch }) => {
	const { data: bigPackages, isFetching: isFetchingBigPackages } = useQuery(
		'bigPackageList',
		() =>
			bigPackage.getList({
				PageIndex: 1,
				PageSize: 1000000,
				OrderBy: 'Id desc'
			}),
		{
			onSuccess: (data) => reset(data),
			onError: toast.error
		}
	);

	const { handleSubmit, reset, control } = useForm<any>({
		mode: 'onBlur'
	});

	// fetch get item by id
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

	const queryClient = useQueryClient();
	const mutationUpdate = useMutation(smallPackage.update, {
		onSuccess: () => {
			mutationUpdate.reset();
			queryClient.invalidateQueries('smallPackageList');
			toast.success('Cập nhật thành công');
			onCancel();
		},
		onError: toast.error
	});

	const _onPress = async (data: TSmallPackage) => {
		try {
			await mutationUpdate.mutateAsync([data]);
			refetch();
		} catch (error) {}
	};

	return (
		<Modal visible={visible} style={{ top: 50 }} onCancel={onCancel}>
			<FormCard loading={isFetching}>
				<FormCard.Header onCancel={onCancel}>
					<div className="w-full">
						<p>Mã vận đơn #{defaultValues?.Id}</p>
					</div>
				</FormCard.Header>
				<FormCard.Body>
					<div className="grid grid-cols-3 gap-3">
						<div className="col-span-1">
							<FormInput
								control={control}
								name="OrderTransactionCode"
								label="Mã vận đơn"
								placeholder=""
								rules={{
									required: 'This is required field'
								}}
							/>
						</div>
						<div className="col-span-1">
							<FormAsyncSelect
								control={control}
								name="BigPackageId"
								data={{ options: bigPackages?.Data?.Items }}
								isLoading={isFetchingBigPackages}
								defaultValue={bigPackages?.Data?.Items?.find(
									(x) => x?.Id === defaultValues?.BigPackageId
								)}
								select={{ label: 'Name', value: 'Id' }}
								placeholder=""
								label="Bao hàng"
								rules={{
									required: 'This is required field'
								}}
							/>
						</div>
						<div className="col-span-1">
							<FormInput
								control={control}
								name="ProductType"
								label="Loại hàng"
								placeholder=""
								rules={{
									required: 'This is required field'
								}}
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
						<div className="col-span-1">
							<FormInputNumber
								control={control}
								name="Volume"
								label="Cân quy đổi"
								placeholder=""
								suffix=" m3"
								rules={{
									required: 'This is required field'
								}}
							/>
						</div>
						<div className="col-span-3">
							<FormUpload
								control={control}
								name="IMG"
								label="Hình ảnh"
								required={false}
							/>
						</div>
						<div className="col-span-3">
							<FormInput
								control={control}
								name="Description"
								label="Ghi chú"
								placeholder=""
								required={false}
							/>
						</div>
						<div className="col-span-3">
							<FormSelect
								control={control}
								name="Status"
								data={smallPackageStatusData}
								defaultValue={smallPackageStatusData.find(
									(x) => x.id === defaultValues?.Status
								)}
								label="Trạng thái"
								placeholder=""
								rules={{ required: 'This field is required' }}
							/>
						</div>
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button
						title="Cập nhật"
						btnClass="!bg-main"
						onClick={handleSubmit(_onPress)}
					/>
					<Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
