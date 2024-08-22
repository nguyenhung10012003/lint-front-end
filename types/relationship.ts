import { User } from "./user";

export interface Following {
  id: string;
  accepted: boolean;
  follower?: User;
  following?: User;
  createdAt: string;
}
