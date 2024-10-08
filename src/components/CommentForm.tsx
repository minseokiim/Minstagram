import { FormEvent } from "react";
import SmileIcon from "./ui/icons/SmileIcon";
import { useState } from "react";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState<string>("");
  const buttonDisabled = comment.length === 0 && true;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex px-3 items-center border-t border-neutral-300"
      >
        <SmileIcon />
        <input
          className="w-full ml-2 border-none outline-none p-3"
          type="text"
          placeholder="Add a comment..."
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={buttonDisabled}
          className={`font-bold ml-2 ${buttonDisabled ? "text-sky-200" : "text-sky-500"}`}
        >
          Post
        </button>
      </form>
    </div>
  );
}
