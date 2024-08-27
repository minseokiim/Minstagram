import { SimplePostType } from "@/model/post";
import useSWR from "swr";
import { useSWRConfig } from "swr";

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePostType[]>("/api/posts");
  const { mutate } = useSWRConfig();

  const setLike = (post: SimplePostType, username: string, like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post.id, like }),
    }).then(() => mutate("api/posts")); //데이터가 변경되면 fetch
  };

  return { posts, isLoading, error, setLike };
}
