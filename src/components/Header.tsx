"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import ColorButton from "./ColorButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: "Home",
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: "Search Users",
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: "New Post",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/" aria-label="Home">
        <h1 className="text-3xl font-bold">Minstagram</h1>
      </Link>

      <ul className="flex gap-4 items-center p-4">
        {menu.map((item) => (
          <li key={item.href} className="list-none">
            <Link href={item.href} aria-label={item.title}>
              {pathname === item.href ? item.clickedIcon : item.icon}
            </Link>
          </li>
        ))}

        {user && (
          <li>
            <Link href={`/user/${user.username}`}>
              <Avatar image={user.image} size="small" highlight />
            </Link>
          </li>
        )}

        <li>
          {session ? (
            <ColorButton text="sign out" onClick={() => signOut()} />
          ) : (
            <ColorButton text="sign in" onClick={() => signIn()} />
          )}
        </li>
      </ul>
    </div>
  );
}
