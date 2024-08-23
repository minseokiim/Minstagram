import { client } from "./sanity";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username: username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUserName(username: string) {
  return client.fetch(`*[_type=="user" && username=="${username}"][0]{
    ...,
    "id":_id,
    following[]->{username,image},
    followers[]->{username,image},
    "bookmarks":bookmarks[]->_id
    }`);
}

// Sanity 쿼리 언어 GROQ를 사용하는 방법 : https://www.sanity.io/docs/groq
// https://www.sanity.io/docs/how-queries-work
// https://www.sanity.io/docs/query-cheat-sheet

export async function getUserInfo() {
  return client.fetch(`*[_type=="user"]`);
}
