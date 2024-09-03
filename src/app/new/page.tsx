import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new Post",
};

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return <div>New Post</div>;
}
