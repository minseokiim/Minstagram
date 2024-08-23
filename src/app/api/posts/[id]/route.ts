import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/service/posts";

type Context = {
  params: {
    id: string;
  };
};

// 특정 id 포스트를 받는 api
export async function GET(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication error", { status: 401 });
  }

  return getPost(context.params.id).then((data) => NextResponse.json(data));
}
