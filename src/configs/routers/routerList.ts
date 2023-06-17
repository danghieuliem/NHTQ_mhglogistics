import {
	accountantRouter,
	salerRouter,
	repoCNRouter,
	repoVNRouter,
	ordererRouter,
	adminRouter,
	managerRouter
} from '~/configs/routers';

export const routerList: { id: number; router: any[] }[] = [
	{ id: 1, router: adminRouter },
	{ id: 3, router: managerRouter },
	{ id: 4, router: ordererRouter },
	{ id: 5, router: repoCNRouter },
	{ id: 6, router: repoVNRouter },
	{ id: 7, router: salerRouter },
	{ id: 8, router: accountantRouter }
];
