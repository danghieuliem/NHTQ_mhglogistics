type TExportRequestTurn = Omit<TBaseReponseParams, 'Name' | 'Code' | 'Description'> & {
	MainOrderId: number;
	TotalPriceVND: number;
	TotalPriceCNY: number;
	TotalWeight: number;
	Note: string;
	ShippingTypeInVNId: number;
	UID: number;
	StaffNote: string;
	Status: number;
	StatusExport: number;
	OutStockDate: Date;
	Type: number;
	smallPackageIds: number[];
};
