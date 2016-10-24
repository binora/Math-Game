import React from 'react';


const GameOver = (props) => {
  if (!props.isGameOver) {
    return null;
  }
  return (
    <div className="gameOver">
    <div>Game Over! </div>
    <button className="btn btn-primary restartButton" onClick={props.onRestart}>Restart</button>
    </div>
    )
}

export default GameOver;
