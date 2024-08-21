"use client";
import { SimplePost } from "@/model/post";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>("/api/posts");
  console.log("data", posts);

  return (
    <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>
  );
}
