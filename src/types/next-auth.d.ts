import NextAuth, { DefaultSession } from "next-auth";

// * d.ts? next-auth에 기본적으로 정의된 타입 정의 파일

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
    // username은 기본으로 가지고 있지 않아서 만들어준 것
  }
}
