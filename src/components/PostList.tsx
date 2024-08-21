"use client";
import { SimplePost } from "@/model/post";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./GridSpinner";

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>("/api/posts");
  console.log("data", posts);

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
