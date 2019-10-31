import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: null,
      total: null,
      operation: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(buttonName) {
    this.setState(prevState => calculate(prevState, buttonName));
  }

  render() {
    const { total, handleClick } = this.state;
    return (
      <div id="App">
        <Display result={total} />
        <ButtonPanel clickHandler={handleClick} />
      </div>
    );
  }
}
