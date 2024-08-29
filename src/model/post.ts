//사용자가 클릭하면 확인 가능한 정보
export type FullPostType = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: CommentType[];
};

export type CommentType = {
  comment: string;
  username: string;
  image?: string|undefined;
};

// 홈에서 확인 가능한 간단한 정보들, comments배열 대신 숫자만나어게 대체
export type SimplePostType = Omit<FullPostType, "comments"> & {
  comments: number;
};
