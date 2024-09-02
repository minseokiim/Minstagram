"use client";
import { ProfileUserType } from "@/model/user";
import { useState } from "react";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";
import { CacheKeysContext } from "@/context/cacheKeysContext";

type Props = {
  user: ProfileUserType;
};

const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="h-3 w-3" /> },
  { type: "liked", icon: <HeartIcon className="h-3 w-3" /> },
];

export default function UserPost({ user: { username } }: Props) {
  // 1. username의 post를 조회 :/api/users/${username}/posts
  // 2. liked한 post조회:/api/users/${username}/liked
  // 3. 북마크한 post 조회:/api/users/${username}/bookmarks
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map((tab) => (
          <li
            key={tab.type}
            onClick={() => setQuery(tab.type)}
            className={`mx-12 p-4 cursor-pointer border-black ${tab.type === query && "font-bold border-t"}`}
          >
            <button className="scale-150 md:scale-100">{tab.icon}</button>
            <span className="hidden md:inline">{tab.type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid/>
      </CacheKeysContext.Provider>
    </section>
  );
}
