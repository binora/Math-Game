import React, { Component } from 'react';
import mathLib from 'mathjs';


const NO_TERMS = 4;
const MAX_NUMBER = 5;
const MIN_NUMBER = 1;

class question extends Component {
  constructor(props) {
    super(props);

    this.state = this.getRandomMathProblem();
  }

  render() {
    return (
      <div className='row'>

        <div
          className='problemStr col-md-4'> {this.state.problemStr}
        </div>

        <div className='solution col-md-4'>
         <input onChange={this.handleChange.bind(this)}/>
        </div>

      </div>
      );
  }

  handleChange(e)  {
    let value = e.target.value;

    if (value === '') {
      return;
    }

    if (Number(value) !== this.state.solution) {
      return;
    }

    this.setState(this.getRandomMathProblem());

    e.target.value = '';

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


export default question;
