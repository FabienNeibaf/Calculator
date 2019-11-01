import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: null,
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
    const { step, next, total, operation } = this.state;
    return (
      <div id="App">
        <Display step={step} result={operation === '=' ? total : next} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
