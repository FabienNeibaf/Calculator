import operate from './operate';

const calculate = (calculator, buttonName) => {
  const { total, next } = calculator;
  calculator.operation = buttonName;
  switch (buttonName) {
    case '+/-':
      calculator.next = -next;
      calculator.total = -total;
      return calculator;
    case '+':
    case '-':
    case 'X':
    case `\u0025`:
    case `\u00f7`:
      calculator.total = operate(total, next, buttonName);
      return calculator;
    default:
      return calculator;
  }
};

export default calculate;
