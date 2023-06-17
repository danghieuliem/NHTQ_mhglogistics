import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormCard, FormInput } from '~/components';
import { Modal } from 'antd';

type TProps = {
	visible: boolean;
	onConfirm: (data: { Note: string }) => void;
	onCancel: () => void;
	id?: number;
	title?: string;
	input?: { label: string; placeholder: string };
};

export const ModalDelete: React.FC<TProps> = ({
	onCancel,
	onConfirm,
	visible,
	id,
	title,
	input
}) => {
	const { control, handleSubmit } = useForm<{ Note: string }>({
		mode: 'onBlur'
	});

	return (
		<Modal
			style={{ top: 300 }}
			closable={false}
			footer={null}
			visible={visible}
			onCancel={onCancel}
		>
			<FormCard>
				<FormCard.Header>
					<p className="text-sm">
						{title || 'Bạn có chắc muốn xoá ID #' + id}
					</p>
				</FormCard.Header>
				{input && (
					<FormCard.Body>
						<FormInput
							control={control}
							name="Note"
							label={input.label}
							placeholder={input.placeholder}
							rules={{ required: 'This field is required' }}
						/>
					</FormCard.Body>
				)}
				<FormCard.Footer>
					<div className="flex justify-center">
						<Button
							title="Xác nhận"
							showLoading={true}
							onClick={input ? handleSubmit(onConfirm) : onConfirm}
							btnClass="!bg-main"
						/>
						<Button title="Huỷ bỏ" onClick={onCancel} btnClass="!bg-red" />
					</div>
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
