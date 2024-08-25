import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import Signin from "@/components/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "SignUp or Login to Minstagram",
};

type Props = {
  searchParams: {
    callBackUrl: string;
  };
};

export default async function SignPage({
  searchParams: { callBackUrl },
}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callBackUrl={callBackUrl ?? "/"} />
    </section>
  );
}
