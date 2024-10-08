import { SimplePostType } from "@/model/post";
import { assetsURL, client } from "./sanity";
import { urlFor } from "./sanity";
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

export async function getFollowingPostsOf(username: string) {
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
    .then(mapPosts);
}

export async function getPost(id: string) {
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

export async function getPostsOf(username: string) {
  return await client
    .fetch(
      `*[_type=="post" && author->username=="${username}"]|
      order(_createdAt desc)
      {
    ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return await client
    .fetch(
      `*[_type=="post" && "${username}" in likes[]->username]|
      order(_createdAt desc)
      {
    ${simplePostProjection}
    }`,
      {},

      {
        cache: "no-cache",
      }
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return await client
    .fetch(
      `*[_type=="post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
      | order(_createdAt desc)
      {
    ${simplePostProjection}
    }`,
      {},

      {
        cache: "no-cache",
      }
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePostType[]) {
  return posts.map((post: SimplePostType) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

//좋아요
export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] }) //없으면 빈배열 설정
    .append("likes", [
      //있으면 거기에 추가
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`]) //제거
    .commit();
}

//댓글
export async function addComment(
  postId: string,
  userId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: {
          _ref: userId,
          _type: "reference",
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

//이미지 업로드
export async function createPost(userId: string, text: string, file: Blob) {
  console.log(userId, text, file);

  return fetch(assetsURL, {
    method: "POST",
    headers: {
      "content-type": file.type,
      authorization: `Bearer ${process.env.SANITY_STUDIO_SECRET_TOKEN}`,
    },
    body: file,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("API Response:", result);

      if (!result || !result.document) {
        throw new Error("Failed to upload file. Result is undefined.");
      }

      return client.create(
        {
          _type: "post",
          author: { _ref: userId },
          photo: { asset: { _ref: result.document._id } },
          comments: [
            {
              comment: text,
              author: { _ref: userId, _type: "reference" },
            },
          ],
          likes: [],
        },
        { autoGenerateArrayKeys: true }
      );
    });
}
