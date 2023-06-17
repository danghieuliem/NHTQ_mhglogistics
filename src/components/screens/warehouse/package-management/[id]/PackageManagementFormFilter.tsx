import {Skeleton, Tooltip} from "antd";
import React from "react";
import {FilterInput} from "~/components/globals/filterBase";

type TProps = {
	handleFilter: (code: string) => void;
	loading: boolean;
};

export const PackageManagementFormFilter: React.FC<TProps> = ({handleFilter, loading}) => {
	return (
		<div className="flex my-4 max-w-[500px]">
			<Skeleton loading={loading} title={false} paragraph={{rows: 1, width: "100%"}}>
				<FilterInput
					placeholder="Mã vận đơn"
					id="code"
					name="cde"
					inputClassName="barcode"
					prefix={
						<Tooltip placement="topLeft" title={"Open barcode!"}>
							<div className="pl-2">
								<i className="fas fa-barcode text-2xl"></i>
							</div>
						</Tooltip>
					}
					handleSubmit={handleFilter}
				/>
			</Skeleton>
		</div>
	);
};
