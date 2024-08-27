import { SimplePostType } from "@/model/post";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate, //global mutate가 아닌 api에 바운드 된 mutate
  } = useSWR<SimplePostType[]>("/api/posts");

  const setLike = (post: SimplePostType, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };

    const newPosts = posts?.map((p) =>
      p.id === post.id ? newPost : p
    );

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts, //즉각적으로 ui 업데이트 위한 데이터 -> ui업데이트 후에 network요청
      populateCache: false, //optimisticData 써줄거니까 false
      revalidate: false,
      rollbackOnError: true, //에러 발생시에 optimisticData 롤백
    });
  };

  return { posts, isLoading, error, setLike };
}
