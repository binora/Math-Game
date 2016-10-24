import React, { Component } from 'react';
import mathLib from 'mathjs';

import Question from './components/question';
import Timer from './components/timer';
import GameOver from './components/gameover';

const NO_TERMS = 4;
const MAX_NUMBER = 10;
const MIN_NUMBER = 1;
const UPPER_LIMIT = 10;
const MAX_RETRIES = 3;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.initializeState();
  }

  initializeState() {
    let problem = this.getRandomMathProblem();
    return {
      score: 0,
      highScore : 0,
      problemStr: problem.problemStr,
      solution : problem.solution,
      secondsRemaining : UPPER_LIMIT,
      retriesRemaining : MAX_RETRIES
    };
  }

  onReset(isAnswerCorrect) {
    let problem = this.getRandomMathProblem();

    if (this.state.retriesRemaining < 0) {
      return;
    }

    this.setState({
      score : isAnswerCorrect ? this.state.score+1 : this.state.score,
      retriesRemaining : isAnswerCorrect ? this.state.retriesRemaining : this.state.retriesRemaining-1,
      problemStr: problem.problemStr,
      solution : problem.solution,
      secondsRemaining : UPPER_LIMIT,
    });
  }

  updateSecondsRemaining() {
    this.setState({secondsRemaining : this.state.secondsRemaining - 1});
  }

  onRestart() {
    this.setState(this.initializeState());
  }

  render() {
    let isGameOver =  this.state.retriesRemaining < 0 ? true : false;
    return (
        <div className="App">
          <header className="App-header">
          <div>Score : {this.state.score}</div>
          <div>Retries : {this.state.retriesRemaining}</div>
          </header>
          <GameOver isGameOver={isGameOver} onRestart={this.onRestart.bind(this)}/>
          <Timer
           isGameOver={isGameOver}
           updateSecondsRemaining={this.updateSecondsRemaining.bind(this)}
            secondsRemaining={this.state.secondsRemaining}
            onTimeup={this.onReset.bind(this)}
            />
          <Question
          isGameOver={isGameOver}
          problemStr={this.state.problemStr}
          solution={this.state.solution}
           onReset={this.onReset.bind(this)}/>
        </div>
    );
  }

  getRandomMathProblem() {
    let possibleOperations = '+-*';
    let problemArray = [];

    for (let i=0; i < NO_TERMS; i++) {
      let num = Math.round(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
      problemArray.push(num);

      let symbol  = possibleOperations.charAt(Math.floor(Math.random() * possibleOperations.length));

      if (i !== (NO_TERMS-1)) {
        problemArray.push(symbol);
      }
    }

    let problemStr = problemArray.join(' ');
    let solution = mathLib.eval(problemStr);


    // Replace * with 'x'
    problemStr =  problemStr.replace(/\*/g, 'x');

    return {
      solution,
      problemStr
    }
  }
}

export default App;
