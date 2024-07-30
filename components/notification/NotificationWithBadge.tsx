'use client';
import api from "@/config/api";
import { useState, useEffect } from 'react';
import { useSocket } from '../providers/SocketProvider';
import { Icons } from '../Icons';
import useSWR from 'swr';


interface NotificationProps {
  variant?: 'outline' | 'solid';
}

export default function NotificationWithBadge({ variant }: NotificationProps) {
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const socket = useSocket();

  const fetcher = (url: string) => {
    return api.get<any, any>(url);
  };
  
  const { data } = useSWR('/notifications/count-unread', fetcher);

  useEffect(() => {
    if (data) {
      const unreadCount = data?.count || 0;
      setUnreadNotificationCount(unreadCount);
    }
  }, [data]);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (payload: any) => {
      const unreadCount = payload.data?.unreadCount || 0;
      setUnreadNotificationCount(unreadCount);
    };

    socket.on('notification', handleNotification);

    return () => {
      socket.off('notification', handleNotification);
    };
  }, [socket]);

  return (
    <div className="relative">
      {unreadNotificationCount > 0 && (
        <div className="absolute top-0 -right-1 inline-block bg-red-600 text-white text-xs font-bold px-1 rounded-full">
          {unreadNotificationCount}
        </div>
      )}
      <div>
        <Icons.notification className="w-6 h-6" variant={variant} />
      </div>
    </div>
  );
}
