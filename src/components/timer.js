import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      secondsRemaining: 0
    };
  }

  tick() {
    if (this.props.secondsRemaining <= 1) {
      clearInterval(this.interval);
      this.props.onTimeup();
      this.componentDidMount()
      return;
    }
    this.props.informParent();
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className='timer'>
        {this.props.secondsRemaining}
     </div>
    );
  }
}
export default Timer;
