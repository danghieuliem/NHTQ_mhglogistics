import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	Button,
	Modal,
	FormCard,
	FormCheckbox,
	FormInput,
	toast
} from '~/components';
import { TForm } from '~/types/table';
import { notificationSetting } from '~/api';

export const NotificationsForm: FC<
	TForm<TSettingNotification> & { refetch }
> = ({ onCancel, defaultValues, visible, refetch }) => {
	const { handleSubmit, reset, control } = useForm<TSettingNotification>({
		defaultValues
	});

	const { isFetching } = useQuery(
		['warehouseFeeId', defaultValues?.Id],
		() =>
			notificationSetting.getByID(defaultValues?.Id).then((res) => res.Data),
		{
			enabled: !!defaultValues?.Id,
			refetchOnWindowFocus: false,
			onSuccess: (data) => reset(data),
			onError: toast.error
		}
	);

	const queryClient = useQueryClient();
	const mutationUpdate = useMutation(notificationSetting.update, {
		// refresh item + table data after updating successfully
		onSuccess: async (_, variables) => {
			queryClient.invalidateQueries('warehouseFeeData');
			queryClient.setQueryData(
				['warehouseFeeId', defaultValues?.Id],
				variables
			);
			onCancel();
			refetch();
			toast.success('Cập nhật cấu hình thành công');
		},
		onError: toast.error
	});

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues]);

	const _onPress = (data: TSettingNotification) => {
		// dùng new data này, không dùng ở trên, dùng ở trên có khả năng thay đổi field disabled
		let newData = JSON.parse(JSON.stringify(data));
		delete newData.name;
		mutationUpdate.mutateAsync({ ...newData });

	};

	function handleOnCancel() {
		reset();
		onCancel();
	}

	return (
		<Modal visible={visible} onCancel={handleOnCancel}>
			<FormCard>
				<FormCard.Header onCancel={handleOnCancel}>
					<div className="w-full">
						<p className="xl:text-lg text-base">
							CẤU HÌNH THÔNG BÁO #{defaultValues?.Id}{' '}
						</p>
					</div>
				</FormCard.Header>
				<FormCard.Body>
					<div className="grid grid-cols-2 gap-3">
						<div className="col-span-2">
							<FormInput
								control={control}
								name="Name"
								label="Tên thông báo"
								placeholder="Tên thông báo"
								disabled
							/>
						</div>
						<div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsNotifyAdmin"
								label="Thông báo admin"
							/>
						</div>
						<div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsNotifyUser"
								label="Thông báo User"
							/>
						</div>
						<div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsNotifyAccountant"
								label="Thông báo kế toán"
							/>
						</div>
						<div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsNotifyOrderer"
								label="Thông báo đặt hàng"
							/>
						</div>
						<div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsNotifySaler"
								label="Thông báo bán hàng"
							/>
						</div>
						<div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsNotifyWarehoueFrom"
								label="Thông báo kho Trung Quốc"
							/>
						</div>
						<div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsNotifyWarehoue"
								label="Thông báo kho Việt Nam"
							/>
						</div>
						<div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsEmailAdmin"
								label="Gửi mail Admin"
							/>
						</div>
						{/* <div className="col-span-1">
							<FormCheckbox
								control={control}
								name="IsEmailUser"
								label="Gửi mail User"
							/>
						</div> */}
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button
						title="Cập nhật"
						btnClass="!bg-main"
						onClick={handleSubmit(_onPress)}
					/>
					<Button
						title="Hủy"
						btnClass="!bg-pending xl:text-base text-sm"
						onClick={handleOnCancel}
					/>
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
