import FollowingBar from "@/components/FollowingBar";
import SideBar from "@/components/SideBar";
import PostList from "@/components/PostList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section>
      <FollowingBar />
      <PostList />
      <SideBar user={user} />
    </section>
  );
}
