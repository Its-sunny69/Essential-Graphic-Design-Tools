"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");

  const pathname = usePathname();
  const navOption = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Features",
      href: "/features",
    },
    {
      name: "About",
      href: "/about",
    },
  ];
  useEffect(() => {
    const nextPage =
      navOption.find((item) => item.href === pathname)?.name || "";

    setCurrentPage(nextPage);
  }, [pathname, navOption]);

  return (
    <div className="w-full border-b backdrop-blur-md sticky top-0 z-50">
      <div className="sm:flex hidden text-lg justify-between items-center py-2 px-8">
        <div className="hover:scale-105 active:scale-95 transition-all">
          <Link
            href="/"
            className="flex justify-center items-center font-bold sm:text-xl text-lg"
          >
            <Image
              width={56}
              height={56}
              alt="logo"
              src="/logoDark.svg"
              className="mr-1"
            ></Image>
            <span className="text-[#161616]">Briefox</span>
            <span className="text-[#A0A0A0]">.com</span>
          </Link>
        </div>

        <div className="flex">
          {navOption.map((item, index) => (
            <div
              key={index}
              className="hover:text-gray-400 group sm:mx-4 mx-2 active:scale-95 transition-all"
            >
              <Link href={item.href}>{item.name}</Link>
              <div className="w-0 transition-all h-[2px] bg-black group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:hidden text-lg">
        <div className="py-2 px-3 flex justify-between items-center">
          <Link
            href="/"
            className="flex justify-center items-center font-bold sm:text-xl text-lg hover:scale-105 active:scale-95 transition-all"
            onClick={() => setCurrentPage("Home")}
          >
            <Image
              width={56}
              height={56}
              alt="logo"
              src="/logoDark.svg"
              className="mr-1"
            ></Image>
            <span className="text-[#161616]">Briefox</span>
            <span className="text-[#A0A0A0]">.com</span>
          </Link>

          <div className="flex justify-center items-center transition-all">
            {isMenuOpen ? (
              <X
                className="hover:scale-105 active:scale-95 transition-all"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <Menu
                className="hover:scale-105 active:scale-95 transition-all"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col justify-center items-center py-4 animate-fade-down">
            {navOption.map((item, index) => (
              <div
                key={index}
                className={`${
                  currentPage === item.name ? "text-gray-400" : ""
                } my-2 group text-center active:scale-95 transition-all`}
              >
                <Link
                  href={item.href}
                  onClick={() => setCurrentPage(item.name)}
                >
                  {item.name}
                </Link>

                {currentPage === item.name && (
                  <div className="w-full transition-all h-[2px] bg-black animate-fade"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <AdSocialBannner scriptSrc="//pl26849404.profitableratecpm.com/03/d5/77/03d5773862e942dea80f69e53f667b7a.js" /> */}
    </div>
  );
}

export default Header;
