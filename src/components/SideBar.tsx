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
