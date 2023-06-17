import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { withdraw } from '~/api';
import {
	FormInput,
	FormInputNumber,
	FormSelect,
	FormTextarea
} from '~/components';
import { IconButton } from '~/components/globals/button/IconButton';
import { toast } from '~/components/toast';
import {
	paymentStatusData
} from '~/configs/appConfigs';
import { useDeepEffect } from '~/hooks';

type TProps = {
	userData: TEmployee;
	loading: boolean;
};

export const ChinaRechargeForm: React.FC<TProps> = ({ userData, loading }) => {
	const router = useRouter();
	const { handleSubmit, control, reset } = useForm<TRechargeRMB>({
		mode: 'onBlur'
	});

	useDeepEffect(() => {
		if (!!userData) {
			reset({
				UserName: userData.UserName,
				UID: userData.Id,
				Wallet: userData.Wallet,
				Type: 3,
				Status: paymentStatusData[1]?.id
			});
		}
	}, [userData]);

	const mutationCreate = useMutation(withdraw.create, {
		onSuccess: (_, data) => {
			toast.success(
				data.Status === 2
					? `Nạp tiền vào ví cho khách ${data.UserName} thành công số tiền ${data.Amount} tệ`
					: `Tạo yêu cầu nạp tiền thành công cho khách ${data.UserName} số tiền ${data.Amount} tệ`
			);
			router.back();
		},
		onError: toast.error
	});

	const _onPress = async (data: TRechargeRMB) =>
		mutationCreate.mutateAsync(data);

	return (
		<div className="grid grid-col-1 gap-4">
			<div className="col-span-1">
				<Skeleton
					active
					title={false}
					loading={loading}
					paragraph={{ rows: 1, width: '100%' }}
				>
					<FormInput
						control={control}
						name="UserName"
						placeholder=""
						disabled
						required={false}
						label="Username"
						rules={{ required: 'Không bỏ trống username' }}
					/>
				</Skeleton>
			</div>
			<div className="col-span-1">
				<Skeleton
					active
					title={false}
					loading={loading}
					paragraph={{ rows: 1, width: '100%' }}
				>
					<FormInputNumber
						control={control}
						name="Wallet"
						placeholder=""
						disabled
						label="Ví tiền (¥)"
						required={false}
						prefix="¥ "
						rules={{ required: 'Không bỏ trống ví tiền' }}
					/>
				</Skeleton>
			</div>
			<div className="col-span-1">
				<Skeleton
					active
					title={false}
					loading={loading}
					paragraph={{ rows: 1, width: '100%' }}
				>
					<FormInputNumber
						control={control}
						name="Amount"
						placeholder=""
						label="Số tiền (¥)"
						prefix="¥ "
						rules={{ required: 'Không bỏ trống số tiền' }}
					/>
				</Skeleton>
			</div>
			<div className="col-span-1">
				<Skeleton
					active
					title={false}
					loading={loading}
					paragraph={{ rows: 1, width: '100%' }}
				>
					<FormTextarea
						control={control}
						name="Note"
						label="Nội dung"
						placeholder=""
						required={false}
					/>
				</Skeleton>
			</div>
			<div className="col-span-1">
				<Skeleton
					active
					title={false}
					loading={loading}
					paragraph={{ rows: 1, width: '100%' }}
				>
					<FormSelect
						control={control}
						name="Status"
						data={paymentStatusData.slice(1, 3)}
						placeholder=""
						label="Trạng thái"
						defaultValue={paymentStatusData[1]}
						rules={{ required: 'Xác nhận trạng thái' }}
					/>
				</Skeleton>
			</div>
			<div className="col-span-1">
				<Skeleton
					active
					title={false}
					loading={loading}
					paragraph={{ rows: 1, width: '160px' }}
				>

						<IconButton
							title="Cập nhật"
							onClick={handleSubmit(_onPress)}
							showLoading
							icon="fas fa-pencil"
							btnClass="!mr-2"
							toolip=""
						/>
					<IconButton
						onClick={() => router.back()}
						icon="fas fa-undo-alt"
						title="Trở về"
						showLoading
						toolip=""
						yellow
					/>
				</Skeleton>
			</div>
		</div>
	);
};
