'use client';
import React, { createContext, useContext, useEffect, useRef, ReactNode, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = Cookies.get('token') || '';
    const socketOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: 'Bearer ' + token,
          }
        }
      },
      reconnectionAttempts: 5,
    };

    if (typeof window !== 'undefined') {
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || '';
      const socket = io(socketUrl, socketOptions);
      setSocket(socket);
  
      socket.on('connect', () => {
        console.log('Socket.io is connected.');
      });
  
      socket.on('disconnect', () => {
        console.log('Socket.io is disconnected.');
      });
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};
