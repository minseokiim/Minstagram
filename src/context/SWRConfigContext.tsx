"use client";
// 컨텍스트는 항상 클라이언트 사이드에서 동작

import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
    >
      {children}
    </SWRConfig>
  );
}

//https://swr.vercel.app/ko/docs/global-configuration
