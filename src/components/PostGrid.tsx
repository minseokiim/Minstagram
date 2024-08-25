"use client";
import useSWR from "swr";
import GridSpinner from "./GridSpinner";
import { SimplePostType } from "@/model/post";
import PostGridCard from "./PostGridCard";

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePostType[]>(`/api/users/${username}/${query}`);

  return (
    <div>
      {isLoading && <GridSpinner />}
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
