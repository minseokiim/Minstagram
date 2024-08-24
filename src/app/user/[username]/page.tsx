import UserProfile from "@/components/UserProfile";
import { getUserProfile } from "@/service/user";
import { notFound } from "next/navigation";
import UserPost from "@/components/UserPost";

type Props = {
  params: {
    username: string;
  };
};

export default async function page({ params: { username } }: Props) {
  // 상단 : 사용자 이름, 이미지 , 팔로잉, 포스트 수 .. 보여주기
  // 하단 : 올린 post, 북마크 post, 좋아요 post 보여주기(posts,liked,bookmarks)

  const user = await getUserProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />
      <UserPost user={user} />
    </>
  );
}
