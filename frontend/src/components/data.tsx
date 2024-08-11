"use client";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
const query = gql`
  {
    coordinatorSets(first: 5) {
      id
      vrfCoordinator
      blockNumber
      blockTimestamp
    }
    diceLandeds(first: 5) {
      id
      requestId
      result
      blockNumber
    }
    diceResults(first: 10) {
      id
      payout
      player
      result
      transactionHash
      win
      blockTimestamp
    }
    diceRolleds(first: 10) {
      bet
      id
      isRollUnder
      blockTimestamp
      requestId
      rollValue
      roller
      transactionHash
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/86277/uperhack2024-dicegam/version/latest";

export default function FetchSubgraphData() {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const { data } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });
  return data as DiceData | {};
}
