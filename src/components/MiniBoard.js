import React, { useState } from 'react';
import './MiniBoard.css';

const MiniBoard = ({ onWin, isInactive, gameOver, currentPlayer, setCurrentPlayer, setMoves }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const handleMove = (index) => {
    if (board[index] || winner || gameOver || isInactive) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    setMoves((prevMoves) => prevMoves + 1); // Increment moves counter
    setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X')); // Alternate player

    const boardWinner = checkWinner(newBoard);
    if (boardWinner) {
      setWinner(boardWinner);
      onWin(boardWinner); // Notify parent Board of the win
    }
  };

  const checkWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner ('X' or 'O')
      }
    }

    return null;
  };

  return (
      <div className="mini-board">
        {/* Winner overlay */}
        {winner && <div className="winner-overlay">{winner} Wins!</div>}

        {/* Render cells */}
        {board.map((cell, index) => (
            <div
                key={index}
                className={`cell ${isInactive || winner ? 'inactive' : ''}`}
                onClick={() => handleMove(index)}
            >
              {cell}
            </div>
        ))}
      </div>
  );
};

export default MiniBoard;
