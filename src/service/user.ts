import { SearchUserType } from "@/model/user";
import { client } from "./sanity";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return await client.createIfNotExists({
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
  return await client.fetch(`*[_type=="user" && username=="${username}"][0]{
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

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&&(name match "${keyword}")||(username match "${keyword}")`
    : "";
  return await client
    .fetch(
      `*[_type=="user" ${query}]{
    ...,
    "following":count(following),
     "followers":count(followers),
    }`
    )
    .then((users) =>
      users.map((user: SearchUserType) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserProfile(username: string) {
  const user = await client.fetch(
    `*[_type=="user" && username=="${username}"][0]{
      ...,
      "id": _id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type=="post" && author->username=="${username}"])
    }`,
    {},

    {
      cache: "no-cache",
    }
  );

  // 사용자 없으면 null 반환
  if (!user) {
    return null;
  }

  return {
    ...user,
    following: user.following ?? 0,
    followers: user.followers ?? 0,
    posts: user.posts ?? 0,
  };
}

export async function addBookmarks(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmarks(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}
