// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract DiceRoll is Ownable, VRFConsumerBase {
    uint256 public minBet;
    uint256 public maxBet;
    uint256 public houseEdge; // in basis points (1/100 of a percent)
    
    bytes32 internal keyHash;
    uint256 internal fee;
    
    struct BetInfo {
        address player;
        uint256 betAmount;
        uint256 rollValue;
        bool isRollUnder;
        timestamp timestamp;
    }
    
    mapping(bytes32 => BetInfo) public bets;

    event DiceRolled(address indexed player, uint256 bet, uint256 rollValue, bool isRollUnder);
    event DiceResult(address indexed player, uint256 result, bool win, uint256 payout);

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee,
        uint256 _minBet,
        uint256 _maxBet,
        uint256 _houseEdge
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        keyHash = _keyHash;
        fee = _fee;
        minBet = _minBet;
        maxBet = _maxBet;
        houseEdge = _houseEdge;
    }

    function rollDice(uint256 _rollValue, bool _isRollUnder) external payable {
        require(msg.value >= minBet && msg.value <= maxBet, "Bet amount out of range");
        require(_rollValue > 0 && _rollValue < 100, "Invalid roll value");

        bytes32 requestId = requestRandomness(keyHash, fee);
        bets[requestId] = BetInfo(msg.sender, msg.value, _rollValue, _isRollUnder, block.timestamp);

        emit DiceRolled(msg.sender, msg.value, _rollValue, _isRollUnder);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        BetInfo memory bet = bets[requestId];
        uint256 roll = (randomness % 100) + 1;
        
        bool win;
        if (bet.isRollUnder) {
            win = roll < bet.rollValue;
        } else {
            win = roll > bet.rollValue;
        }

        uint256 payout = 0;
        if (win) {
            uint256 multiplier;
            if (bet.isRollUnder) {
                multiplier = 100 * (100 - houseEdge) / bet.rollValue;
            } else {
                multiplier = 100 * (100 - houseEdge) / (100 - bet.rollValue);
            }
            payout = (bet.betAmount * multiplier) / 100;
            payable(bet.player).transfer(payout);
        }

        emit DiceResult(bet.player, roll, win, payout);
        
        delete bets[requestId];
    }

    function setMinBet(uint256 _minBet) external onlyOwner {
        minBet = _minBet;
    }

    function setMaxBet(uint256 _maxBet) external onlyOwner {
        maxBet = _maxBet;
    }

    function setHouseEdge(uint256 _houseEdge) external onlyOwner {
        houseEdge = _houseEdge;
    }

    function withdrawBalance() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Create function to withdraw any tokens

    // Create fund contract function
}