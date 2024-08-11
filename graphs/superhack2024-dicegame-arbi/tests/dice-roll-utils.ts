import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CoordinatorSet,
  DiceLanded,
  DiceResult,
  DiceRolled,
  OwnershipTransferRequested,
  OwnershipTransferred
} from "../generated/DiceRoll/DiceRoll"

export function createCoordinatorSetEvent(
  vrfCoordinator: Address
): CoordinatorSet {
  let coordinatorSetEvent = changetype<CoordinatorSet>(newMockEvent())

  coordinatorSetEvent.parameters = new Array()

  coordinatorSetEvent.parameters.push(
    new ethereum.EventParam(
      "vrfCoordinator",
      ethereum.Value.fromAddress(vrfCoordinator)
    )
  )

  return coordinatorSetEvent
}

export function createDiceLandedEvent(
  requestId: BigInt,
  result: BigInt
): DiceLanded {
  let diceLandedEvent = changetype<DiceLanded>(newMockEvent())

  diceLandedEvent.parameters = new Array()

  diceLandedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  diceLandedEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromUnsignedBigInt(result))
  )

  return diceLandedEvent
}

export function createDiceResultEvent(
  player: Address,
  result: BigInt,
  win: boolean,
  payout: BigInt
): DiceResult {
  let diceResultEvent = changetype<DiceResult>(newMockEvent())

  diceResultEvent.parameters = new Array()

  diceResultEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  diceResultEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromUnsignedBigInt(result))
  )
  diceResultEvent.parameters.push(
    new ethereum.EventParam("win", ethereum.Value.fromBoolean(win))
  )
  diceResultEvent.parameters.push(
    new ethereum.EventParam("payout", ethereum.Value.fromUnsignedBigInt(payout))
  )

  return diceResultEvent
}

export function createDiceRolledEvent(
  requestId: BigInt,
  roller: Address,
  bet: BigInt,
  rollValue: BigInt,
  isRollUnder: boolean
): DiceRolled {
  let diceRolledEvent = changetype<DiceRolled>(newMockEvent())

  diceRolledEvent.parameters = new Array()

  diceRolledEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  diceRolledEvent.parameters.push(
    new ethereum.EventParam("roller", ethereum.Value.fromAddress(roller))
  )
  diceRolledEvent.parameters.push(
    new ethereum.EventParam("bet", ethereum.Value.fromUnsignedBigInt(bet))
  )
  diceRolledEvent.parameters.push(
    new ethereum.EventParam(
      "rollValue",
      ethereum.Value.fromUnsignedBigInt(rollValue)
    )
  )
  diceRolledEvent.parameters.push(
    new ethereum.EventParam(
      "isRollUnder",
      ethereum.Value.fromBoolean(isRollUnder)
    )
  )

  return diceRolledEvent
}

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}
