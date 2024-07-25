export interface Notification {
  id: string;
  userId: string;
  diObject?: Obj | undefined;
  subject: Obj | undefined;
  url: string;
  content: Content | undefined;
  read: boolean;
  lastModified: string;
}

export interface Obj {
  id: string;
  name?: string | undefined;
  imageUrl?: string | undefined;
}

export interface Content {
  text: string;
  highlights: Highlight[];
}

export interface Highlight {
  length: number;
  offset: number;
}
