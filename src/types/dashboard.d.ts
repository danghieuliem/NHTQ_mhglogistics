type TNewRecharge = TUserHistoryRechargeVND;

type TTheMostBalance = TClient;

type TTheMostOrders = TEmployee;

type TNewOrders = TOrder;

type TNewDeliveryOrders = TUserDeposit;

type TNewPaymentOrders = TRequestPaymentOrder;

type TTotalOrderInWeek = {
	MainOrderCount: number;
	MainOrderAnotherCount: number;
	TransportationOrderCount: number;
	PayHelpCount: number;
	TotalAmount: number;
};

type TGetItemInWeek = {
	DateOfWeek: Date;
	MainOrder: number;
	MainOrderAnother: number;
	TransportationOrder: number;
	PayHelp: number;
	AdminSendUserWallet: number;
};
