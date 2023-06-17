type TReportUser = Omit<TBaseReponseParams, 'Name' | 'Code' | 'Description'> & {
	UserName: string;
	Wallet: number;
	UserGroupName: string;
	Status: number;
	StatusName: string;
	SalerUserName: string;
	OrdererUserName: string;
	TotalWallet: number;
	GreaterThan0: number;
	Equals0: number;
	From1MTo5M: number;
	From5MTo10M: number;
	GreaterThan10M: number;
};
