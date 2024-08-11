"use client";
import React, { useState } from "react";
import HistoryTable from "./history-table";
import { Button } from "../ui/button";
import BettingForm from "./betting-form";
import HowToPlay from "./how-to-play";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function HigherLowerGame() {
  const [selection, setSelection] = useState<"higher" | "lower" | null>(null);
  return (
    <div className="grid grid-cols-[250px_3fr_2fr] gap-4 h-full">
      <HistoryTable />
      <div className="flex flex-col justify-around items-center">
        <Button
          variant={"secondary"}
          onClick={() => setSelection("higher")}
          className="text-xl h-12 flex gap-2"
        >
          <ArrowUp size={18} /> Higher
        </Button>

        <div className="flex flex-col w-full text-9xl items-center justify-center">
          42
          <p className="text-base mt-2 whitespace-nowrap text-nowrap w-full flex justify-center">
            {selection ? (
              <span className="flex gap-1 items-center">
                Your bet is on{" "}
                <span className="font-bold uppercase">{selection}</span>
                {selection === "higher" ? (
                  <ArrowUp size={18} />
                ) : (
                  <ArrowDown size={18} />
                )}
              </span>
            ) : (
              <span>Select higher or lower</span>
            )}
          </p>
        </div>

        <Button
          variant={"secondary"}
          onClick={() => setSelection("lower")}
          className="text-xl h-12 flex gap-2"
        >
          <ArrowDown size={18} /> Lower
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <HowToPlay />
        <BettingForm />
        <Card>
          <CardHeader>
            <CardTitle>Feeling lucky?</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est
              aliquam beatae, veniam magni quia tempore repellat earum atque
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
