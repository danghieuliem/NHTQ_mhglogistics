import React from "react";
import {FilterInput} from "~/components";

type TProps = {
	handleFilter: (tracking: string) => void;
};

export const TrackingFilter: React.FC<TProps> = ({handleFilter}) => {
	return (
		<FilterInput
			name="tracking"
			placeholder="Mã vận đơn"
			allowClear={false}
			id="tracking"
			handleSubmit={handleFilter}
		/>
	);
};
