import Avatar from "@/components/Avatar";
import { UserType } from "@/model/user";

type Props = {
  user: UserType;
};

export default async function SideBar({
  user: { name, username, email, image },
}: Props) {
  return (
    <>
      {image && <Avatar image={image} />}
      <p>{username}</p>
      <p className="text-gray-600">{name}</p>
      <p className="font-bold">{email}</p>

      <p>
        About ` Help ` Press ` API ` Jobs ` Privacy ` Terms ` Location` Language
      </p>
      <p>@Copyright MINSTAGRAM from minseokiim</p>
    </>
  );
}
