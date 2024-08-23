import { io, Socket } from "socket.io-client";

const sockets = new Map<string, Socket>();

export const getSocket = (url: string, options: any): Socket => {
  if (!sockets.has(url)) {
    sockets.set(url, io(url, options));
  }
  return sockets.get(url)!;
};

export const closeSocket = (url: string) => {
  if (sockets.has(url)) {
    sockets.get(url)!.close();
    sockets.delete(url);
  }
};
