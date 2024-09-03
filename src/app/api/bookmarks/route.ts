import { addBookmarks, removeBookmarks } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";
import { withSessionUser } from "@/util/session";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    //명시적으로 null인 경우와 undefined인 경우 같이 체크하려면 == null로 체크
    if (!id || bookmark == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookmarks : removeBookmarks;

    return request(user.id, id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
