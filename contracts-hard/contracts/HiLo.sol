// SPDX-License-Identifier: Apache 2
pragma solidity ^0.8.0;
import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

library HiLowErrors {
    error InsufficientFee();
    error InvalidBet();
}

struct Bet {
    uint256 amount;
    uint256 multiplier;
    bool isHigh;
    address player;
}

contract HiLo is IEntropyConsumer {
    // Event emitted when a bet is placed
    event BetPlaced(uint64 sequenceNumber, address player, uint256 amount, uint256 multiplier, bool isHigh);

    // Event emitted when the result is known
    event Result(uint64 sequenceNumber, uint256 randomNumber, address player, bool isHigh, uint256 winnings);

    // Mapping to store bets
    mapping(uint64 =>  Bet) public bets;

    IEntropy private entropy;
    address private entropyProvider;

    constructor(address _entropy, address _entropyProvider) {
        entropy = IEntropy(_entropy);
        entropyProvider = _entropyProvider;
    }

    // Place a bet
    function placeBet(bytes32 userRandomNumber, uint256 multiplier, bool isHigh) external payable {
        uint256 fee = entropy.getFee(entropyProvider);
        if (msg.value < fee) {
            revert HiLowErrors.InsufficientFee();
        }

        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(
            entropyProvider,
            userRandomNumber
        );

        // Store the bet
        bets[sequenceNumber] = Bet(msg.value, multiplier, isHigh, msg.sender);

        emit BetPlaced(sequenceNumber, msg.sender, msg.value, multiplier, isHigh);
    }

    // Get the fee to place a bet
    function getBetFee() public view returns (uint256 fee) {
        fee = entropy.getFee(entropyProvider);
    }

    // This method is required by the IEntropyConsumer interface
    function entropyCallback(
        uint64 sequenceNumber,
        address,
        bytes32 randomNumber
    ) internal override {
        uint256 number = uint256(randomNumber);
        address player = address(bets[sequenceNumber].player);

        // Calculate winnings
        Bet storage bet = bets[sequenceNumber];
        uint256 winnings;
        if (number % 100 > ((1 / bet.multiplier) * 100)) {
            winnings = bet.amount * bet.multiplier;
            payable(player).transfer(winnings);
        } else {
            // Player loses
            winnings = 0;
        }

        emit Result(sequenceNumber, number, player, bet.isHigh, winnings);
    }

    // This method is required by the IEntropyConsumer interface
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    receive() external payable {}
}