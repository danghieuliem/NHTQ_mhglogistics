type TReportMainOrderRevenue = Omit<
	TBaseReponseParams,
	'Name' | 'Description' | 'Code'
> & {
	UserName: string;
	TotalPriceVND: number;
	PriceVND: number;
	FeeBuyPro: number;
	FeeShipCN: number;
	TQVNWeight: number;
	FeeWeight: number;
	OrderFee: number;
	BargainMoney: number;
	TotalOrder: number;
	TotalCus: number;
	MaxTotalPriceVND: number;
	MaxPriceVND: number;
	MaxFeeBuyPro: number;
	MaxFeeShipCN: number;
	MaxTQVNWeight: number;
	MaxFeeWeight: number;
	MaxOrderFee: number;
	MaxBargainMoney: number;
	MaxTotalOrder: number;
};
