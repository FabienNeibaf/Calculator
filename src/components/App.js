import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      result: '',
      expression: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(buttonName) {
    this.setState(prevState => calculate(prevState, buttonName));
  }

  render() {
    let data;
    const { expression, result, input } = this.state;
    if (result !== '') data = result;
    else if (input !== '') data = input;
    return (
      <div id="App">
        <Display expression={expression} result={data} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
