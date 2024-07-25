'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '../providers/SocketProvider';

export default function NotificationBadge({ initialCount }: { initialCount: number }) {
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(initialCount);
  const socket = useSocket();

  useEffect(() => {
       socket && socket.on('notification', (payload: any) => {

        const unreadCount = payload.data?.unreadCount || 0;
        setUnreadNotificationCount(unreadCount);

      return () => {
        socket.off('notification');
      };
    });
  }, [socket]);

  return (
    <div className="relative">
      {
        unreadNotificationCount > 0 && (
          <div className="absolute top-0 -right-1 inline-block bg-red-600 text-white text-xs font-bold px-1 rounded-full">
            {unreadNotificationCount}
          </div>
        )
      }
    </div>
  );
}
