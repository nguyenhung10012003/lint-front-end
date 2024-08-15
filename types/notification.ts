export interface Notification {
  id: string;
  compiledContent: Content;
  read: boolean;
  count: number;

  subjectUrl: string;
  diUrl: string;
  url: string;

  userId: string;
  lastModified: string;
}

export interface Content {
  text: string;
  highlights: Highlight[];
}

export interface Highlight {
  length: number;
  offset: number;
}
