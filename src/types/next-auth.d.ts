import { AuthUserType } from "@/model/user";

// * d.ts? next-auth에 기본적으로 정의된 타입 정의 파일

declare module "next-auth" {
  interface Session {
    user: AuthUserType;
  }
}
