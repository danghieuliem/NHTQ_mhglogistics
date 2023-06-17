type TRefund = Omit<TBaseReponseParams, 'Code' | 'Name' | 'Description'> & {
	UID: number;
	UserName: string;
	Amount: number;
	Note: string;
	Status: number;
	StatusName: string;
};
