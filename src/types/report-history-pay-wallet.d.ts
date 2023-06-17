type TReportHistoryPayWallet = Omit<TBaseReponseParams> & {
	Content: string;
	Amount: number;
	TradeType: number;
	MoneyLeft: number;
	TotalAmount: number;
	TotalDeposit: number;
	TotalReciveDeposit: number;
	TotalPaymentBill: number;
	TotalAdminSend: number;
	TotalWithDraw: number;
	TotalCancelWithDraw: number;
	TotalComplain: number;
	TotalPaymentTransport: number;
	TotalPaymentHo: number;
	TotalPaymentSaveWare: number;
	TotalRecivePaymentTransport: number;
};
