'use client';
import {} from '@radix-ui/react-avatar';
import { Notification } from '@/types/notification'; 
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { getNotifications } from '@/lib/server-action/notification-action';
import { NotificationCard } from './NotificationCard';

import { SocketToConnect, useSocket } from '../providers/SocketProvider';

function sortNotification(notifications: Notification[]) {
  return notifications.sort(
    (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );
}

export default function NotificationList() {
  const [liveNotifications, setLiveNotifications] = useState<Notification[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const fetchPerPage = 7;

  const socket = useSocket(SocketToConnect.Notification);

  useEffect(() => {
    const initializeNotifications = async () => {
        const data = await getNotifications(page, fetchPerPage);
        if (data && data.length === fetchPerPage) {
          setHasMore(true);
        }
        setLiveNotifications(data ? sortNotification(data) : []);
    };
    initializeNotifications();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('notification', (payload: any) => {
        const notification: Notification = payload.data;
        setLiveNotifications((prev) => {
          const index = prev.findIndex((msg) => msg.id === notification.id);
          if (index !== -1) {
            const updatedNotifications = [...prev];
            updatedNotifications[index] = notification;
            return sortNotification(updatedNotifications);
          } else {
            return [notification, ...prev];
          }
        });
      });
    } else {
      console.log('Socket is not available');
    }
    return () => {
      if (socket) {
        socket.off('notification');
      }
    };
  }, [socket]);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getNotifications(page + 1, fetchPerPage);
      if (!data || data.length < fetchPerPage) {
        setHasMore(false);
      }
      setLiveNotifications((prev) => {
        const notificationIds = new Set(prev.map(notification => notification.id));
        const newNotifications = data.filter(
          (notification: Notification) => !notificationIds.has(notification.id)
        );
        return sortNotification([...prev, ...newNotifications]);
      });
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {liveNotifications?.map((notification) => (
        <NotificationCard 
          key={notification.id}
          notification={notification}
        />
      ))
      }
      <div className="flex justify-center mt-4">
        {hasMore && (
          <Button
            onClick={loadMore}
            disabled={loading}
            className="w-full bg-accent text-accent-foreground font-semibold hover:bg-accent/50"
          > 
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </div>  
    </>
  );
}
