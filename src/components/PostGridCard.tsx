import { SimplePostType } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import ModalPortal from "./ui/ModalPortal";
import { signIn, useSession } from "next-auth/react";

type Props = {
  post: SimplePostType;
  priority?: boolean;
};
export default function PostGridCard({ post, priority = false }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);

  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true)
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        className="object-cover"
        onClick={handleOpenPost}
      />

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
