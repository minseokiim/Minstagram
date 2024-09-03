import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/service/posts";
import { withSessionUser } from "@/util/session";

type Context = {
  params: {
    id: string;
  };
};

// 특정 id 포스트를 받는 api
export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    return getPost(context.params.id).then((data) => NextResponse.json(data));
  });
}
