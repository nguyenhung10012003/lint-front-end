'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '../providers/SocketProvider';
import Cookies from 'js-cookie';
import { Icons } from '../Icons';

interface NotificationProps {
  onResetUnreadCount?: () => void;
  iconVariant?: 'outline' | 'solid';
}

export default function NotificationWithBadge({ onResetUnreadCount, iconVariant }: NotificationProps) {
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const socket = useSocket();

  const fetchUnreadCount = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/count-unread`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      const data = await response.json();
      const unreadCount = data.count || 0;
      setUnreadNotificationCount(unreadCount);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  
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

  const handleIconClick = () => {
    setUnreadNotificationCount(0);
    if (onResetUnreadCount) onResetUnreadCount();
  };

  return (
    <div className="relative">
      {unreadNotificationCount > 0 && (
        <div className="absolute top-0 -right-1 inline-block bg-red-600 text-white text-xs font-bold px-1 rounded-full">
          {unreadNotificationCount}
        </div>
      )}
      <div>
        <Icons.notification className="w-6 h-6" variant={iconVariant} />
      </div>
    </div>
  );
}
