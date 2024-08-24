"use client";
import { ProfileUserType } from "@/model/user";
import { useState } from "react";
import useSWR from "swr";

type Props = {
  user: ProfileUserType;
};

export default function UserPost({ user: { username } }: Props) {
  // 탭 : 3
  // 1. username의 post를 조회 :/api/users/${username}/posts
  // 2. liked한 post조회:/api/users/${username}/liked
  // 3. 북마크한 post 조회:/api/users/${username}/bookmarks
  const [tab, setTab] = useState("posts");
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/users/${username}/${tab}`);
  console.log(posts);

  return <div></div>;
}
