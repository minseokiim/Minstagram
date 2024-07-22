"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ColorButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callBackUrl: string;
};

export default function Signin({ providers, callBackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={id}
          text={`Sign in with ${name}`}
          onClick={() => signIn(id, { callBackUrl })}
          // { callBackUrl } : 객체 형태로 옵션 파라미터를 전달, callBackUrl 없이도 호출 가능하다는 장점
          size="big"
        />
      ))}
    </>
  );
}
