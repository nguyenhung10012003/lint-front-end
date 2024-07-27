import api from "@/config/api";
import { Profile, User } from "@/types/user";

export async function getOneUser(params: { id: string }) {
  return await api.get<any, User>(`/user/${params.id}`);
}

export async function getOneProfile(params: { id: string; userId: string }) {
  return await api.get<any, Profile>(`/profile`);
}

export async function createProfile(params: {
  profile: Profile;
  avatar?: File;
}) {
  const form = new FormData();
  if (params.profile.name) form.append("name", params.profile.name);
  if (params.profile.alias) form.append("alias", params.profile.alias);
  if (params.profile.bio) form.append("bio", params.profile.bio);
  if (params.profile.dob) form.append("dob", params.profile.dob);
  if (params.profile.country) form.append("country", params.profile.country);
  if (params.profile.gender) form.append("gender", params.profile.gender);
  if (params.avatar) form.append("avatar", params.avatar);
  console.log(form.getAll("avatar"));
  const profile = await api.post<any, Profile>("/profile", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return profile;
}

export async function updateProfile(params: {
  profile: Profile;
  avatar?: File;
}) {
  const form = new FormData();
  if (params.profile.name) form.append("name", params.profile.name);
  if (params.profile.alias) form.append("alias", params.profile.alias);
  if (params.profile.bio) form.append("bio", params.profile.bio);
  if (params.profile.dob) form.append("dob", params.profile.dob);
  if (params.profile.country) form.append("country", params.profile.country);
  if (params.profile.gender) form.append("gender", params.profile.gender);
  if (params.avatar) form.append("avatar", params.avatar);
  const profile = await api.patch<any, Profile>("/profile", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return profile;
}
