import { SimplePost } from "@/model/post";
import { client } from "./sanity";
import { urlFor } from "./sanity";

export async function getFollowingPostsOf(username: string) {
  const simplePostProjection = `
...,
"username":author->username,
"userImage":author->image,
"image":photo,
"likes":likes[]->username,
"text":comments[0].comment,
"comments":count(comments),
"id":_id,
"createdAt":_createdAt,
`;
  // post.author.username -> post.username 꼴로 바꿔주는 것

  //** GROQ로 join 쿼리 만들기
  //https://www.sanity.io/docs/query-cheat-sheet
  return await client
    .fetch(
      `
    *[_type=="post" && author->username=="${username}"
    || author._ref in *[_type=="user" && username=="${username}"].following[]._ref]
   | order(_createdAt desc){${simplePostProjection}} `
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}

export async function getPost(id: String) {
  return await client
    .fetch(
      `*[_type=="post" && _id=="${id}"][0]{
    ...,
    "username":author->username,
    "userImage":author->image,
    "image":photo,
    "likes":likes[]->username,
    comments[]{comment,"username":author->username,"image":author->image},
    "id":_id,
    "createdAt":_createdAt,
    }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}
