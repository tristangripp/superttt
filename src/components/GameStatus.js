const GameStatus = ({ winner, moves, wins }) => (
  <div className="status">
    {winner ? <h2>Winner: {winner}</h2> : <h2>Moves: {moves}</h2>}
    <p>X Wins: {wins.X} | O Wins: {wins.O}</p>
  </div>
);

export default GameStatus;
