type Props = { image?: string | null };

export default function Avatar({ image }: Props) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full p-[0.1rem]"
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
        // 이미지 없을때 뜨는 엑박 없애주는 옵션
      />
    </div>
  );
  // 로컬이나 외부url써야하면 넥스트Image대신 img써야함.
  // o Auth에서 받아오는 사진이고, 구글 말고 카카오등등이랑 연결할 수도 있기에 우리는 img!
}
