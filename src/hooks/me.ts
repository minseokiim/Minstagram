import { HomeUserType } from "@/model/user";
import useSWR from "swr";

async function updateBookMark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<HomeUserType>("/api/me");

  const setBookMark = (postId: string, bookmark: boolean) => {
    if (!user) {
      return;
    }
    const bookmarks = user.bookmarks;
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...bookmarks, postId]
        : bookmarks.filter((bookmark) => bookmark !== postId),
    };

    return mutate(updateBookMark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { user, isLoading, error, setBookMark };
}
