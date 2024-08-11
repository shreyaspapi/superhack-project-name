// SPDX-License-Identifier: Apache 2
pragma solidity ^0.8.0;

import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

library HiLowErrors {
    error InsufficientFee();
    error InvalidMultiplier();
}

contract HiLow is IEntropyConsumer {
    event GuessRequest(uint64 sequenceNumber, uint256 guess, uint256 multiplier);
    event GuessResult(uint64 sequenceNumber, bool isHigh, uint256 payout);

    IEntropy private entropy;
    address private entropyProvider;

    constructor(address _entropy, address _entropyProvider) {
        entropy = IEntropy(_entropy);
        entropyProvider = _entropyProvider;
    }

    function requestGuess(uint256 userGuess, uint256 multiplier) external payable {
        uint256 fee = entropy.getFee(entropyProvider);
        if (msg.value < fee) {
            revert HiLowErrors.InsufficientFee();
        }

        // Validate multiplier
        if (multiplier < 100 || multiplier > 10000) {
            revert HiLowErrors.InvalidMultiplier();
        }

        uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(
            entropyProvider,
            bytes32(userGuess)
        );

        emit GuessRequest(sequenceNumber, userGuess, multiplier);
    }

    function getGuessFee() public view returns (uint256 fee) {
        fee = entropy.getFee(entropyProvider);
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address,
        bytes32 randomNumber
    ) internal override {
        uint256 randomNum = uint256(randomNumber);
        bool isHigh = randomNum > 500000000; // Assuming a 50% chance of high

        // Calculate payout based on multiplier
        uint256 payout = msg.value * (isHigh ? multiplier / 100 : 1);

        emit GuessResult(sequenceNumber, isHigh, payout);
    }

    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    receive() external payable {}
}