/* eslint-disable @next/next/no-img-element */
'use client';
import { formatTimeDifference } from '@/utils/datetime';
import {} from '@radix-ui/react-avatar';
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Notification, Highlight } from '@/types/notification'; 
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

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

export default function NotificationList({ notifications }: { notifications: Notification[] }) {
  const [liveNotifications, setLiveNotifications] = useState<Notification[]>(notifications);
  useEffect(() => {
    const token = Cookies.get('token') || '';
    const socketOptions = {
      transportOptions: {
          polling: {
              extraHeaders: {
                  Authorization: 'Bearer ' + token, 
              }
          }
      }
    };
    const socket = io('http://localhost:3001', socketOptions);

    socket.on('connect', () => {
      console.log('Socket connection opened');
    });

    socket.on('notification', (payload: any) => {
      const notification: Notification = payload.data;
      console.log('Received notification', notification);
      setLiveNotifications((prev) => {
        const index = prev.findIndex((msg) => msg.id === notification.id);
        if (index !== -1) {
          const updatedNotifications = [...prev];
          let parseNotification = { ...notification, content: JSON.parse(notification.content as unknown as string) };
          updatedNotifications[index] = parseNotification;
          return updatedNotifications;
        } else {
          let parseNotification = { ...notification, content: JSON.parse(notification.content as unknown as string) };
          return [parseNotification, ...prev];
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('Socket connection closed');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {liveNotifications?.map((notification) => (
        <Link
          key={notification.id}
          className="flex p-2 hover:bg-accent rounded-lg  gap-4"
          href={notification.url}
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
              {formatTimeDifference(new Date(notification.updatedAt))}
            </p>
          </div>
          {notification.diObject?.imageUrl && (
            <div className="w-20 h-14 ml-4">
              <img 
                src={notification.diObject?.imageUrl}
                alt="Post Image" 
                className="object-cover w-full h-full rounded-lg" 
                // layout="responsive"
                width={56}
                height={56}
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
    </>
  );
}
