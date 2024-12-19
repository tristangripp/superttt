import React from 'react';

const GameStatus = ({ winner, moves, wins, currentPlayer }) => {
    return (
        <div className="status">
            {/* Show winner if game is over, otherwise display moves and current player */}
            {winner ? (
                <h2>Winner: {winner}</h2>
            ) : (
                <h2>Moves: {moves} | Current Player: {currentPlayer}</h2>
            )}
            {/* Display win count for X and O */}
            <p>X Wins: {wins.X} | O Wins: {wins.O}</p>
        </div>
    );
};

export default GameStatus;
