import BaseAPI from '../methods';

const { globalCRUD } = new BaseAPI<TNotification>('notification-setting');

export const notificationSetting = globalCRUD;
