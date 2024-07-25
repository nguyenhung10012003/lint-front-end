'use server';

import api from '@/config/api';

export const getUnreadCount = async () => {
  return await api.get<any, any>('/notifications/count-unread');
};
