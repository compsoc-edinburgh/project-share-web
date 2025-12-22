"use client";

import { InstagramIcon, GamepadIcon } from "raster-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { ShortcutsFooter } from "@/components/shortcuts-footer";

const sections = [
  {
    id: "home",
    name: "Home",
    href: "#home",
  },
  {
    id: "about",
    name: "About",
    href: "#about",
  },
  {
    id: "team",
    name: "Team",
    href: "#team",
  },
  {
    id: "Projects",
    name: "Projects",
    href: "#projects",
  },
  {
    id: "leaderboard",
    name: "Leaderboard",
    href: "#leaderboard",
  },
];

function Navbar() {
  const [currentSection, setCurrentSection] = useState("home");

  return (
    <div className="flex items-center justify-center font-departure w-full">
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={section.href}
          onClick={() => setCurrentSection(section.id)}
          className={cn(
            "text-base text-main mx-5 px-1",
            index === 0 && "ml-0",
            currentSection === section.id && "bg-main/10"
          )}
        >
          {`0${index + 1} ${section.name}`}
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col px-10 py-5 space-y-20 relative min-h-screen">
      <div className="flex flex-col space-y-10">
        <Navbar />
        <div className="flex flex-col mt-28">
          <div className="text-8xl font-departure flex items-center gap-2 text-main uppercase">
            <Image
              src="/logo.svg"
              alt="Project Share Logo"
              width={120}
              height={120}
            />
            Project
          </div>
          <div className="text-8xl font-departure text-main uppercase">
            Share
          </div>
          <div className="uppercase font-departure">
            Making software together
          </div>
          <div className="max-w-140 mt-5">
            At Project Share we meet every other week and share updates on our
            own tech projects. Show and tell! Hear the development of other
            builders and learn from them.
          </div>
          <div className="flex items-center gap-2 font-departure w-fit uppercase mt-10 hover:bg-main/10 hover:cursor-pointer px-1">
            <GamepadIcon /> Discord
          </div>
          <div className="flex items-center gap-2 font-departure w-fit uppercase mt-2 hover:bg-main/10 hover:cursor-pointer px-1">
            <InstagramIcon />
            Instagram
          </div>
        </div>
      </div>
      <ShortcutsFooter />
    </main>
  );
}
