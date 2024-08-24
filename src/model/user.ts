export type AuthUserType = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUserType = Pick<AuthUserType, "username" | "image">;

export type HomeUserType = AuthUserType & {
  following: SimpleUserType[];
  followers: SimpleUserType[];
  bookmarks: string[];
};

export type SearchUserType = AuthUserType & {
  following: number;
  followers: number;
};

export type ProfileUserType = SearchUserType & {
  posts: number;
};
