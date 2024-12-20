import React, { useState } from 'react';
import MiniBoard from './MiniBoard';
import './Board.css';

const Board = ({ onWin, setMoves, currentPlayer, setCurrentPlayer, gameOver }) => {
  const [miniBoardWinners, setMiniBoardWinners] = useState(Array(9).fill(null));

  const checkSuperWinner = (miniBoardWinners) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
          miniBoardWinners[a] &&
          miniBoardWinners[a] === miniBoardWinners[b] &&
          miniBoardWinners[a] === miniBoardWinners[c]
      ) {
        return miniBoardWinners[a];
      }
    }

    return null;
  };

  const handleMiniBoardWin = (boardIndex, winner) => {
    const updatedWinners = [...miniBoardWinners];
    updatedWinners[boardIndex] = winner;
    setMiniBoardWinners(updatedWinners);

    const superWinner = checkSuperWinner(updatedWinners);
    if (superWinner) {
      onWin(superWinner);
    }
  };

  return (
      <div className="board">
        {Array.from({ length: 9 }).map((_, index) => (
            <MiniBoard
                key={index}
                onWin={(winner) => handleMiniBoardWin(index, winner)}
                isInactive={!!miniBoardWinners[index]}
                gameOver={gameOver}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                setMoves={setMoves}
            />
        ))}
      </div>
  );
};

export default Board;
