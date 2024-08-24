"use client";
import { SimplePostType } from "@/model/post";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./GridSpinner";

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePostType[]>("/api/posts");

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
