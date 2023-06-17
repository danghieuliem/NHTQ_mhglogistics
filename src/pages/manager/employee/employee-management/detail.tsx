import {useRouter} from "next/router";
import React, {useRef} from "react";
import {useQuery} from "react-query";
import {user} from "~/api";
import {EmployeeManagementDetailForm, Empty, Layout} from "~/components";
import {breadcrumb} from "~/configs";
import {SEOConfigs} from "~/configs/SEOConfigs";
import {useCatalogue} from "~/hooks/useCatalogue";
import {TNextPageWithLayout} from "~/types/layout";

const Index: TNextPageWithLayout = () => {
	const {query} = useRouter();
	const oriEmail = useRef(null);
	const oriPhone = useRef(null);

	const {data, isLoading, isError} = useQuery(["employeeData", +query?.id], () => user.getByID(+query?.id), {
		onSuccess: (data) => {
			oriEmail.current = data.Data.Email;
			oriPhone.current = data.Data.Phone;
			return data.Data;
		},
		enabled: !!query?.id,
		retry: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	// useCatalogue scope
	// ===== BEGIN =====
	const {userGroup, userLevel, userOrder, userSale} = useCatalogue({
		userGroupEnabled: !!query?.id,
		userLevelEnabled: !!query?.id,
		userOrderEnabled: !!query?.id,
		userSaleEnabled: !!query?.id,
	});
	// ===== END =====

	if (isError) return <Empty description={`Không tìm thấy nhân viên #${query?.id}`} />;

	return (
		<div className="">
			<EmployeeManagementDetailForm
				{...{
					defaultValues: data?.Data,
					userLevelCatalogue: userLevel,
					userGroupCatalogue: userGroup,
					userOrderCatalogue: userOrder,
					userSaleCatalogue: userSale,
					loading: isLoading,
					oriEmail: oriEmail,
					oriPhone: oriPhone,
				}}
			/>
		</div>
	);
};

Index.displayName = SEOConfigs.staff.infoAccount;
Index.breadcrumb = breadcrumb.employee.employeeManagement.detail;
Index.Layout = Layout;

export default Index;
