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
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b-neutral-300">
      <Avatar image={image} highlight size="xlarge" />

      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-2xl md:mr-8 my-2 md:my-0">{username}</h1>
          <FollowButton user={user} />
        </div>

        <ul className="my-4 flex gap-4">
          {info.map((item, index) => (
            <li key={index}>
              <span className="font-bold mr-1">{item.data}</span>
              {item.title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
