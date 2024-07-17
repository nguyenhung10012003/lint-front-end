export interface User {
  id: string;
  email: string;
  profile: Profile;
}

export interface Profile {
  id: string;
  name?: string;
  dob?: string;
  alias?: string;
  avatar?: string;
  gender?: string;
  bio?: string;
  country?: string;
  userId: string;
}
