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

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="./">
        <h1 className="text-3xl font-bold">Instagram</h1>
      </Link>

      <ul className="flex gap-4 items-center p-4">
        {menu.map((item) => (
          <li key={item.href} className="list-none">
            <Link href={item.href}>
              {pathname === item.href ? item.clickedIcon : item.icon}
            </Link>
          </li>
        ))}

        {session ? (
          <ColorButton text="sign out" onClick={() => signOut()} />
        ) : (
          <ColorButton text="sign in" onClick={() => signIn()} />
        )}
      </ul>
    </div>
  );
}
