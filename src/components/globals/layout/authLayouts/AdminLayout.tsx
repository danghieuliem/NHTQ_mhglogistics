import { selectUser, useAppDispatch, useAppSelector } from '~/store';

export const AdminLayout = ({ children }) => {
	const dispatch = useAppDispatch();

	return <>{children}</>;
};

export const CheckAdminLayout = ({ children }) => {
	const { user } = useAppSelector(selectUser);
	const userGroupId = user?.UserGroupId;
	if (!userGroupId || userGroupId === 2) return <>{children}</>;
	return <AdminLayout>{children}</AdminLayout>;
};
