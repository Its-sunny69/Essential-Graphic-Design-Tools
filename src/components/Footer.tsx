import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer>
      <div className="w-full bg-black text-white border-b py-2 sm:px-8 px-2 bottom-0">
        <div className="flex sm:flex-row flex-col justify-between items-center my-4">
          <div className="hover:scale-105 active:scale-95 transition-all">
            <Link
              href="/"
              className="flex justify-center items-center font-bold"
            >
              <Image
                width={56}
                height={56}
                alt="logo"
                src="/logoLight.svg"
                className="mr-1"
              ></Image>
              <span className="text-white">Briefox</span>
              <span className="text-[#CACACA]">.com</span>
            </Link>
          </div>

          <div className="flex my-4 sm:my-0">
            <div className="hover:text-gray-400 group mx-4 active:scale-95 transition-all">
              <Link href="/features">Features</Link>
              <div className="w-0 transition-all h-[2px] bg-white group-hover:w-full"></div>
            </div>
            <div className="hover:text-gray-400 group mx-4 active:scale-95 transition-all">
              <Link href="/about">About</Link>
              <div className="w-0 transition-all h-[2px] bg-white group-hover:w-full"></div>
            </div>
            <div className="hover:text-gray-400 group mx-4 active:scale-95 transition-all">
              <Link href="/privacy-policy">Privacy & policy</Link>
              <div className="w-0 transition-all h-[2px] bg-white group-hover:w-full"></div>
            </div>
          </div>
        </div>

        <div className="text-center sm:my-2">
          <p className="text-sm text-gray-400">
            © 2025 Briefox.com - All rights reserved.{" "}
            <span className="sm:inline hidden">| </span>
            <br className="sm:hidden" />
            <a
              className="hover:underline underline-offset-2 hover:text-blue-500 transition-all"
              href="https://x.com/dynamos_dev"
              target="_blank"
            >
              Made by DevDynamos &#x2665;&#xfe0e;
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
