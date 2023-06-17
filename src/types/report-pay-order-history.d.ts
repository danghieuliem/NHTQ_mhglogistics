type TReportPayOrderHistory = Omit<
	TBaseReponseParams,
	'Name' | 'Code' | 'Description'
> & {
	MainOrderId: number;
	UserName: string;
	Status: number;
	StatusName: string;
	Amount: number;
};
