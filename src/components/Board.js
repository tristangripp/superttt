import React, { useState } from 'react';
import MiniBoard from './MiniBoard';
import '../Board.css'; // For red border styles

const Board = ({ onWin, setMoves, gameOver }) => {
  const gridSize = 3; // N x N grid (default: 3x3)
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [inactiveBoards, setInactiveBoards] = useState([]); // Boards where wins occurred

  // Handles selecting a smaller board
  const handleBoardSelect = (index) => {
    if (!gameOver && !inactiveBoards.includes(index)) {
      setSelectedBoard(index);
      setMoves((prev) => prev + 1); // Increment move count
    }
  };

  // Marks a board as inactive when a player wins it
  const handleMiniBoardWin = (index, player) => {
    setInactiveBoards((prev) => [...prev, index]);
    onWin(player); // Pass win info to parent
  };

  return (
      <div className="super-board">
        {[...Array(gridSize * gridSize)].map((_, i) => (
            <MiniBoard
                key={i}
                index={i}
                isSelected={selectedBoard === i}
                isInactive={inactiveBoards.includes(i)}
                onSelect={() => handleBoardSelect(i)}
                onWin={(player) => handleMiniBoardWin(i, player)}
                gameOver={gameOver}
            />
        ))}
      </div>
  );
};
console.log("Board component loaded");

export default Board;
