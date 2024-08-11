import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col gap-4 items-center justify-center">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Animated Umbrella
      </h1>
      <p className="text-center">
        The future of betting is here, and its on the Blockchain.
      </p>
      <p className="text-center mt-4 mb-28 flex gap-4">
        <Button variant={"secondary"}>Check Demo</Button>
        <Button asChild>
          <Link href={"/higherlower"}>Launch App</Link>
        </Button>
      </p>
    </div>
  );
}
