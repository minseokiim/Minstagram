import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getUserInfo } from "@/service/user";

// 전체 user를 받는 api(search페이지에서 사용 예정)
export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication error", { status: 401 });
  }

  return getUserInfo().then((data) => NextResponse.json(data));
}
