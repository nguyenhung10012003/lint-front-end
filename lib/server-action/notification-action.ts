import { notificationApi, api } from '@/config/api';
import { locales } from '@/utils/locale';

export async function updateLanguage(params: { localeKey: string }) {
  const form = new FormData();
  form.append('language', locales.findIndex(
    locale => locale.key === params.localeKey).toString()
  );

  try {
    await notificationApi.patch<any, any>('/notifications/user/language', form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getNotifications(page: number = 1, take: number = 5) {
  return await notificationApi.get<any, any>(
    `/notifications?skip=${(page - 1) * take}&take=${take}`,
  )
}

export async function markAsRead(id: string) {
  return await notificationApi.patch<any, any>(`/notifications/${id}`, { read: true });
}

export async function getUnreadCount() {
  return await notificationApi.get<any, any>('/notifications/count-unread');
} 

export async function changeNotificationLanguage(language: string) {
  try {
    await notificationApi.patch('/notifications/user/language', {
      lang: language,
    });
  } catch (error) {
    console.error(error);
  }
}