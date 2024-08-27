import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

// 정적인 코드지만, ssg 되지 않게(요청 오면 수행하게) 추가
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search User",
  description: "Search Users",
};

export default function page() {
  return <UserSearch />;
}
