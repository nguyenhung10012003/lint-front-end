"use client";
import { closeSocket, getSocket } from "@/utils/socket";
import Cookies from "js-cookie";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
  notificationSocket: Socket | null;
  chatSocket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const token = Cookies.get("token") || "";
  const socketOptions = {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: "Bearer " + token,
        },
      },
    },
    reconnectionAttempts: 5,
  };
  const notificationSocket = getSocket(
    process.env.NEXT_PUBLIC_NOTIFICATION_SOCKET_URL || "",
    socketOptions
  );
  const chatSocket = getSocket(
    process.env.NEXT_PUBLIC_CHAT_SOCKET_URL || "",
    socketOptions
  );

  useEffect(() => {
    chatSocket.on("connect", () => {
      console.log("chat socket connected");
    });
    chatSocket.on("disconnect", () => {
      console.log("chat socket disconnected");
    });
    notificationSocket.on("connect", () => {
      console.log("notification socket connected");
    });
    notificationSocket.on("disconnect", () => {
      console.log("notification socket disconnected");
    });
    return () => {
      closeSocket(process.env.NEXT_PUBLIC_NOTIFICATION_SOCKET_URL || "");
      closeSocket(process.env.NEXT_PUBLIC_CHAT_SOCKET_URL || "");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ notificationSocket, chatSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export enum SocketToConnect {
  Notification,
  Chat,
}

export const useSocket = (s: SocketToConnect): Socket | null => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  switch (s) {
    case SocketToConnect.Notification:
      return context.notificationSocket;
    case SocketToConnect.Chat:
      return context.chatSocket;
    default:
      return null;
  }
};
