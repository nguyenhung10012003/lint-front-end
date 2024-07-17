"use server";

import { cookies } from "next/headers";

export const getCookie = (name: string) => {
  return cookies().get(name);
};

export const setCookie = async (name: string, value: string, options?: any) => {
  return cookies().set(name, value, options);
};

export const removeCookie = async (name: string) => {
  return cookies().delete(name);
};
