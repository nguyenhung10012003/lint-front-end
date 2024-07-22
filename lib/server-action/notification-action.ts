'use server';

import api from '@/config/api';

export const getNotifications = async () => {
  return await api.get<any, any>('/notifications');
}

export const markAsRead = async (id: string) => {
  const response = await api.patch<any, any>(`/notifications/${id}`);
  return response.data;
}
