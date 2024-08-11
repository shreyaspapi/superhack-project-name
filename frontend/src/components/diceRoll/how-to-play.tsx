import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function HowToPlay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How to Play</CardTitle>
        <CardDescription>
          The dice roll game is a prediction based game, our dice rolls a number
          between 1 and 20. You can place a bet on your prediction and if you
          are correct you win the bet amount.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
