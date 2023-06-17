export const sortOrderItemsIntoShops = ({
	orderShopTempData,
	orderTempData
}) => {
	const orderTempSortByShopId = orderShopTempData.reduce((result, item) => {
		result[item.Id] = [];
		return result;
	}, {});
	orderTempData.forEach((orderTemp) => {
		typeof orderTempSortByShopId[orderTemp.OrderShopTempId] &&
			orderTempSortByShopId[orderTemp.OrderShopTempId]?.push(orderTemp);
	});

	return orderShopTempData.map((orderShopTemp) => {
		return {
			...orderShopTemp,
			OrderTemps: orderTempSortByShopId[orderShopTemp.Id]
		};
	});
};
