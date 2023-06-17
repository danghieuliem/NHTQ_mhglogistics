type TDeposit = {
	id: number;
	username: string;
	code: string;
	kg: number;
	warehouseTQ: string;
	warehouseVN: string;
	transferName: string;
	transferId: number;
	taxVN: number;
	taxTQ: number;
	ppTQ: number;
	ppVN: number;
	created: Date;
	note: string;
	noteOfEmployee: string;
	done: Date;
	request: Date;
	outstock: Date;
	statusId: number;
	statusName: string;
	contentOfCancel: string;
};

type TDepositStatistic = {
	id: number;
	username: string;
	requestOutstock: Date;
	outstock: Date;
	totalOfItems: number;
	totalOfKg: string;
	totalOfTax: string;
	transfer: string;
	paymentStatusId: number;
	paymentStatusName: string;
	outstockStatusId: number;
	outstockStatusName: string;
	note: string;
};

type TRequestDepositOutstock = {
	user: number;
	code: string;
	UID: number;
	OrderTransactionCode: string;
};
