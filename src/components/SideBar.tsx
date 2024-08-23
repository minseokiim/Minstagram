import Avatar from "@/components/Avatar";
import { AuthUserType } from "@/model/user";

type Props = {
  user: AuthUserType;
};

export default async function SideBar({
  user: { name, username, email, image },
}: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="text-gray-600 font-bold">{username}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About ` Help ` Press ` API ` Jobs ` Privacy ` Terms ` Location` Language
      </p>
      <p className="font-bold text-sm mt-8 text-neutral-500">
        @Copyright MINSTAGRAM from minseokiim
      </p>
    </>
  );
}

//서버 컴포넌트, 페이지에서 prop전달해주면 그대로 보여주는 정적 컴포넌트임
// SideBar 컴포넌트는 부모 컴포넌트인 HomePage로부터 받은 user 데이터를 활용하여 렌더링

// 만약 SideBar에서 직접 getServerSession이나 다른 비동기 요청을 통해 세션 정보를 가져오도록 한다면, SideBar는 동적 컴포넌트
