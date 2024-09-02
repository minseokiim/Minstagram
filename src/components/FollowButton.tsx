"use client";

import { ProfileUserType } from "@/model/user";
import Button from "./Button";
import useMe from "@/hooks/me";

type Props = {
  user: ProfileUserType;
};

export default function FollowButton({ user }: Props) {
  const { user: loggedInUser, toggleFollow } = useMe();
  const { username } = user;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "Unfollow" : "Follow";

  const handleFollow = () => {
    toggleFollow(user.id, !following);
  };

  return (
    <>
      {showButton && (
        <Button text={text} onClick={handleFollow} red={text === "Unfollow"} />
      )}
    </>
  );
}
