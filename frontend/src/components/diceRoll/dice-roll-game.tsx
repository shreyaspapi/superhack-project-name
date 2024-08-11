"use client";
import React, { useState } from "react";
import HistoryTable from "./history-table";
import BettingForm from "./betting-form";
import HowToPlay from "./how-to-play";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Slider } from "../ui/slider";
import Link from "next/link";
import { Button } from "../ui/button";

export default function DiceRollGame() {
  const [dicePrediction, setDicePrediction] = useState(10);
  return (
    <div className="grid grid-cols-[250px_3fr_2fr] gap-4 h-full">
      <HistoryTable />
      <div className="flex flex-col justify-around items-center">
        <div className="flex flex-col w-full text-9xl items-center justify-center">
          {dicePrediction}
          <div className="w-2/3 mt-8 mx-auto">
            <Slider
              onValueChange={setDicePrediction}
              defaultValue={[10]}
              max={20}
              min={1}
              step={1}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <HowToPlay />
        <BettingForm />
        <Card>
          <CardHeader>
            <CardTitle>Feeling lucky?</CardTitle>
            <CardDescription>
              On a roll? Feeling at the top of your game? Follow us on{" "}
              <Link
                className="underline"
                href={"https://x.com/kivous911"}
                target="_blank"
              >
                X
              </Link>{" "}
              for more high stake, high reward games.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
