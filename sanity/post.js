const postSchema = {
  title: "Post",
  name: "post",
  type: "document",
  fields: [
    {
      title: "Author",
      name: "author",
      type: "reference",
      to: [
        {
          type: "user",
        },
      ],
    },
    {
      title: "Photo",
      name: "photo",
      type: "image",
    },
    {
      title: "Likes",
      name: "likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },

    {
      title: "Comments",
      name: "comments",
      //문서에 대한 배열
      type: "array",
      of: [
        {
          title: "Comment",
          name: "comment",
          type: "document",
          fields: [
            {
              //Comment 쓴 사람
              title: "Author",
              name: "author",
              type: "reference",
              to: [
                {
                  type: "user",
                },
              ],
            },
            {
              //Comment 텍스트에 관련된 내용
              title: "Comment",
              name: "comment",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  //프리뷰 만들기
  preview: {
    select: {
      title: "comments.0.comment",
      authorName: "author.name",
      authorUsername: "author.username",
      media: "photo",
    },
    //원하는대로 객체 조절
    prepare(selection) {
      const { title, authorName, authorUsername, media } = selection;
      return {
        title,
        subtitle: `by ${authorName} (${authorUsername})`,
        media,
      };
    },
  },
};

export default postSchema;
