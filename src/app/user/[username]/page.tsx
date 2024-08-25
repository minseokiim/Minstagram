import UserProfile from "@/components/UserProfile";
import { getUserProfile } from "@/service/user";
import { notFound } from "next/navigation";
import UserPost from "@/components/UserPost";
import { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: {
    username: string;
  };
};

const getUser = cache(async (username: string) => getUserProfile(username));

export default async function page({ params: { username } }: Props) {
  // 상단 : 사용자 이름, 이미지 , 팔로잉, 포스트 수 .. 보여주기
  // 하단 : 올린 post, 북마크 post, 좋아요 post 보여주기(posts,liked,bookmarks)

  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPost user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title: `${user?.name} (@${user?.username}) @Minstagram`,
    description: `${user?.name}'s all @Minstagram posts`,
  };
}
