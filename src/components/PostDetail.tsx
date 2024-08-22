import { FullPost, SimplePost } from "@/model/post";
import useSWR from "swr";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  //상위 컴포넌트에서 SimplePost타입을 사용하는데 comment정보가 필요하므로, 따로 내려받아야 함.
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  console.log(comments);

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        {/* relative를 쓰지 않으면, fill을 쓰는 경우 근접한 컴포넌트 중 static이 아닌 옵션을 가진 컴포넌트를 부모로 지정하므로 */}
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUserName, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUserName === username}
                  />
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUserName}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>

        <ActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentForm />
      </div>
    </section>
  );
}
