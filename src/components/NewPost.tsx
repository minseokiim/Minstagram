"use client";
import { AuthUserType } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./Button";

type Props = {
  user: AuthUserType;
};

export default function NewPost({ user: { username, image } }: Props) {
  return (
    <section>
      <PostUserAvatar username={username} image={image ?? ""} />
      <form>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
        />
        <label htmlFor="input-upload">
          <FilesIcon />
          <p>Drag and Drop your image here or click</p>
        </label>
        <textarea
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"write here .."}
        />
        <Button text="publish" onClick={() => {}} />
      </form>
    </section>
  );
}
