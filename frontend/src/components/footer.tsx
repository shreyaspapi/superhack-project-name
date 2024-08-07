import React from "react";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <>
      <Separator />
      <footer className="py-8 container max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        <div className="flex items-end">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">
              &copy; 2024, All rights reserved.
            </p>

            <p className="text-xs text-muted-foreground max-w-[320px]">
              Nothing herein constitutes an offer to sell, or the solicitation
              of an offer to buy, any securities or tokens.
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by NullAyy Corp
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
