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

export default function Header() {
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
  const pathname = usePathname();

  return (
    <div>
      <Link href="./">
        <h1>Instagram</h1>
      </Link>

      <ul>
        {menu.map((item) => (
          <li key={item.href} className="list-none">
            <Link href={item.href}>
              {pathname === item.href ? item.clickedIcon : item.icon}
            </Link>
          </li>
        ))}
        <ColorButton text="sign in" onClick={() => {}} />
      </ul>
    </div>
  );
}
