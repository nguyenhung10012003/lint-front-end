"use server";

import api from "@/config/api";

export const getTags = async (params: {
  search?: string;
  skip?: number;
  take?: number;
}) => {
  return await api.get<any, any>("/tag", { params });
};

export const createTag = async (tag: string) => {
  return await api.post<any, any>("/tag", { name: tag });
};

export const createPost = async (post: {
  content?: string;
  medias?: File[];
  tags?: string[];
}) => {
  console.log(post);
  const formData = new FormData();
  // if (post.content) formData.append("content", post.content);
  // if (post.medias)
  //   Array.from(post.medias).forEach((media) => {
  //     formData.append("medias", media);
  //   });
  // if (post.tags)
  //   post.tags.forEach((tag) => {
  //     formData.append("tags", tag);
  //   });
  // return await api.post<any, Post>("/post", formData);
};
