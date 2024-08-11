// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract DiceRoll is VRFConsumerBaseV2Plus {
    uint256 private constant ROLL_IN_PROGRESS = 42;

    uint256 public s_subscriptionId;

    address public vrfCoordinator = 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;

    bytes32 public s_keyHash = 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;

    uint32 public callbackGasLimit = 100000;

    uint16 public requestConfirmations = 3;

    uint32 public numWords = 1;

    uint256 public minBet;
    uint256 public maxBet;
    uint256 public houseEdge; // in basis points (1/100 of a percent)

    struct BetInfo {
        address player;
        uint256 betAmount;
        uint256 rollValue;
        bool isRollUnder;
    }

    mapping(uint256 => BetInfo) public bets;

    mapping(uint256 => address) private s_rollers;
    mapping(address => uint256) private s_results;

    event DiceRolled(uint256 indexed requestId, address indexed roller, uint256 bet, uint256 rollValue, bool isRollUnder);
    event DiceLanded(uint256 indexed requestId, uint256 indexed result);
    event DiceResult(address indexed player, uint256 result, bool win, uint256 payout);

    constructor(
        uint256 subscriptionId,
        uint256 _minBet,
        uint256 _maxBet,
        uint256 _houseEdge
    ) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
        minBet = _minBet;
        maxBet = _maxBet;
        houseEdge = _houseEdge;
    }

    function rollDice(
        uint256 _rollValue,
        bool _isRollUnder
    ) public payable returns (uint256 requestId) {
        require(msg.value >= minBet && msg.value <= maxBet, "Bet amount out of range");
        require(_rollValue > 0 && _rollValue <= 20, "Invalid roll value");

        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        bets[requestId] = BetInfo(msg.sender, msg.value, _rollValue, _isRollUnder);
        s_rollers[requestId] = msg.sender;
        s_results[msg.sender] = ROLL_IN_PROGRESS;
        emit DiceRolled(requestId, msg.sender, msg.value, _rollValue, _isRollUnder);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        uint256 d20Value = (randomWords[0] % 20) + 1;
        BetInfo memory bet = bets[requestId];

        bool win;
        if (bet.isRollUnder) {
            win = d20Value < bet.rollValue;
        } else {
            win = d20Value > bet.rollValue;
        }

        uint256 payout = 0;
        if (win) {
            uint256 multiplier;
            if (bet.isRollUnder) {
                multiplier = 100 * (100 - houseEdge) / bet.rollValue;
            } else {
                multiplier = 100 * (100 - houseEdge) / (20 - bet.rollValue);
            }
            payout = (bet.betAmount * multiplier) / 100;
        }

        s_results[bet.player] = d20Value;
        emit DiceLanded(requestId, d20Value);

        if (win) {
            payable(bet.player).transfer(bet.betAmount + payout);
            emit DiceResult(bet.player, d20Value, win, payout);
        } else {
            emit DiceResult(bet.player, d20Value, win, 0);
        }

        delete bets[requestId];
    }

    function diceRoll(address player) public view returns (string memory) {
        require(s_results[player] != 0, "Dice not rolled");
        require(s_results[player] != ROLL_IN_PROGRESS, "Roll in progress");
        return _getDiceRoll(s_results[player]);
    }

    function _getDiceRoll(uint256 id) private pure returns (string memory) {
        string[20] memory houseNames = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20"
        ];
        return houseNames[id - 1];
    }

    function setGasLimit(uint32 _callbackGasLimit) onlyOwner external {
        callbackGasLimit = _callbackGasLimit;
    }

    function setMinBet(uint256 _minBet) onlyOwner external {
        minBet = _minBet;
    }

    function setMaxBet(uint256 _maxBet) onlyOwner external {
        maxBet = _maxBet;
    }

    function setHouseEdge(uint256 _houseEdge) onlyOwner external {
        houseEdge = _houseEdge;
    }

    function withdrawBalance() onlyOwner external {
        payable(msg.sender).transfer(address(this).balance);
    }

    function addBalance() external payable {}
}
