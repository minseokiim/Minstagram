export type UserType = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUserType = Pick<UserType, "username" | "image">;

export type DetailUserType = UserType & {
  following: SimpleUserType[];
  followers: SimpleUserType[];
  bookmarks: string[];
};

export type SearchUserType = UserType & {
  following: number;
  followers: number;
};
