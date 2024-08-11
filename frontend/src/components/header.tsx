"use client";
import { client } from "@/app/client";
import { useTheme } from "next-themes";
import { ConnectButton } from "thirdweb/react";
import { NavMenu } from "./navigation-menu";
import { ModeToggle } from "./theme-toggle";
import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";

export default function Header() {
  const { resolvedTheme } = useTheme();
  return (
    <header className="flex relative justify-between items-center h-16">
      <div>
        <a href="/">
          <Image
            src={thirdwebIcon}
            alt=""
            className="size-[48px] md:size-[48px]"
            style={{
              filter: "drop-shadow(0px 0px 24px #a726a9a8)",
            }}
          ></Image>
        </a>
      </div>
      <div className="absolute w-full">
        <NavMenu />
      </div>
      <div className="flex justify-between gap-4 items-center">
        <ModeToggle />
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Example App",
            url: "https://example.com",
          }}
          theme={resolvedTheme ? (resolvedTheme as "light" | "dark") : "light"}
        />
      </div>
    </header>
  );
}
