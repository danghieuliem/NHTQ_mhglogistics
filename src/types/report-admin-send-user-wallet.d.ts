type TReportAdminSendUserWallet = Omit<
	TBaseReponseParams,
	'Name' | 'Code' | 'Description'
> & {
	UserName: string;
	Amount: number;
	TotalAmount: number;
	Status: number;
	StatusName: string;
	BankName: string;
};
