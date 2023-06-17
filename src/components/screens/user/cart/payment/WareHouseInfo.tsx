import {useEffect, useState} from "react";
import {DataTable} from "~/components/globals/table";
import {useCatalogue} from "~/hooks";
import {TColumnsType} from "~/types/table";

export const WareHouseInfo = () => {
	const {warehouseTQ, warehouseVN} = useCatalogue({
		warehouseTQEnabled: true,
		warehouseVNEnabled: true,
	});

	const [wareHouse, setWarehouse] = useState([]);

	useEffect(() => {
		if (warehouseVN && warehouseTQ) {
			const newW = [...warehouseTQ, ...warehouseVN];
			newW.forEach((item, index) => {
				item.Id = index;
			});

			setWarehouse(newW);
		}
	}, [warehouseVN, warehouseTQ]);

	const columns: TColumnsType<any> = [
		{
			dataIndex: "Id",
			title: "ID",
			render: (_, __, index) => <>{++index}</>,
		},
		{
			dataIndex: "Address",
			title: "Địa chỉ",
			render: (_, record) => <>{record?.Address}</>,
		},
		{
			dataIndex: "Name",
			title: "Tên kho",
			render: (_, record) => <>{record?.Name}</>,
		},
	];

	return (
		<div className="grid grid-cols-2 tableBox mb-4">
			<h2 className="col-span-2 text-[#141046] font-semibold">Thông tin kho</h2>
			<div className="col-span-2">
				<DataTable
					{...{
						columns,
						data: wareHouse,
					}}
				/>
			</div>
		</div>
	);
};
