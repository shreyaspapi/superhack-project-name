"use client";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { ModeToggle } from "@/components/theme-toggle";
import { NavMenu } from "@/components/navigation-menu";
import { useTheme } from "next-themes";

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex flex-col container max-w-screen-lg mx-auto">
      <Header />
    </main>
  );
}

function Header() {
  const { resolvedTheme } = useTheme();
  return (
    <header className="flex justify-between items-center h-16">
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
      <NavMenu />
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
