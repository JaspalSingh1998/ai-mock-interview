"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded, userId } = useAuth();

  const isUser = !isLoaded || !userId;

  return (
    <nav className="flex justify-between mb-6">
      <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
      <ul className="flex gap-6">
        <li className="font-bold hover:text-purple-500 transition-all ease-in-out hover:border-b-2 border-purple-500">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="font-bold hover:text-purple-500 transition-all ease-in-out hover:border-b-2 border-purple-500">
          <Link href={"/launch"}>Launch</Link>
        </li>
        {isUser ? (
          <li className="font-bold hover:text-purple-500 transition-all ease-in-out hover:border-b-2 border-purple-500">
            <Link href={"/sign-in"}>Sign In</Link>
          </li>
        ) : (
          <UserButton />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
