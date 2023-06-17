import { Checkbox, Empty, Tag, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { userGroup } from '~/api';
import { DataTable, IconButton } from '~/components';
import { toast } from '~/components/toast';
import { permissionsConstList } from '~/configs';
import { useDeepEffect } from '~/hooks';
import { TColumnsType } from '~/types/table';

type TUserGroupPermissions = {
	PermitObjectPermissions: {
		Permissions: number[];
		PermitObjectId: number;
		Id?: number;
	}[];
};

export const ApiPermissionsTable = ({ allApis, isLoadingAllApis }) => {
	const { id } = useRouter().query;
	const [userGroupPermissions, setUserGroupPermissions] =
		useState<TUserGroupPermissions>();

	const {
		data,
		refetch: refetchUserGroup,
		isError: isUserGroupError,
		refetch,
		isLoading: isLoadingUserGroup
	} = useQuery(
		['get-usergroup-by-id', id],
		() => userGroup.getByID(parseInt(id as string)).then((res) => res?.Data),
		{
			onError: toast.error,
			refetchOnWindowFocus: false,
			refetchOnReconnect: true
		}
	);

	if (isUserGroupError) return <Empty />;

	useDeepEffect(() => {
		if (!allApis || !data) return;
		const permissionsDefault = allApis.map((permit) => ({
			PermitObjectId: permit.Id,
			Permissions: Array(9).fill(0),
			Description: permit.Description,
			UserGroupId: id,
			Name: permit.Name
		}));

		const existPermitObjectPermissions = data.PermitObjectPermissions;

		const newExistPermitObjectPermissions = existPermitObjectPermissions.map(
			(item) => ({
				...item,
				Permissions: item.Permissions.split(',').map((str) => parseInt(str))
			})
		);

		newExistPermitObjectPermissions.forEach((existItem) => {
			const indexInPermissionsDefault = permissionsDefault.findIndex(
				(i) => i.PermitObjectId === existItem.PermitObjectId
			);
			if (indexInPermissionsDefault === -1) return;
			permissionsDefault[indexInPermissionsDefault].Permissions =
				existItem.Permissions;
			// permissionsDefault[indexInPermissionsDefault].Id = existItem.Id;
		});

		setUserGroupPermissions({
			...data,
			PermitObjectPermissions: permissionsDefault
		});
	}, [data, allApis]);

	const permissionsColumns = permissionsConstList.map((permissionConst) => {
		const column = {
			dataIndex: 'Permissions',
			title: permissionConst.Name,
			key: `Permissions-${permissionConst.Id}`,
			align: 'center' as 'center',
			render: (permitObjectIds, _, index) => {
				const permissionConstIndex = permissionConst.Id - 1;
				let isCheck = false;
				isCheck = permitObjectIds[permissionConstIndex] === 1;

				const onChange = () => {
					setUserGroupPermissions((preState) => {
						const newState = { ...preState };
						newState.PermitObjectPermissions[index].Permissions[
							permissionConstIndex
						] =
							newState.PermitObjectPermissions[index].Permissions[
								permissionConstIndex
							] === 1
								? 0
								: 1;
						return newState;
					});
				};
				return <Tooltip title={permissionConst.Name} ><Checkbox checked={isCheck} onChange={onChange} /></Tooltip>;
			},
			sorter: true,
			responsive: ['md'] as ['md']
		};
		return column;
	});

	const { mutate, isLoading: isUpdatePermissions } = useMutation(
		async () => {
			const payload = {
				...userGroupPermissions,
				PermitObjectPermissions:
					userGroupPermissions?.PermitObjectPermissions?.filter((item) =>
						item.Permissions.find((num) => num === 1)
					).map((item) => ({
						...item,
						Permissions: item.Permissions.join(',')
					}))
			};
			userGroup.update(payload);
		},
		{
			onError: toast.error,
			onSuccess: () => {
				toast.success('Cập nhật thành công');
				refetch();
			}
		}
	);

	const columns: TColumnsType<any> = [
		{
			key: 'PermitObjectId',
			dataIndex: 'Permissions',
			title: 'Id',
			align: 'center',
			render: (permissions, __, index) => {
				const onClick = () => {
					const isFullPermissions = permissions.every((item) => item === 1);
					setUserGroupPermissions((preState) => {
						const newState = { ...preState };
						if (isFullPermissions) {
							newState.PermitObjectPermissions[index].Permissions =
								Array(9).fill(0);
						}
						if (!isFullPermissions) {
							newState.PermitObjectPermissions[index].Permissions =
								Array(9).fill(1);
						}
						return {
							...preState,
							PermitObjectPermissions: preState.PermitObjectPermissions
						};
					});
				};
				return (
					<Tag color="geekblue" onClick={onClick} className="cursor-pointer">
						{index}
					</Tag>
				);
			},
			sorter: true
		},
		{
			key: 'Tên',
			dataIndex: 'Name',
			title: 'Tên chức năng',
			align: 'center',
			sorter: true,
			width: 200
		},
		{
			key: 'Description',
			dataIndex: 'Description',
			title: 'Tên chức năng',
			align: 'center',
			sorter: true,
			width: 200
		},
		...permissionsColumns
	];


	return (
		<>
			<div className="px-4 bg-label text-white flex items-center">
				<IconButton
					title={'Cập nhật'}
					icon={'fas fa-plus '}
					toolip={'Thêm chức năng'}
					btnClass="iconGreen ml-4 my-3"
					green
					onClick={mutate}
					disabled={
						isUpdatePermissions || isLoadingUserGroup || isLoadingAllApis
					}
				/>
				<span className='ml-4 font-medium'>{data?.Name}</span>
			</div>
			<DataTable
				columns={columns}
				data={userGroupPermissions?.PermitObjectPermissions.map(
					(item, index) => ({ ...item, key: index })
				)}
				loading={isLoadingAllApis || isLoadingUserGroup}
				scroll={{ y: 600 }}
			/>
		</>
	);
};
