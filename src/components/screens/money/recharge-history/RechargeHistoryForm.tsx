import React from "react";
import {useForm} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {adminSendUserWallet} from "~/api";
import {
	FormCheckbox,
	FormInput,
	FormInputNumber,
	FormSelect,
	FormTextarea,
	Button,
	Modal,
	FormCard,
} from "~/components";
import {toast} from "~/components/toast";
import {paymentStatusData, EPaymentStatusData} from "~/configs/appConfigs";
import {useDeepEffect} from "~/hooks";
import {TForm} from "~/types/table";

export const RechargeHistoryForm: React.FC<TForm<TUserHistoryRechargeVND>> = ({onCancel, visible, defaultValues}) => {
	const {handleSubmit, control, watch, reset} = useForm<TUserHistoryRechargeVND>({
		mode: "onBlur",
	});

	const {data, isLoading} = useQuery(
		["clientRechargeData", defaultValues?.Id],
		() => adminSendUserWallet.getByID(defaultValues?.Id),
		{
			enabled: !!defaultValues?.Id,
			refetchOnWindowFocus: false,
			onSuccess: (data) => reset(data?.Data),
			onError: toast.error,
		}
	);

	useDeepEffect(() => {
		reset(defaultValues);
	}, [defaultValues]);
	const queryClient = useQueryClient();
	const mutationUpdate = useMutation(adminSendUserWallet.update, {
		onSuccess: (data) => {
			toast.success("Cập nhật nạp tiền thành công");
			queryClient.setQueryData(["clientRechargeData", defaultValues?.Id], data.Data);
			queryClient.invalidateQueries(["clientRechargeData"]);
			queryClient.invalidateQueries(["clientData"]);
			onCancel();
		},
		onError: toast.error,
	});

	const _onPress = (data: TUserHistoryRechargeVND) => {
		// mutationUpdate.mutateAsync(data);
		const {Updated, UpdatedBy, ...props} = data;
		return mutationUpdate.mutateAsync(props);
	};

	return (
		<Modal visible={visible} onCancel={onCancel}>
			<FormCard loading={isLoading}>
				<FormCard.Header onCancel={onCancel}>
					<div className="w-full">
						<p>Thông tin nạp tiền #{defaultValues?.Id}</p>
					</div>
				</FormCard.Header>
				<FormCard.Body>
					<div className="grid grid-cols-2 gap-4">
						<div className="col-span-1">
							<FormInput
								control={control}
								name="UserName"
								label="Username"
								placeholder=""
								disabled
								rules={{
									required: "This is required field",
								}}
							/>
						</div>
						<div className="col-span-1">
							<FormInputNumber
								control={control}
								name="Amount"
								label="Số tiền nạp (VNĐ)"
								placeholder=""
								disabled
								suffix=" VNĐ"
								rules={{
									required: "This is required field",
								}}
							/>
						</div>
						<div className="col-span-2">
							<FormTextarea control={control} name="TradeContent" label="Nội dung" required={false} placeholder="" />
						</div>
						<div className="col-span-2">
							<FormSelect
								control={control}
								name="Status"
								disabled={data?.Data?.Status !== EPaymentStatusData.Unapproved}
								data={paymentStatusData.slice(1)}
								defaultValue={paymentStatusData.find((x) => x.id === defaultValues?.Status)}
								label="Trạng thái"
								placeholder=""
								rules={{
									required: "This is required field",
								}}
							/>
						</div>
					</div>
				</FormCard.Body>
				<FormCard.Footer>
					<Button title="Cập nhật" btnClass="!bg-main" showLoading onClick={handleSubmit(_onPress)} />
					<Button title="Hủy" btnClass="bg-pending" onClick={onCancel} />
				</FormCard.Footer>
			</FormCard>
		</Modal>
	);
};
