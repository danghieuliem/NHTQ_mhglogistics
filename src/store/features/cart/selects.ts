import { RootState } from '~/store';

export const selectCartUserInfo = (state: RootState) => ({
	currentCart: state.cart.currentCart,
	allShopIds: state.cart.currentCart.map((item) => item.Id),
	allMoneyOnlyProduct: state.cart.currentCart.reduce(
		(result, item) => result + item.PriceVND,
		0
	)
});

export const selectPaymentCartUserInfo = (state: RootState) => ({
	paymentCart: state.cart.currentCart.filter((item) =>
		state.cart.selectedShopIds.includes(item.Id)
	),
	selectedShopIds: state.cart.selectedShopIds
});

export const selectCart = () => (state: RootState) => state.cart;
