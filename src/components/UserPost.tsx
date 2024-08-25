"use client";
import { ProfileUserType } from "@/model/user";
import { useState } from "react";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";

type Props = {
  user: ProfileUserType;
};

const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="h-3 w-3" /> },
  { type: "liked", icon: <HeartIcon className="h-3 w-3" /> },
];

export default function UserPost({ user: { username } }: Props) {
  // 탭(=넘길 쿼리) : 3
  // 1. username의 post를 조회 :/api/users/${username}/posts
  // 2. liked한 post조회:/api/users/${username}/liked
  // 3. 북마크한 post 조회:/api/users/${username}/bookmarks
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.type} onClick={()=>setQuery(tab.type)}>
            <button>{tab.icon}</button>
            <span>{tab.type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}
