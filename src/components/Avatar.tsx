type AvatarSize = "small" | "medium" | "large" | "xlarge";

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = "large",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full p-[0.1rem] ${getImageSizeStyle(size)}`}
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

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-[34px] h-[34px] p-[0.1rem]";
    case "medium":
      return "w-[42px] h-[42px] p-[0.1rem]";
    case "large":
      return "w-16 h-16 p-[0.2rem]";
    case "xlarge":
      return "w-[138px] h-[138px] p-[0.3rem]";
    default:
      throw new Error(`Unsupported size : ${size}`);
  }
}

function getContainerSize(size: AvatarSize): string {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-11 h-11";
    case "large":
      return "w-[68px] h-[68px]";
    case "xlarge":
      return "w-[142px] h-[142px]";
    default:
      throw new Error(`Unsupported size : ${size}`);
  }
}
