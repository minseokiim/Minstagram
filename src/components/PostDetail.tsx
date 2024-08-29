import { CommentType, SimplePostType } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";
import useFullPost from "@/hooks/post";
import useMe from "@/hooks/me";

type Props = {
  post: SimplePostType;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { post: data, postComment } = useFullPost(id);

  const comments = data?.comments;

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

        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
