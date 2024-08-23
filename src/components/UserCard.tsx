import { SearchUserType } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: SearchUserType;
};
export default function UserCard({
  user: { name, username, image, followers, following },
}: Props) {
  return (
    <Link
      className="flex items-center w-full rounded border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50 "
      href={`/users/${username}`}
    >
      <Avatar image={image}></Avatar>
      <div className="text-neutral-500">
        <p className="text-black font-bold leading-4">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${following} following  ${followers} followers`}</p>
      </div>
    </Link>
  );
}

// 링크와 라우터를 사용 할 수 있음
// 차이 : 링크를 사용하면 next가 스크롤 가능한 영역 중 보여지는 페이지를 pre-fetching해서 가져옴
