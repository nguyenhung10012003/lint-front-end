export interface Post {
  id?: string;
  userId?: string;
  content?: string | undefined;
  views?: number;
  share?: number;
  medias?: Media[];
  tags?: Tag[];
  sourceId?: string | undefined;
  scope?: PostScope | undefined;
  sourcePost?: Post | undefined;
  createdAt?: string;
  updatedAt?: string;
}

export interface Media {
  id: number;
  postId?: string;
  url?: string;
  type: MediaType;
  width?: number | undefined;
  height?: number | undefined;
  duration?: number | undefined;
}

export enum MediaType {
  IMAGE = 0,
  VIDEO = 1,
  AUDIO = 2,
}

export enum PostScope {
  PUBLIC = 0,
  PRIVATE = 1,
  UNRECOGNIZED = -1,
}

export interface Tag {
  id?: number;
  name?: string;
  createdAt?: string;
}
