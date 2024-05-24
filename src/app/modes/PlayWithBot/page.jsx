'use client'

import React, { useRef, useState } from 'react';
import Box from "./../../components/box";
import Countdown from "./../../components/countdown";

export default function Home() {

    // States
    var isGameOnGoing = false;
    var isNecessary = false;
    const [isNecessary2, SetIsNecessary2] = useState(false);
    const [isDifficultyHard, setIsDifficultyHard] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [MoveNumber, setMoveNumber] = useState(0);

    const boxRef = useRef([]);
    const boxIds = Array.from('123456789');

    const poss1 = [1, 2, 3];
    const poss2 = [4, 5, 6];
    const poss3 = [7, 8, 9];
    const poss4 = [1, 4, 7];
    const poss5 = [2, 5, 8];
    const poss6 = [3, 6, 9];
    const poss7 = [3, 5, 7];
    const poss8 = [1, 5, 9];

    const Possibilities = [poss1, poss2, poss3, poss4, poss5, poss6, poss7, poss8];

    // Expensive Function && Winner Checker
    const CheckWin = () => {
        for (let i = 0; i < Possibilities.length; i++) {
            for (let j = 0; j < 1; j++) {
                let box1 = boxRef.current[Possibilities[i][j]];
                let box2 = boxRef.current[Possibilities[i][j + 1]];
                let box3 = boxRef.current[Possibilities[i][j + 2]];
                if (box1.innerHTML !== '' && box2.innerHTML !== '' && box3.innerHTML !== '') {
                    if (box1.innerHTML === box2.innerHTML && box2.innerHTML === box3.innerHTML) {
                        alert(`Hooray ${box1.innerHTML} You Win`);
                        isGameOnGoing = false;
                        boxRef.current.forEach((box) => {
                            box.innerHTML = '';
                        });

                        if (isDifficultyHard) {
                            setMoveNumber(0)
                            setTimeout(ChallengerBotTurn, 400);
                            return
                        }
                        return;
                    } else {
                        // console.log("Checking...")
                    }
                }
            }
        }
    };

    // Random Number
    const generateRandomNumber = (excludeNumbers) => {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 9) + 1;
        } while (excludeNumbers.includes(randomNumber));
        return randomNumber;
    }

    const PlayerTurn = async (e) => {
        isGameOnGoing = true;
        const { innerHTML, id } = e.target;
        if (innerHTML === '') {
            e.target.innerHTML = 'O';

            await CheckWin();
            return true;
        } else {
            return false;
        }
    };

    // Bot Turn
    const BotTurn = async (e) => {
        let MarkedBox = []
        boxRef.current.forEach((box, index) => {
            if (box.innerHTML != "") {
                MarkedBox.push(index)
            } else {
                // console.log("Everyone is filled")
            }
        })
        // console.log("Filled boxes", MarkedBox.length)
        // console.log("Unfilled boxes", (boxRef.current.length - MarkedBox.length))
        if (MarkedBox.length === 9) {
            alert("Draw")
            handleReset()
            return
        }
        const BotMarkBox = await generateRandomNumber(MarkedBox)
        boxRef.current[BotMarkBox].innerHTML = "X"
        await CheckWin();
        setIsPlayerTurn(true);
    };

    // Challenger Bot Turn
    const ChallengerBotTurn = async () => {
        const mark = 'X'; // Bot always uses 'X'

        // First move: occupy the center box (box number 5)
        if (MoveNumber === 0) {
            boxRef.current[5].innerHTML = mark;
            await CheckWin();
            setIsPlayerTurn(true);
            setMoveNumber(1);
            return;
        }

        // Strategy to ensure the bot never loses
        // If the bot can win in the next move, make that move
        for (let i = 0; i < Possibilities.length; i++) {
            const [a, b, c] = Possibilities[i];
            if (boxRef.current[a].innerHTML === mark && boxRef.current[b].innerHTML === mark && boxRef.current[c].innerHTML === '') {
                boxRef.current[c].innerHTML = mark;
                await CheckWin();
                setIsPlayerTurn(true);
                return;
            }
            if (boxRef.current[b].innerHTML === mark && boxRef.current[c].innerHTML === mark && boxRef.current[a].innerHTML === '') {
                boxRef.current[a].innerHTML = mark;
                await CheckWin();
                setIsPlayerTurn(true);
                return;
            }
            if (boxRef.current[a].innerHTML === mark && boxRef.current[c].innerHTML === mark && boxRef.current[b].innerHTML === '') {
                boxRef.current[b].innerHTML = mark;
                await CheckWin();
                setIsPlayerTurn(true);
                return;
            }
        }

        // If the opponent can win in the next move, block that move
        const opponentMark = 'O'; // Opponent always uses 'O'
        for (let i = 0; i < Possibilities.length; i++) {
            const [a, b, c] = Possibilities[i];
            if (boxRef.current[a].innerHTML === opponentMark && boxRef.current[b].innerHTML === opponentMark && boxRef.current[c].innerHTML === '') {
                boxRef.current[c].innerHTML = mark;
                await CheckWin();
                setIsPlayerTurn(true);
                return;
            }
            if (boxRef.current[b].innerHTML === opponentMark && boxRef.current[c].innerHTML === opponentMark && boxRef.current[a].innerHTML === '') {
                boxRef.current[a].innerHTML = mark;
                await CheckWin();
                setIsPlayerTurn(true);
                return;
            }
            if (boxRef.current[a].innerHTML === opponentMark && boxRef.current[c].innerHTML === opponentMark && boxRef.current[b].innerHTML === '') {
                boxRef.current[b].innerHTML = mark;
                await CheckWin();
                setIsPlayerTurn(true);
                return;
            }
        }

        // If none of the above conditions are met, make a random move
        let MarkedBox = [];
        boxRef.current.forEach((box, index) => {
            if (box.innerHTML !== '') {
                MarkedBox.push(index);
            }
        });

        // Draw condition: If all boxes are filled and no winner, it's a draw
        if (MarkedBox.length === 9) {
            alert("Draw");
            handleReset();
            return;
        }

        const BotMarkBox = await generateRandomNumber(MarkedBox);
        boxRef.current[BotMarkBox].innerHTML = mark;
        await CheckWin();
        setIsPlayerTurn(true);
    };

    // Box Marking
    const MarkBox = async (e) => {
        try {
            if (isPlayerTurn) {
                const PlayerMove = await PlayerTurn(e);
                if (isGameOnGoing) {
                    if (!isDifficultyHard) {
                        if (PlayerMove) {
                            setIsPlayerTurn(false);
                            setTimeout(BotTurn, 300);
                        }
                    } else {
                        setIsPlayerTurn(false);
                        setTimeout(ChallengerBotTurn, 400);
                    }
                }
            }
        } catch (Err) {
            console.log(Err);
        }
    };

    // Reset
    const handleReset = () => {

        boxRef.current.forEach((Box) => {
            Box.innerHTML = ""
        })

        // console.log(isDifficultyHard, isNecessary, isNecessary2)
        if (isDifficultyHard && isNecessary && isNecessary2) {
            setMoveNumber(0)
            setIsPlayerTurn(false);
            setTimeout(ChallengerBotTurn, 400);
        }
    }

    return (
        <>
            {isDifficultyHard &&
                <Countdown
                    passFunction={() => {
                        SetIsNecessary2(true)
                        setTimeout(ChallengerBotTurn, 400);
                    }}
                />
            }

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-4 md:flex md:space-x-4 md:space-y-0">
                    <button
                        onClick={() => {
                            setIsDifficultyHard(false)
                            SetIsNecessary2(false)
                            setIsPlayerTurn(true)
                            isNecessary = false
                            console.log("NORMAL MODE")
                            handleReset()
                        }}
                        className={`font-bold mx-2 px-6 py-3 rounded-md ${!isDifficultyHard
                            ? 'bg-blue-500 text-white bold-border'
                            : 'bg-gray-200 text-gray-800'
                            } md:w-1/2 lg:w-auto`}
                    >
                        NORMAL
                    </button>

                    <button
                        onClick={() => {
                            setIsPlayerTurn(false)
                            setIsDifficultyHard(true)
                            console.log("CHALLENGING MODE")
                            handleReset()
                        }}
                        className={`font-bold mx-2 px-6 py-3 rounded-md ${isDifficultyHard
                            ? 'bg-red-500 text-white bold-border'
                            : 'bg-gray-200 text-gray-800'
                            } md:w-1/2 lg:w-auto `}
                    >
                        CHALLENGING
                    </button>
                </div>

                <div className="grid grid-cols-3">
                    {boxIds.map((id, index) => (
                        <Box
                            key={id + '1'}
                            id={id}
                            ref={(el) => (boxRef.current[index + 1] = el)}
                            passFunction={(e) => MarkBox(e)}
                        />
                    ))}
                </div>

                <button
                    onClick={() => {
                        isNecessary = true
                        handleReset()
                    }}
                    className="px-6 py-3 mt-8 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md"
                >
                    Try Again
                </button>
            </div>
        </>
    );

}
