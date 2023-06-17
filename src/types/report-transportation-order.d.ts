type TReportTransportationOrder = Omit<
	TBaseReponseParams,
	'Name' | 'Code' | 'Description'
> & {
	UserName: string;
	OrderTransactionCode: string;
	Weight: number;
	WareHouseFrom: string;
	WareHouseTo: string;
	ShippingTypeName: string;
	SensorFeeVND: number;
	AdditionFeeVND: number;
	FeeWeightPerKg: number;
	TotalPriceVND: number;
	DateInTQWarehouse: Date;
	DateInLasteWareHouse: Date;
	DateExportRequest: Date;
	DateExport: Date;
	Status: number;
	StatusName: string;
	MaxWeight: number;
	MaxTotalPriceVND: number;
};
