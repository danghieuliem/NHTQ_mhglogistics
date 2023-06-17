import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartInfoByUserId, sortOrderItemsIntoShops } from '.';

const initialState: TCartState = {
	currentCart: [],
	selectedShopIds: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setSelectedShopIds: (state, action: PayloadAction<number[]>) => {
			state.selectedShopIds = action.payload;
		},
		updateOrderTempById: (
			state,
			{ payload }: PayloadAction<TUserCartOrderTemp>
		) => {
			state.currentCart = state.currentCart.map((shop) => {
				
				if (shop.Id !== payload.Id) return shop;
				return { ...shop, ...payload };
			});
		},
		deleteOrderTempById: (state, action: PayloadAction<number>) => {
			const newCurrentCart = state.currentCart.map((shop) => {
				let newOrderTemps = shop.OrderTemps.filter(
					(x) => x.Id !== action.payload
				);
				if (!!newOrderTemps.length) {
					return {
						...shop,
						OrderTemps: newOrderTemps
					};
				} else {
					return undefined;
				}
			});
			state.currentCart = newCurrentCart.filter((x) => !!x);
		},
		deleteOrderShopTempById: (state, action: PayloadAction<number>) => {
			state.currentCart = state.currentCart.filter(
				(x) => x.Id !== action.payload
			);
		},
		updateFieldOrderShopTempById: (
			state,
			action: PayloadAction<TUserCartOrderShopTemp>
		) => {
			const idx = state.currentCart.findIndex(
				(x) => x.Id === action.payload.Id
			);
			if (idx >= 0) {
				state.currentCart[idx] = { ...action.payload };
			}
		}
	},
	extraReducers: (buidlder) => {
		buidlder.addCase(getCartInfoByUserId.fulfilled, (state, { payload }) => {
			// state.selectedShopIds = [];
			state.currentCart = sortOrderItemsIntoShops(payload);
		});
	}
});

export const {
	setSelectedShopIds,
	updateOrderTempById,
	deleteOrderTempById,
	deleteOrderShopTempById,
	updateFieldOrderShopTempById
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
