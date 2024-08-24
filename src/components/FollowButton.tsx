"use client";

import { HomeUserType, ProfileUserType } from "@/model/user";
import useSWR from "swr";
import Button from "./Button";

type Props = {
  user: ProfileUserType;
};

// 유저 정보가 필요함.
export default function FollowButton({ user }: Props) {
  //1. 로그인 한 내가 사용자를 팔로우하고 있는지에 따라 뜨는 버튼의 문구가 바뀜.
  const { data: loggedInUser } = useSWR<HomeUserType>("/api/me");
  const { username } = user;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "Unfollow" : "Follow";

  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "Unfollow"} />
      )}
    </>
  );
}
