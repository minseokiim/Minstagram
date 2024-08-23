"use client";
import useSWR from "swr";
import { SearchUserType } from "@/model/user";
import { FormEvent, useState } from "react";
import GridSpinner from "./GridSpinner";
import UserCard from "./UserCard";
import useDebounce from "./../hooks/debounce";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedSearch = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUserType[]>(`/api/search/${debouncedSearch}`);
  //keyword 입력시에 useSWR이 다시 네트워크 요청 -> 상태가 업데이트 됨.
  // 따라서 onSubmit에서 따로 처리할 필요 없음.

  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); //리로딩 되지 않게
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400 rounded"
          type="text"
          placeholder="Search for a username or name..🫧"
          name="searchBar"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          autoFocus
        />
      </form>

      {error && <p>Something went wrong.. 💀</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>No users found😭</p>}

      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
