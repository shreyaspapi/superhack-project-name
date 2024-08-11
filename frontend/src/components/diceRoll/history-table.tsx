"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import FetchSubgraphData from "../data";

const pastNumber = [
  { number: 1, bet: "10", label: "higher", outcome: "win" },
  { number: 2 },
  { number: 3, bet: "30", label: "higher", outcome: "win" },
  { number: 4, bet: "40", label: "lower", outcome: "lose" },
  { number: 5 },
  { number: 6, bet: "60", label: "lower", outcome: "lose" },
  { number: 7, bet: "70", label: "higher", outcome: "lose" },
  { number: 8 },
  { number: 9, bet: "90", label: "higher", outcome: "win" },
  { number: 10, bet: "100", label: "lower", outcome: "win" },
  { number: 11 },
  { number: 12, bet: "120", label: "higher", outcome: "win" },
  { number: 13, bet: "130", label: "lower", outcome: "lose" },
  { number: 14 },
  { number: 15, bet: "150", label: "lower", outcome: "lose" },
  { number: 16, bet: "160", label: "higher", outcome: "lose" },
  { number: 17 },
  { number: 18, bet: "180", label: "higher", outcome: "win" },
  { number: 19, bet: "190", label: "lower", outcome: "win" },
  { number: 20 },
  { number: 21, bet: "210", label: "higher", outcome: "win" },
  { number: 22, bet: "220", label: "lower", outcome: "lose" },
  { number: 23 },
  { number: 24, bet: "240", label: "lower", outcome: "lose" },
  { number: 25, bet: "250", label: "higher", outcome: "lose" },
  { number: 26 },
  { number: 27, bet: "270", label: "higher", outcome: "win" },
  { number: 28, bet: "280", label: "lower", outcome: "win" },
  { number: 29 },
  { number: 30, bet: "300", label: "higher", outcome: "win" },
  { number: 31, bet: "310", label: "lower", outcome: "lose" },
  { number: 32 },
  { number: 33, bet: "330", label: "lower", outcome: "lose" },
  { number: 34, bet: "340", label: "higher", outcome: "lose" },
  { number: 35 },
  { number: 36, bet: "360", label: "higher", outcome: "win" },
  { number: 37, bet: "370", label: "lower", outcome: "win" },
  { number: 38 },
  { number: 39, bet: "390", label: "higher", outcome: "win" },
];

export default function HistoryTable() {
  const data = FetchSubgraphData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
        <CardDescription>Previous rolled dice numbers</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[65vh] 2xl:h-[80vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-left">Number</TableHead>
                <TableHead className="text-right">Bet</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastNumber.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell className="text-right">
                    {item.label && (
                      <span
                        className={cn(
                          "flex justify-between w-fit ml-auto items-center rounded-md px-1.5 py-0.5 text-xs leading-none text-[#000000]",
                          {
                            "bg-[#adfa1d]": item.outcome === "win",
                            "bg-[#ff0000]": item.outcome === "lose",
                          }
                        )}
                      >
                        {item.bet}
                        {item.label === "higher" ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
