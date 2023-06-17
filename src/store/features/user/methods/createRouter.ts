import { routerList } from '~/configs/routers/routerList';

export const createRouter = (UserGroupId) => {
	const router = routerList.find((item) => item.id === UserGroupId);
	if (!router) return null;
	return router.router;
};
