import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getFollowingPostsOf } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// 전체 포스트를 받는 api
export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication error", { status: 401 });
  }

  return getFollowingPostsOf(user.username).then((data) =>
    NextResponse.json(data)
  );
}
