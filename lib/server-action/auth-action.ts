"use server";

import api from "@/config/api";
import { removeCookie, setCookie } from "./cookies-action";

type SignInFormData = {
  email: string;
  password: string;
};

type SignUpFormData = {
  email: string;
  password: string;
};
export const signIn = async (formData: SignInFormData) => {
  const response = await api.post<any, any>("/auth/signin", formData);
  if (response.data?.statusCode === 500)
    return { error: true, message: "Something went wrong" };
  if (response.data?.error) {
    switch (response.data.error) {
      case "UNAUTHORIZED":
        return {
          error: true,
          field: "password",
          message: "Password is incorrect",
        };
      case "NOT_FOUND":
        return {
          error: true,
          field: "email",
          message: "User not found",
        };
      default:
        return {
          error: true,
          message: "Something went wrong",
        };
    }
  }
  const { token, refreshToken, userId } = response;
  setCookie("token", token);
  setCookie("refreshToken", refreshToken);
  setCookie("userId", userId);
};

export const signUp = async (formData: SignUpFormData) => {
  const response = await api.post<any, any>("/auth/signup", formData);
  if (response.data?.error) {
    switch (response.data.error) {
      case "CONFLICT":
        return {
          error: true,

          message: "Email already exists",
        };
      default:
        return {
          error: true,
          message: "Something went wrong",
        };
    }
  }
  const { token, refreshToken, userId } = response;
  setCookie("token", token);
  setCookie("refreshToken", refreshToken);
  setCookie("userId", userId);
};

export const signOut = async () => {
  await removeCookie("token");
  await removeCookie("refreshToken");
  await removeCookie("userId");
};
