'use client';
import { formatTimeDifference } from '@/utils/datetime';
import {} from '@radix-ui/react-avatar';
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Notification, Highlight } from '@/types/notification'; 
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useSocket } from '../providers/SocketProvider';
import { mutate } from 'swr';
import { getNotifications, markAsRead } from '@/lib/server-action/notification.action';

function HighlightedText({ text, highlights }: { text: string, highlights: Highlight[] }) {
  if (!highlights || highlights.length === 0) {
    return <>{text}</>;
  }

  const parts = [];
  let currentIndex = 0;

  highlights.forEach((highlight, index) => {
    if (highlight.offset > currentIndex) {
      parts.push(
        <span key={`${index}-text`}>{text.substring(currentIndex, highlight.offset)}</span>
      );
    }

    parts.push(
      <strong key={`${index}-highlight`}>{text.substring(highlight.offset, highlight.offset + highlight.length)}</strong>
    );
    currentIndex = highlight.offset + highlight.length;
  });

  if (currentIndex < text.length) {
    parts.push(<span key="remaining-text">{text.substring(currentIndex)}</span>);
  }

  return <>{parts}</>;
}

function sortNotification(notifications: Notification[]) {
  return notifications.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
}

export default function NotificationList() {
  const [liveNotifications, setLiveNotifications] = useState<Notification[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const socket = useSocket();

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        const data = await getNotifications(page);
        setHasMore(data.hasMore);
        setLiveNotifications(data.notifications ? sortNotification(data.notifications) : []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    initializeNotifications();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('notification', (payload: any) => {
        const notification: Notification = payload.data;
        console.log(notification);
        const parseNotification = { ...notification, content: notification.content };
        setLiveNotifications((prev) => {
          const index = prev.findIndex((msg) => msg.id === notification.id);
          if (index !== -1) {
            const updatedNotifications = [...prev];
            updatedNotifications[index] = parseNotification;
            return sortNotification(updatedNotifications);
          } else {
            return [parseNotification, ...prev];
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

  const handleNotificationClick = async (id: string) => {
    setLiveNotifications(prev => {
      const updatedNotifications = prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      );
      return updatedNotifications;
    });

    try {
      const response = await markAsRead(id);
      mutate('/notifications/count-unread');

      if (!response) {
        throw new Error('Failed to update notification');
      }
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const loadMoreNotifications = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getNotifications(page + 1);
      setHasMore(data.hasMore);
      setLiveNotifications((prev) => {
        const notificationIds = new Set(prev.map(notification => notification.id));
        const newNotifications = data.notifications.filter(
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
        <Link
          key={notification.id}
          className="flex p-2 hover:bg-accent rounded-lg  gap-4"
          href={notification.url}
          onClick={() => handleNotificationClick(notification.id)}
        >
          <Avatar className="w-14 h-14">
            <AvatarImage src={notification.subject?.imageUrl} className="object-cover" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div className="w-full">
          <div className="text-md max-h-[100px] line-clamp-3">
              <HighlightedText 
                text={ notification.content?.text || ''} 
                highlights={notification.content?.highlights || []}
              />
            </div>
            <p className="text-sm text-blue-500">
              {formatTimeDifference(new Date(notification.lastModified))}
            </p>
          </div>
          {notification.diObject?.imageUrl && (
            <div className="w-20 h-14 ml-4">
              <Image 
                src={notification.diObject?.imageUrl}
                alt="Post Image" 
                className="object-cover w-full h-full rounded-lg" 
                width={2000}
                height={2000}
              />
            </div>
          )}
          <div className="flex items-center">
            <div
              className={`w-3 h-3 ${
                notification.read ? "bg-none" : "bg-primary"
              } rounded-full`}
            ></div>
          </div>
        </Link>
      ))}
      <div className="flex justify-center mt-4">
        {hasMore && (
          <Button
            onClick={loadMoreNotifications}
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
