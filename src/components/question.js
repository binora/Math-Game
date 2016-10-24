import React from 'react';



const question = (props) => {
    if (props.isGameOver) {
      return null;
    }
    return (
        <div className='question'>
         <div className='problemStr'> {props.problemStr} </div>
        <div className='solution'> <input onChange={handleChange.bind(this)}/> </div>
      </div>
      );

  function handleChange(e) {
    let value = e.target.value;

    if (value === '') {
      return;
    }

    if (Number(value) !== props.solution) {
      return;
    }
    e.target.value = ''
    props.onReset(true);
  }

};


export default question;
