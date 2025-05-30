import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="w-full border-b text-lg flex justify-between items-center py-2 px-8 backdrop-blur-md sticky top-0 z-50">
      <div className="hover:scale-105 active:scale-95 transition-all">
        <Link href="/" className="flex justify-center items-center font-bold text-xl">
          <Image width={56} height={56} alt="logo" src="/logoDark.svg" className="mr-1"></Image>
          <span className="text-[#161616]">Briefox</span>
          <span className="text-[#A0A0A0]">.com</span>
        </Link>
      </div>

      <div className="flex">
        <div className="hover:text-gray-400 group mx-4 active:scale-95 transition-all">
          <Link href="/">Home</Link>
          <div className="w-0 transition-all h-[2px] bg-black group-hover:w-full"></div>
        </div>
        <div className="hover:text-gray-400 group mx-4 active:scale-95 transition-all">
          <Link href="/features">Features</Link>
          <div className="w-0 transition-all h-[2px] bg-black group-hover:w-full"></div>
        </div>
        <div className="hover:text-gray-400 group mx-4 active:scale-95 transition-all">
          <Link href="/about">About</Link>
          <div className="w-0 transition-all h-[2px] bg-black group-hover:w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
