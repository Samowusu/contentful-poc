import Link from "next/link";
import React from "react";

function NavBar({ links, slug }) {
  return (
    <ul className="border border-red-500 flex justify-around">
      {links.map((link) => {
        return (
          <li className="border border-blue-600">
            <Link href={`${slug}/${link}`}>{link}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavBar;
