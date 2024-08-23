"use client";
import { HomeUserType } from "@/model/user";
import { PulseLoader } from "react-spinners";
//sanity에서 사용자 정보 읽어와야 함(팔로잉 정보..)
import useSWR from "swr";
import Link from "next/link";
import Avatar from "./Avatar";
import ScrollableBar from "./ScrollableBar";

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<HomeUserType>("/api/me");
  const users = data?.following;

  return (
    <section className="relative z-0 w-full flex justify-center items-center p-4 shadow-sm mb-4 rounded-lg shadow-neutral-300 min-h-[90px] overflow-x-auto">
      {loading ? (
        <PulseLoader size={10} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have followings`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}

// 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 로 사용자 정보 얻어올 것
// (로그인을 한번 하면 서버로부터 응답 헤더에 토큰 정보를 받음, 이후 요청들에는 자동으로 함께 보내짐 -> 유저 명시 할 필요 없음)

// 2. 백엔드에서 현재 로그인된 사용자의 세션 정보 이용하여 sanity에서 followings 상세 정보 가져옴
// 3. 클라이언트 컴포넌트에서 정보를 읽어와 보여줌(image, user name)
