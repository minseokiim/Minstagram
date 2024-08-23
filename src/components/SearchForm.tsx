"use client";
import useSWR from "swr";
import { UserType } from "@/model/user";
import { useState } from "react";

export default function SearchForm() {
  const { data, isLoading } = useSWR<UserType[]>("/api/user");
  console.log(data);

  const [keyword, setKeyword] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setKeyword(e.target.value);
  };

  return (
    <div>
      {/* 2. 검색창 */}
      <form>
        <input
          type="text"
          placeholder="Search for a username or name"
          name="searchBar"
          onChange={onChange}
          value={keyword}
        />
      </form>

      {/* 1. 검색어 없을 때 전체 사용자 뜨게 */}
      <ul>
        {data &&
          !keyword &&
          data.map((user, index) => (
            <li key={index}>
              {/* 5. 컴포넌트 만들어주기 */}
              <span>{user.name} </span>
              <span>{user.username}</span>
            </li>
          ))}
      </ul>

      {/* 3. 검색어 있을 때에는 필터링 되어서 뜨게 해주기 */}

      {/* 4. 고민 -> user.name으로 following 정보들을 받아오는 api 만들어 받아오기 */}
    </div>
  );
}
