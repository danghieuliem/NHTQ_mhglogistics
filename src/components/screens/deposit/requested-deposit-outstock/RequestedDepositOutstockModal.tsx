import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { exportRequestTurn, outStockSession } from '~/api';
import { Modal, FormCard, Button } from '~/components';
import { FormInput, FormSelect } from '~/components/globals/formBase';
import { showToast } from '~/components/toast';
import { useCatalogue } from '~/hooks/useCatalogue';
import { TForm } from '~/types/table';

export const RequestedDepositOutstockModal: React.FC<
	TForm<{}> & { SmallPackageIds: number[] }
> = ({ onCancel, visible, SmallPackageIds }) => {
	const { control, handleSubmit } = useForm<TExportRequestTurn>({
		mode: 'onBlur'
	});

	const { shippingTypeToVN } = useCatalogue({ shippingTypeToVNEnabled: true });

	const router = useRouter();
	const _onPress = async (data) => {
		try {
			const res = await exportRequestTurn.create({
				...data,
				SmallPackageIds
			});
			router.push(`/deposit/non-request-deposit-outstock/${res?.Data?.Id}`);
		} catch (error) {
			showToast({
				title: (error as any)?.response?.data?.ResultCode,
				message: (error as any)?.response?.data?.ResultMessage,
				type: 'error'
			});
		}
	};

	return (
		<Modal visible={visible} onCancel={undefined}>
			<FormCard>
				<FormCard.Header onCancel={onCancel}>
					<p>Xuất kho</p>
				</FormCard.Header>
				<FormCard.Body>
					<div className="grid grid-cols-1 gap-4">
						<div className="col-span-1">
							<FormSelect
								control={control}
								name="ShippingTypeInVNId"
								data={shippingTypeToVN}
								select={{ label: 'Name', value: 'Id' }}
								placeholder="Chọn hình thức giao hàng"
								label="Hình thức giao hàng"
								rules={{ required: 'This field is required' }}
							/>
						</div>
						<div className="col-span-1">
							<FormInput
								control={control}
								name="Note"
								label="Ghi chú"
								placeholder=""
								required={false}
							/>
						</div>
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button
						title="Xuất kho"
						btnClass="!bg-orange"
						onClick={handleSubmit(_onPress)}
					/>
					<Button title="Huỷ" btnClass="!bg-red" onClick={onCancel} />
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
