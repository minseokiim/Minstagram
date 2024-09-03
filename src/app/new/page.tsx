import NewPost from "@/components/NewPost";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new Post",
};

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="w-full flex justify-center items-center">
      <NewPost user={session.user} />
    </div>
  );
}
