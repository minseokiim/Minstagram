"use client";
import { ProfileUserType } from "@/model/user";

type Props = {
  user: ProfileUserType;
};

export default function UserProfile({ user }: Props) {
  return <p>{user.username}</p>;
}
