"use client";
import useSWR from "swr";
import { UserType } from "@/model/user";
import { useState } from "react";

export default function UserSearch() {
  const [keyword, setKeyword] = useState<string>("");
  const { data, isLoading } = useSWR<UserType[]>(`/api/search/${keyword}`);
  console.log(data);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setKeyword(e.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search for a username or name"
          name="searchBar"
          onChange={onChange}
          value={keyword}
        />
      </form>

      <ul>
        {data?.map((user, index) => (
          <li key={index}>
            {/* 5. 컴포넌트 만들어서 빼주기 */}
            <span>{user.name} </span>
            <span>{user.username}</span>
          </li>
        ))}
      </ul>

      {/* 4. 고민 -> user.name으로 following 정보들을 받아오는 api 만들어 받아오기 */}
    </div>
  );
}
