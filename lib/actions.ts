'use server';

import {cookies} from "next/headers";

type SignInFormData = {
  email: string;
  password: string;
};
export const signIn = async (formData: SignInFormData) => {
  // TODO: Implement sign in
}

export const getCookie = async (name: string) => {
  return cookies().get(name);
}