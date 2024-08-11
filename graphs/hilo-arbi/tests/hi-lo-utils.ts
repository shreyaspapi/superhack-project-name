import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { BetPlaced, Result } from "../generated/HiLo/HiLo"

export function createBetPlacedEvent(
  sequenceNumber: BigInt,
  player: Address,
  amount: BigInt,
  multiplier: BigInt,
  isHigh: boolean
): BetPlaced {
  let betPlacedEvent = changetype<BetPlaced>(newMockEvent())

  betPlacedEvent.parameters = new Array()

  betPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "sequenceNumber",
      ethereum.Value.fromUnsignedBigInt(sequenceNumber)
    )
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "multiplier",
      ethereum.Value.fromUnsignedBigInt(multiplier)
    )
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("isHigh", ethereum.Value.fromBoolean(isHigh))
  )

  return betPlacedEvent
}

export function createResultEvent(
  sequenceNumber: BigInt,
  randomNumber: BigInt,
  player: Address,
  isHigh: boolean,
  winnings: BigInt
): Result {
  let resultEvent = changetype<Result>(newMockEvent())

  resultEvent.parameters = new Array()

  resultEvent.parameters.push(
    new ethereum.EventParam(
      "sequenceNumber",
      ethereum.Value.fromUnsignedBigInt(sequenceNumber)
    )
  )
  resultEvent.parameters.push(
    new ethereum.EventParam(
      "randomNumber",
      ethereum.Value.fromUnsignedBigInt(randomNumber)
    )
  )
  resultEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  resultEvent.parameters.push(
    new ethereum.EventParam("isHigh", ethereum.Value.fromBoolean(isHigh))
  )
  resultEvent.parameters.push(
    new ethereum.EventParam(
      "winnings",
      ethereum.Value.fromUnsignedBigInt(winnings)
    )
  )

  return resultEvent
}
