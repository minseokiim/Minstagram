"use client";

import { ProfileUserType } from "@/model/user";
import Button from "./Button";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUserType;
};

export default function FollowButton({ user }: Props) {
  const { user: loggedInUser, toggleFollow } = useMe();
  const { username } = user;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
       <div>
        {isUpdating&&<div><PulseLoader size={6}/>
          </div>}
         <Button text={text} onClick={handleFollow} red={text === "Unfollow"} />
         </div>
      )}
    </>
  );
}
