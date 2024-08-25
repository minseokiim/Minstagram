import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search User",
  description: "Search Users",
};

export default function page() {
  return <UserSearch />;
}
