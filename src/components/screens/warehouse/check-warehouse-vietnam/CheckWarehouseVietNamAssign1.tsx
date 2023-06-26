import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormCard, FormInput, Modal } from '~/components';
import { useDeepEffect } from '~/hooks';

type TProps = {
	visible: boolean;
	onCancel: () => void;
	item: TWarehouseVN;
	onPress: (data: (TWarehouseVN & Partial<TAddtionalFieldWarehouse>)[]) => void;
};

type TForm = TWarehouseVN & TAddtionalFieldWarehouse;

export const CheckWarehouseVietNamAssign1: React.FC<TProps> = ({
	onCancel,
	onPress,
	visible,
	item
}) => {
	const { control, handleSubmit, reset } = useForm<TForm>({ mode: 'onBlur' });

	useDeepEffect(() => {
		if (item) {
			reset(item);
		}
	}, [item]);

	return (
		<Modal visible={visible} onCancel={onCancel}>
			<FormCard>
				<FormCard.Header onCancel={onCancel}>
					<p>Thêm mã kiện mới</p>
				</FormCard.Header>
				<FormCard.Body>
					<div className="mb-2">
						<FormInput
							control={control}
							name="OrderTransactionCode"
							label="Mã vận đơn"
							placeholder=""
							required={false}
							inputClassName="mb-4"
							disabled
						/>
					</div>
					<div>
						<FormInput
							control={control}
							name="AssignMainOrderId"
							label="Order ID"
							placeholder=""
							rules={{
								required: 'This field is required'
							}}
						/>
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button
						title="Thêm"
						btnClass="!bg-main mr-2"
						onClick={handleSubmit((data) =>
							onPress([{ ...data, IsAssign: true, AssignType: 1 }])
						)}
					/>
					<Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
