import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      secondsRemaining: this.props.secondsRemaining
    };
  }

  tick() {
    if (this.props.secondsRemaining <= 1) {
      clearInterval(this.interval);
      this.props.onTimeup();
      this.componentDidMount()
      return;
    }
    this.props.updateSecondsRemaining();
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.props.isGameOver) {
      return null;
    }
    return (
      <div className='timer'>
        {this.props.secondsRemaining}
     </div>
    );
  }
}
export default Timer;
