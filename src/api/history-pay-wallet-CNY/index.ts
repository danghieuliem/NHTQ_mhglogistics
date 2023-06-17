import BaseAPI from '../methods';

type TFilterParams = {
	UID: number;
};

const { globalCRUD } = new BaseAPI<TUserHistoryTransactionRMB, TFilterParams>(
	'history-pay-wallet'
);

export const historyPayWalletCNY = globalCRUD;
