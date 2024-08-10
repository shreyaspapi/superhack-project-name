"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";

const walletBalance = 100;
const formSchema = z.object({
  betamount: z.coerce
    .number({
      required_error: "Bet amount is required",
      invalid_type_error: "Bet amount must be a number",
    })
    .gt(0, { message: "Bet amount cannot be less than or equal to 0" })
    .lte(walletBalance, {
      message: "Bet amount cannot be more than your wallet balance",
    }),
});
export default function BettingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      betamount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Place your bets</CardTitle>
        <CardDescription>Enter the amount you want to bet</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="betamount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bet Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormDescription className="text-right">
                    Your wallet balance is {walletBalance}
                  </FormDescription>
                  <FormMessage />
                  <div className="flex justify-between">
                    <Button variant="outline" className="w-[70px]">
                      0.5x
                    </Button>
                    <Button variant="outline" className="w-[70px]">
                      0.75x
                    </Button>
                    <Button variant="outline" className="w-[70px]">
                      1.5x
                    </Button>
                    <Button variant="outline" className="w-[70px]">
                      2x
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Place your bet
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
