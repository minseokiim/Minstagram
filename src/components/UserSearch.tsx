"use client";
import useSWR from "swr";
import { SearchUserType } from "@/model/user";
import { FormEvent, useState, useEffect } from "react";
import GridSpinner from "./GridSpinner";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUserType[]>(`/api/search/${keyword}`);
  //keyword 입력시에 useSWR이 다시 네트워크 요청 -> 상태가 업데이트 됨.
  // 따라서 onSubmit에서 따로 처리할 필요 없음.

  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); //리로딩 되지 않게
  };

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search for a username or name"
          name="searchBar"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          autoFocus
        />
      </form>

      {error && <p>Something went wrong.. 💀</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>No users found😭</p>}

      <ul>
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <span>{user.name} </span>
              <span>{user.username}</span>
            </li>
          ))}
      </ul>

      {/* 4. 고민 -> user.name으로 following 정보들을 받아오는 api 만들어 받아오기 */}
    </div>
  );
}
