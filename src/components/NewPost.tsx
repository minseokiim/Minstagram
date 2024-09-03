"use client";
import { AuthUserType } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./Button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  user: AuthUserType;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  //상태를 이용해서 관리하면 텍스트 입력할 때마다 리렌더링
  //따라서, 리렌더링을 발생시키지 않는 ref 전달

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <PostUserAvatar username={username} image={image ?? ""} />
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${!file && "border-2 border-sky-500 border-dashed"}`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}

          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}

          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-300"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"write here .."}
          ref={textRef}
        />
        <Button text="publish" onClick={() => {}} />
      </form>
    </section>
  );
}
