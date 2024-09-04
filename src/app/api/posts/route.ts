import { createPost, getFollowingPostsOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";
import { withSessionUser } from "@/util/session";

// 전체 포스트를 받는 api
export async function GET() {
  return withSessionUser(async (user) => {
    return getFollowingPostsOf(user.username).then((data) =>
      NextResponse.json(data)
    );
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;

    if (!text || !file) {
      return new Response("Bad Request", { status: 400 });
    }

    const data = await createPost(user.id, text, file);
    return NextResponse.json(data);
  });
}
