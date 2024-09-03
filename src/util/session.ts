import { AuthUserType } from "@/model/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

//사용자가 인증된 상태인지 확인하는 함수
export async function withSessionUser(
  handler: (user: AuthUserType) => Promise<Response>
): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  //사용자를 인자로 받아 실행할 함수(핸들러) 호출
  return handler(user);
}
