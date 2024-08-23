import { NextResponse } from "next/server";
import { searchUsers } from "@/service/user";

// 검색하는 키워드가 없는 경우 모든 user 리턴, 검색은 로그인 안해도 사용 가능
export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
