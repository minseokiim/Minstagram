import ReactDOM from "react-dom";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // * ssr이 될 때에는 portal을 처리하지 않을 것
  // -> 브라우저일 때만 처리할 것(window환경일 때만)
  if (typeof window === "undefined") {
    // 서버에서 렌더링 안되게
    return null;
  }

  const el = document.getElementById("portal") as Element;
  return ReactDOM.createPortal(children, el);
}

//layout에 있는 상위 div요소에 createPortal로 연결
