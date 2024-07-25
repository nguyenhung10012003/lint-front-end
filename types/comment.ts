export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  commentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}