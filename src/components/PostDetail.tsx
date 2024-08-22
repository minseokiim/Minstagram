import { FullPost, SimplePost } from "@/model/post";
import useSWR from "swr";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  //상위 컴포넌트에서 SimplePost타입을 사용하는데 comment정보가 필요하므로, 따로 내려받아야 함.
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  console.log(comments);

  return <div></div>;
}
