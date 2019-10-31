import Big from 'big.js';

const operate = (numberOne, numberTwo, operation) => {
  switch (operation) {
    case '+':
      return Big(numberOne)
        .plus(numberTwo)
        .toString();
    case '-':
      return Big(numberOne)
        .minus(numberTwo)
        .toString();
    case 'X':
      return Big(numberOne)
        .times(numberTwo)
        .toString();
    case `\u0025`:
      return Big(numberOne)
        .mod(numberTwo)
        .toString();
    case `\u00f7`:
      return Big(numberOne)
        .div(numberTwo)
        .toString();
    default:
      throw new Error('Unknown operation');
  }
};

export default operate;
