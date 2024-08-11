import {
  BetPlaced as BetPlacedEvent,
  Result as ResultEvent
} from "../generated/HiLo/HiLo"
import { BetPlaced, Result } from "../generated/schema"

export function handleBetPlaced(event: BetPlacedEvent): void {
  let entity = new BetPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sequenceNumber = event.params.sequenceNumber
  entity.player = event.params.player
  entity.amount = event.params.amount
  entity.multiplier = event.params.multiplier
  entity.isHigh = event.params.isHigh

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleResult(event: ResultEvent): void {
  let entity = new Result(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sequenceNumber = event.params.sequenceNumber
  entity.randomNumber = event.params.randomNumber
  entity.player = event.params.player
  entity.isHigh = event.params.isHigh
  entity.winnings = event.params.winnings

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
