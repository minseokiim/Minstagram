"use client";
import { parseDate } from "@/util/date";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { SimplePostType } from "@/model/post";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/posts";

type Props = {
  post: SimplePostType;
};

export default function ActionBar({ post }: Props) {
  const { id, username, createdAt, likes, text } = post;
  const { data: session } = useSession();
  const user = session?.user;

  const liked = user ? likes.includes(user.username) : false;
  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  //북마크는 user에 있는데 api를 두번 호출??
  //여기서는 클릭되면 상태 변경하고 api호출하는 것만 처리
  //profile에서 조회할 수 있어야 함.
  const [bookmarked, setBookMarked] = useState(false);
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />

        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookMarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>

      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
