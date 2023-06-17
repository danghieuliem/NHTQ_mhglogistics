import BaseAPI from '../methods';

const { get } = new BaseAPI<{}>('dash-board');

export const dashboard = {
	getTotalInWeek: () => get<TTotalOrderInWeek>('/get-total-in-week'),
	getItemInWeek: () => get<TGetItemInWeek[]>('/get-item-in-week'),
	getPercentOrder: () =>
		get<{ Status: number; Name: string; Amount: number }[]>(
			'/get-percent-order'
		)
};
