import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { LogIn, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-zinc-200 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <ShoppingCart />
        </Link>
        <Link href={"/signin"} className={buttonVariants()}>
          <LogIn className="mr-2 h-4 w-4" /> Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
