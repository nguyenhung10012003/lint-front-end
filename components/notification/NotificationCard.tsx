"use client";
import { Notification, Highlight } from "@/types/notification";
import { Following } from "@/types/relationship";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RequestButtons } from "./RequestButtons";
import Link from "next/link";
import { formatTimeDifference } from "@/utils/datetime";
import Image from "next/image";
import api from "@/config/api";
import { markAsRead } from "@/lib/server-action/notification-action";
import { mutate } from "swr";

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
      <strong key={`${index}-highlight`}>
        {text.substring(highlight.offset, highlight.offset + highlight.length)}
      </strong>
    );
    currentIndex = highlight.offset + highlight.length;
  });

  if (currentIndex < text.length) {
    parts.push(<span key="remaining-text">{text.substring(currentIndex)}</span>);
  }

  return <>{parts}</>;
}

export function NotificationCard({ notification }: { notification: Notification }) {
  const [request, setRequest] = useState<Following | null>(null);
  const [read, setRead] = useState<boolean>(notification.read);

  useEffect(() => {
    const fetchRequest = async () => {
      if (notification.type === 'FOLLOW_REQUEST') {
        try {
          const data = await api.get<any, Following[]>(`/following`, {
            params: {
              where: {
                id: notification.diId,
              }
            }
          });
          setRequest(data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchRequest();
  }, [notification.type, notification.diId]);

  const handleClick = async () => {
    setRead(true);

    try {
      const response = await markAsRead(notification.id);
      mutate('/notifications/count-unread');

      if (!response) {
        throw new Error('Failed to update notification');
      }
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  return (
    <Link
      key={notification.id}
      className="relative flex p-2 hover:bg-accent rounded-lg  gap-4"
      href={notification.url}
      onClick={() => handleClick()}
    >
      <Avatar className="w-14 h-14">
        <AvatarImage src={notification.subjectUrl} className="object-cover" />
        <AvatarFallback>T</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="text-md max-h-[100px] line-clamp-3">
          <HighlightedText
            text={notification.compiledContent?.text || ''}
            highlights={notification.compiledContent?.highlights || []}
          />
        </div>
        <p className="text-sm text-blue-500">
          {formatTimeDifference(new Date(notification.lastModified))}
        </p>
        {notification.type === 'FOLLOW_REQUEST' && (
        request ? (
          <div className="">
            <RequestButtons request={request} handleClick={handleClick}/>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Request removed
          </p>
        )
      )}
      </div>
      {notification.diUrl && (
        <div className="w-20 h-14 ml-4">
          <Image
            src={notification.diUrl}
            alt="Post Image"
            className="object-cover w-full h-full rounded-lg"
            width={2000}
            height={2000}
          />
        </div>
      )}
      <div className="flex items-center">
        <div
          className={`w-3 h-3 ${read ? "bg-none" : "bg-primary"
            } rounded-full`}
        ></div>
      </div>
    </Link>
  )
}