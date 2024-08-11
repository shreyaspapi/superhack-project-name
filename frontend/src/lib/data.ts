interface DiceData {
  coordinatorSets: any[];
  diceLandeds: DiceLanded[];
  diceResults: DiceResult[];
  diceRolleds: DiceRolled[];
}

interface DiceLanded {
  id: string;
  requestId: string;
  result: string;
  blockNumber: string;
}

interface DiceResult {
  id: string;
  payout: string;
  player: string;
  result: string;
  transactionHash: string;
  win: boolean;
  blockTimestamp: string;
}

interface DiceRolled {
  bet: string;
  id: string;
  isRollUnder: boolean;
  blockTimestamp: string;
  requestId: string;
  rollValue: string;
  roller: string;
  transactionHash: string;
}
