import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { refund, withdraw } from '~/api';
import {
	FormInput,
	FormInputNumber,
	FormSelect,
	FormTextarea,
	IconButton,
	toast
} from '~/components';
import { paymentStatusData } from '~/configs/appConfigs';
import { useDeepEffect } from '~/hooks';
import { _format } from '~/utils';

type TProps = {
	page: 'china' | 'vietnam';
	userData: TEmployee;
	loading: boolean;
};

export const ChinaAndVietNamWithdrawalForm: FC<TProps> = ({
	page,
	userData,
	loading
}) => {
	const router = useRouter();

	const { handleSubmit, control, reset, getValues } = useForm<TWithDraw>({
		mode: 'onBlur'
	});

	useDeepEffect(() => {
		if (!!userData) {
			reset({
				UID: userData.Id,
				Status: paymentStatusData[1].id,
				UserName: userData.UserName,
				Wallet: page === 'china' ? userData.WalletCNY : userData.Wallet,
				Note: `${userData.UserName} rút tiền ra khỏi tài khoản`,
				Type: 2
			});
		}
	}, [userData]);

	const mutationCreateWithDraw = useMutation(withdraw.create, {
		onSuccess: (_, data) => {
			toast.success(
				data.Status === 2
					? `Rút tiền vào ví cho khách ${data.UserName} thành công số tiền ${data.Amount
					} ${page === 'vietnam' ? 'vnđ' : 'tệ'}`
					: `tạo yêu cầu rút tiền thành công cho khách ${data.UserName
					} số tiền ${data.Amount} ${page === 'vietnam' ? 'vnđ' : 'tệ'}`
			);
		},
		onError: toast.error
	});

	const mutationCreateRefund = useMutation(refund.create, {
		onSuccess: (_, data) => {
			toast.success(
				data.Status === 2
					? `Rút tiền vào ví cho khách ${data.UserName} thành công số tiền ${data.Amount
					} ${page === 'vietnam' ? 'vnđ' : 'tệ'}`
					: `tạo yêu cầu rút tiền thành công cho khách ${data.UserName
					} số tiền ${data.Amount} ${page === 'vietnam' ? 'vnđ' : 'tệ'}`
			);
		},
		onError: toast.error
	});

	const _onPress = (data: TWithDraw) => {
		// console.log("_onPress: ", data)
		page === 'vietnam'
			? mutationCreateWithDraw.mutateAsync(data)
			: mutationCreateRefund.mutateAsync(data);
		router.back();
	};

	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="col-span-1">
					<FormInput
						control={control}
						name="UserName"
						placeholder=""
						label="Username"
						disabled
						required={false}
						rules={{ required: 'This field is required' }}
					/>
			</div>
			<div className="col-span-1">
					<FormInputNumber
						required={false}
						control={control}
						name="Wallet"
						placeholder=""
						label={`Ví tiền (${page === 'china' ? '¥' : 'VNĐ'})`}
						disabled
						prefix={page === 'china' && '¥ '}
						suffix={page === 'vietnam' && ' VNĐ'}
						rules={{ required: 'This field is required' }}
					/>
			</div>
			<div className="col-span-1">
					{ page === 'vietnam' ? 
						<FormInputNumber
							control={control}
							name="Amount"
							placeholder=""
							label={`Số tiền (VNĐ)`}
							suffix={' VNĐ'}
							rules={{ required: 'This field is required nè' }}
							callback={(value) => {
								if (value > getValues("Wallet")) {
									toast.warning(`Bạn chỉ được rút tối đa ${_format.getVND(getValues("Wallet"))}`);
								}
							}}
						/> :
						<FormInputNumber
							control={control}
							name="Amount"
							placeholder=""
							label={`Số tiền (¥)`}
							prefix={'¥ '}
							rules={{ required: 'This field is required nè' }}
							callback={(value) => {
								if (value > getValues("Wallet")) {
									toast.warning(`Bạn chỉ được rút tối đa ${_format.getVND(getValues("Wallet"), "¥")}`);
								}
							}}
						/>
					}
			</div>
			<div className="col-span-1">
					<FormTextarea
						control={control}
						name="Note"
						placeholder=""
						label="Nội dung"
						required={false}
					/>
			</div>
			<div className="col-span-1">
					<FormSelect
						control={control}
						name="Status"
						data={paymentStatusData.slice(1, 3)}
						placeholder=""
						label="Trạng thái"
						defaultValue={paymentStatusData[1]}
						rules={{ required: 'This field is required' }}
					/>
			</div>
			<div className="col-span-1">
					<IconButton
						title="Cập nhật"
						onClick={handleSubmit(_onPress)}
						showLoading
						icon="fas fa-pencil"
						btnClass="!mr-2"
						btnIconClass='!mr-2'
						toolip=""
					/>
					<IconButton
						onClick={() => router.back()}
						icon="fas fa-undo-alt"
						title="Trở về"
						showLoading
						btnIconClass='!mr-2'
						toolip=""
					/>
			</div>
		</div>
	);
};
