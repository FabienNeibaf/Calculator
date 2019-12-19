import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      expression: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(buttonName) {
    this.setState(prevState => calculate(prevState, buttonName));
  }

  render() {
    const { expression, result } = this.state;
    return (
      <div id="App">
        <Display expression={expression} result={result || undefined} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
