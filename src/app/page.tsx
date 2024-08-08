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
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  );
}

//홈페이지는 ssr로 작동 : 사용자에게 요청 올 때마다 로그인 정보 확인
//로그인 안하면 의미 없기 때문

//FollowingBar와 PostList는 각각 개별적인 데이터를 가져와야하니까 다 ssr로 하면 과부하
//-> csr이 되도록 클라이언트 컴포넌트로 할 것
