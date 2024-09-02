import { createContext,useContext } from "react";

type cacheKeysValue = {
  postsKey: string;
};
export const CacheKeysContext = createContext<cacheKeysValue>({
  postsKey: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
