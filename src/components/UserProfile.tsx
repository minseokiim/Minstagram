"use client";
import { ProfileUserType } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUserType;
};

export default function UserProfile({ user }: Props) {
  const { image, name, username, followers, following, posts, email } = user;

  //사용자 정보 묶어주기
  const info = [
    {
      title: "posts",
      data: posts,
    },
    {
      title: "followers",
      data: followers,
    },
    {
      title: "following",
      data: following,
    },
  ];

  return (
    <section>
      <Avatar image={image} highlight />

      <div>
        <h1>{username}</h1>
        <FollowButton user={user} />

        <ul>
          {info.map((item, index) => (
            <li key={index}>
              <span>{item.data}</span>
              {item.title}
            </li>
          ))}
        </ul>
        <p>{name}</p>
      </div>
    </section>
  );
}
