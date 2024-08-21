//사용자가 클릭하면 확인 가능한 정보
export type FullPost = {
  id: string;
  username: string;
  userImage: string;
  image: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};

export type Comment = {
  comment: string;
  username: string;
  image: string;
};

// 홈에서 확인 가능한 간단한 정보들, comments배열 대신 숫자만나어게 대체
export type SimplePost = Omit<FullPost, "comments"> & {
  comments: number;
};
