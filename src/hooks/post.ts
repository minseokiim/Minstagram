import { FullPostType, CommentType } from "@/model/post";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

async function addComment(id: string, comment: string) {
  return fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function useFullPosts(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPostType>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();
  const postComment = useCallback(
    (comment: CommentType) => {
      if (!post) return;
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
    },
    [post, mutate, globalMutate]
  );

  return { post, isLoading, error, postComment };
}
