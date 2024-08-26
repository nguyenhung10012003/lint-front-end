export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  text: string;
  messageType: string;
  attachment?: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
}

export interface Room {
  id: string;
}