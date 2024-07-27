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

