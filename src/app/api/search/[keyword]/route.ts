import { NextRequest, NextResponse } from "next/server";
import { searchUsers } from "@/service/user";

type Context = {
  params: {
    keyword: string;
  };
};

// 검색하는 키워드가 있는 경우
export async function GET(_: NextRequest, context: Context) {
  return searchUsers(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
