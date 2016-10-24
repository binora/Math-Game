import React, { Component } from 'react';
import mathLib from 'mathjs';

import Question from './components/question';
import Timer from './components/timer';

const NO_TERMS = 4;
const MAX_NUMBER = 10;
const MIN_NUMBER = 1;
const UPPER_LIMIT = 10;

class App extends Component {
  constructor(props) {
    super(props);
    let problem = this.getRandomMathProblem();
    this.state = {
      score: 0,
      problemStr: problem.problemStr,
      solution : problem.solution,
      secondsRemaining : UPPER_LIMIT
    };
  }

  onReset(isAnswerCorrect) {
    let problem = this.getRandomMathProblem();
    console.log(this.state.score);
    this.setState({
      score : isAnswerCorrect ? this.state.score+1 : this.state.score,
      problemStr: problem.problemStr,
      solution : problem.solution,
      secondsRemaining : UPPER_LIMIT
    });
  }

  updateSecondsRemaining() {
    this.setState({secondsRemaining : this.state.secondsRemaining - 1});
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
          Score : {this.state.score}
          </header>
          <Timer
           informParent={this.updateSecondsRemaining.bind(this)}
            secondsRemaining={this.state.secondsRemaining}
            onTimeup={this.onReset.bind(this)}
            />
          <Question
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
