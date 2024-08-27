"use client";
import { parseDate } from "@/util/date";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";

type Props = {
  likes: string[];
  username: String;
  text?: string;
  createdAt: string;
};

export default function ActionBar({ username, createdAt, likes, text }: Props) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookMarked] = useState(false);

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={setLiked}
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
