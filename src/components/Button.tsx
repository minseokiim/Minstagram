type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
};

export default function Button({ text, onClick, red }: Props) {
  return (
    <button
      className={`border-none rounded-md py-2 text-white font-bold leading-4 ${red ? "bg-red-500" : "bg-sky-400"}`}
    >
      {text}
    </button>
  );
}
