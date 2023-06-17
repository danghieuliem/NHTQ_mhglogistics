import { Checkbox, Skeleton } from 'antd';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { permitObject } from '~/api';
import { toast } from '~/components/toast';
import { useCatalogue, useToggle } from '~/hooks';
import { ActionButton } from '../button/ActionButton';

export const AuthToolTip = ({ controller, permissionsRequired }) => {
	const { userGroup } = useCatalogue({
		userGroupEnabled: true
	});
	const permissionId = permissionsRequired[0];
	const [openForm, toggleOpenForm] = useToggle();

	const [dataForm, setDataForm] = useState<TUpdateUserGroupPermit[]>();

	const { isLoading, refetch, isFetching } = useQuery(
		[
			'user-group-for-permit-object',
			{
				PermitObjectCode: controller,
				PermissionId: permissionId,
				openForm
			}
		],
		() =>
			permitObject
				.getUserGroups({
					PermitObjectCode: controller,
					PermissionId: permissionsRequired[0]
				})
				.then((res) => res.Data),
		{
			onError: toast.error,
			enabled: openForm && userGroup !== undefined,
			onSuccess: (data) => {
				if (!data || data.length === 0) return;
				const permitObjectId = data[0].PermitObjectId;
				const _userGroup = userGroup.map((item) => {
					const _newItem = {
						userGroupId: item.Id,
						name: item.Name,
						isCheck: false,
						permitObjectId,
						permissionId: permissionId
					};
					return _newItem;
				});

				data.forEach((item) => {
					const _findUserGroup = _userGroup.find((_item) => {
						return _item.userGroupId === item.UserGroupId;
					});
					if (!_findUserGroup) return;
					_findUserGroup.isCheck = true;
				});
				setDataForm(_userGroup);
			},
			refetchOnReconnect: true,
			refetchOnWindowFocus: false
		}
	);

	const { mutate, isLoading: isUpdating } = useMutation(
		async () => {
			const updateData = dataForm.map((item) => ({
				userGroupId: item.userGroupId,
				permitObjectId: item.permitObjectId,
				permissionId: item.permissionId,
				isCheck: item.isCheck
			}));
			// console.log(JSON.stringify(updateData));
			await permitObject.updateUserGroups(updateData);
		},
		{
			onError: toast.error,
			onSuccess: () => {
				toast.success('Update quyền thành công');
				refetch();
			}
		}
	);

	const toggleChecked = (item) => {
		setDataForm((preState) => {
			const newState = [...preState];
			const _item = newState.find((i) => i.userGroupId === item.userGroupId);
			_item.isCheck = !_item.isCheck;
			return newState;
		});
	};

	return (
		<div className="w-[max-content] ">
			<div className="flex justify-start items-center space-x-1">
				<p
					className="text-center cursor-pointer"
					onClick={() => toggleOpenForm()}
				>
					{(isLoading || isFetching) && '...Đang Lấy Quyền'}
					{!isLoading && !isFetching && 'Check Quyền'}
				</p>
				<ActionButton
					onClick={() => {
						if (isUpdating) return;
						openForm && mutate();
					}}
					icon="fad fa-edit"
					title={isUpdating ? 'Đang cập nhật..' : 'Cập nhật'}
				/>
			</div>
			{openForm && dataForm?.length > 0 && (
				<div className="bg-white  text-black px-2 py-1 text-left mb-1">
					{dataForm.map((dataFormItem) => {
						return (
							<div className="flex justify-between items-center">
								<Checkbox
									checked={dataFormItem.isCheck}
									onChange={() => {
										toggleChecked(dataFormItem);
									}}
									name={dataFormItem.name}
								>
									{dataFormItem.name}
								</Checkbox>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
