import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BetPlaced } from "../generated/schema"
import { BetPlaced as BetPlacedEvent } from "../generated/HiLo/HiLo"
import { handleBetPlaced } from "../src/hi-lo"
import { createBetPlacedEvent } from "./hi-lo-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sequenceNumber = BigInt.fromI32(234)
    let player = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let multiplier = BigInt.fromI32(234)
    let isHigh = "boolean Not implemented"
    let newBetPlacedEvent = createBetPlacedEvent(
      sequenceNumber,
      player,
      amount,
      multiplier,
      isHigh
    )
    handleBetPlaced(newBetPlacedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BetPlaced created and stored", () => {
    assert.entityCount("BetPlaced", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sequenceNumber",
      "234"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "player",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "multiplier",
      "234"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "isHigh",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
