import dynamic from "next/dynamic";

const GridLoader = dynamic(() => import("react-spinners/GridLoader"), {
  ssr: false,
});
//서버에서 static하게 렌더링 하지 말라고 설정

type Props = {
  color?: string;
};

export default function GridSpinner({ color = "red" }: Props) {
  return <GridLoader color={color} />;
}
