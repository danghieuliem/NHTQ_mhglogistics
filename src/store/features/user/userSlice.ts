import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EPermission } from '~/configs';
import { createRouter } from './methods/createRouter';
import { HubConnection } from '@microsoft/signalr';

type TInitialState = {
	current: TUser;
	menuRouter: any;
	apiRoles: Record<string, EPermission[]> | undefined;
	connection: HubConnection;
};

const initialState: TInitialState = {
	current: undefined,
	menuRouter: null,
	apiRoles: undefined,
	connection: undefined
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TUser>) => {
			state.current = action.payload;
		},
		setRouter: (state, action) => {
			// console.log("state: ", state);
			// console.log("action: ", action);

			const router = createRouter(action.payload);
			state.menuRouter = router;
		},
		setApiRoles: (state, action) => {
			const _apiRoles = {};
			action.payload.Roles?.forEach((role) => {
				_apiRoles[role.RoleName] = role['Permissions'].map(
					(permissionNum: string) => parseInt(permissionNum)
				);
			});
			state.apiRoles = _apiRoles;
		},
		setConnection: (state, action: PayloadAction<HubConnection>) => {
			state.connection = action.payload;
		}
	}
});

export const { setUser, setRouter, setApiRoles, setConnection } =
	userSlice.actions;

export const userReducer = userSlice.reducer;
